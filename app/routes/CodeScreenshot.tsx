import { AUTO_LANGUAGE_VALUE, LANGUAGE_OPTIONS, detectLanguage, toExtension } from "../utils/languageDetection";
import { type ReactNode, type RefObject, useEffect, useMemo, useRef, useState } from "react";
import { buttonRowStyles, fieldLabelStyles, pageStyles, selectStyles } from "./CodeScreenshot.css";
import { domToBlob, domToPng } from "modern-screenshot";
import { CodeWindow } from "../components/CodeWindow";
import { FilledButton } from "../components/FilledButton";
import type { MetaDescriptor } from "react-router";
import { TextButton } from "../components/TextButton";
import { ToolName } from "../components/ToolName";
import { showToast } from "../components/Toast";

const INITIAL_CODE = `function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));
`;
const INITIAL_LANGUAGE = "text";
const DETECTION_DEBOUNCE_MS = 500;
const EXPORT_SCALE = 2;

interface SnapshotFile {
    contents: string;
    lang: string;
    name: string;
}

const buildFile = (contents: string, detected: string, languageOverride: string): SnapshotFile => {
    const lang = languageOverride === AUTO_LANGUAGE_VALUE ? detected : languageOverride;
    const defaultName =
        lang === "docker" ? "Dockerfile" : `main.${lang === INITIAL_LANGUAGE ? "txt" : toExtension(lang)}`;
    return {
        contents,
        lang,
        name: defaultName
    };
};

const meta = () =>
    [
        {
            title: "コードスクリーンショット | Toolbox"
        },
        {
            content: "ソースコードのスクリーンショット風の画像を作成します。",
            name: "description"
        }
    ] as const satisfies MetaDescriptor[];

const screenshotCleanupStyles = `
[data-caret], [data-caret-highlight-range], [data-selection-range] {
    visibility: hidden !important;
}

[data-line][data-editor-active-line], [data-column-number][data-editor-active-line] {
    background-color: var(--diffs-bg) !important;
    --diffs-line-bg: var(--diffs-bg) !important;
}

[data-column-number][data-editor-active-line] {
    color: var(--diffs-fg-number) !important;
}

[data-line][data-editor-active-line]::after {
    box-shadow: none !important;
}
`;

const getShadowRoots = (root: Node): ShadowRoot[] => {
    const shadowRoots: ShadowRoot[] = [];
    const visit = (node: Node): void => {
        if (node instanceof HTMLElement && node.shadowRoot) {
            shadowRoots.push(node.shadowRoot);
            visit(node.shadowRoot);
        }
        node.childNodes.forEach(visit);
    };
    visit(root);
    return shadowRoots;
};

const hideEditorArtifacts = (canvas: HTMLDivElement): (() => void) => {
    const styles = getShadowRoots(canvas).map((shadowRoot) => {
        const style = document.createElement("style");
        style.textContent = screenshotCleanupStyles;
        shadowRoot.append(style);
        return style;
    });
    return (): void => {
        styles.forEach((style) => {
            style.remove();
        });
    };
};

const captureWithoutEditorArtifacts = async <T,>(canvas: HTMLDivElement, capture: () => Promise<T>): Promise<T> => {
    const restoreEditorArtifacts = hideEditorArtifacts(canvas);
    try {
        return await capture();
    } finally {
        restoreEditorArtifacts();
    }
};

const useDetectedLanguage = (code: string): string => {
    const [detected, setDetected] = useState(INITIAL_LANGUAGE);

    useEffect(() => {
        let cancelled = false;
        const timer = window.setTimeout(() => {
            void detectLanguage(code).then((language) => {
                if (!cancelled) setDetected(language ?? INITIAL_LANGUAGE);
            });
        }, DETECTION_DEBOUNCE_MS);

        return (): void => {
            cancelled = true;
            window.clearTimeout(timer);
        };
    }, [code]);

    return detected;
};

const savePng = async (canvas: HTMLDivElement): Promise<void> => {
    const dataUrl = await captureWithoutEditorArtifacts(canvas, () => domToPng(canvas, { scale: EXPORT_SCALE }));
    const link = document.createElement("a");
    link.download = "code-screenshot.png";
    link.href = dataUrl;
    link.click();
};

const downloadImage = (canvasRef: RefObject<HTMLDivElement | null>): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    savePng(canvas).catch(() => {
        showToast("画像の生成に失敗しました", "error");
    });
};

const copyImage = async (canvasRef: RefObject<HTMLDivElement | null>): Promise<void> => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const blob = await captureWithoutEditorArtifacts(canvas, () => domToBlob(canvas, { scale: EXPORT_SCALE })).catch(
        () => null
    );
    if (!blob) {
        showToast("画像の生成に失敗しました", "error");
        return;
    }
    try {
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        showToast("コピーしました", "info");
    } catch {
        showToast("画像のコピーに対応していない環境です", "error");
    }
};

interface ExportButtonsProps {
    canvasRef: RefObject<HTMLDivElement | null>;
}

const ExportButtons = ({ canvasRef }: ExportButtonsProps): ReactNode => (
    <div className={buttonRowStyles}>
        <FilledButton
            onClick={() => {
                downloadImage(canvasRef);
            }}
        >
            PNGをダウンロード
        </FilledButton>
        <TextButton
            onClick={() => {
                void copyImage(canvasRef);
            }}
        >
            画像をコピー
        </TextButton>
    </div>
);

const CodeScreenshot = (): ReactNode => {
    const [code, setCode] = useState(INITIAL_CODE);
    const [fileName, setFileName] = useState<string | null>(null);
    const [languageOverride, setLanguageOverride] = useState(AUTO_LANGUAGE_VALUE);
    const canvasRef = useRef<HTMLDivElement>(null);
    const detected = useDetectedLanguage(code);

    const file = useMemo(() => buildFile(code, detected, languageOverride), [code, detected, languageOverride]);

    return (
        <div className={pageStyles}>
            <ToolName>コードスクリーンショット</ToolName>
            <label className={fieldLabelStyles}>
                言語
                <select
                    className={selectStyles}
                    value={languageOverride}
                    onChange={(event) => {
                        setLanguageOverride(event.currentTarget.value);
                    }}
                >
                    {LANGUAGE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>
            <ExportButtons canvasRef={canvasRef} />
            <CodeWindow
                key={file.lang}
                canvasRef={canvasRef}
                file={file}
                fileName={fileName ?? file.name}
                onFileNameBlur={() => {
                    setFileName((current) => (current?.trim() ? current : null));
                }}
                onFileNameChange={setFileName}
                onEditChange={setCode}
            />
        </div>
    );
};

export default CodeScreenshot;
export { meta };
