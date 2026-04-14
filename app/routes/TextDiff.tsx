/** @jsxImportSource @emotion/react */
import { type ChangeEventHandler, memo, useMemo, useState, useSyncExternalStore } from "react";
import { type MetaDescriptor } from "react-router";
import { FileDiff } from "@pierre/diffs/react";
import { parseDiffFromFile } from "@pierre/diffs";
import { ToolName } from "../components/ToolName";
import { css } from "@emotion/react";
import { TextAreaField } from "../components/TextAreaField";

type DiffLanguage = "markdown" | "typescript" | "html" | "css";
type DiffLayout = "split" | "unified";

interface LanguageOption {
    extension: string;
    label: string;
    value: DiffLanguage;
}

const PORTRAIT_MEDIA_QUERY = "(orientation: portrait)";
const LINE_BREAK_REGEX = /(?:\r\n|\r|\n)$/u;

const LANGUAGE_OPTIONS = [
    { extension: "md", label: "Markdown", value: "markdown" },
    { extension: "ts", label: "TypeScript", value: "typescript" },
    { extension: "html", label: "HTML", value: "html" },
    { extension: "css", label: "CSS", value: "css" }
] as const satisfies readonly LanguageOption[];

// eslint-disable-next-line jsdoc/require-jsdoc
const meta = () =>
    [
        {
            title: "テキスト差分比較 | Toolbox"
        },
        {
            content:
                "Markdown / TypeScript / HTML / CSS の差分を @pierre/diffs で比較できるツールです。横長では split、縦長では stacked 相当の表示を使います。",
            name: "description"
        }
    ] as const satisfies MetaDescriptor[];

const subscribeToOrientation = (onStoreChange: () => void) => {
    if (typeof window === "undefined") return () => undefined;

    const mediaQueryList = window.matchMedia(PORTRAIT_MEDIA_QUERY);
    mediaQueryList.addEventListener("change", onStoreChange);
    return () => {
        mediaQueryList.removeEventListener("change", onStoreChange);
    };
};

const getDiffLayoutSnapshot = (): DiffLayout => {
    if (typeof window === "undefined") return "split";
    return window.matchMedia(PORTRAIT_MEDIA_QUERY).matches ? "unified" : "split";
};

const useResponsiveDiffLayout = (): DiffLayout =>
    useSyncExternalStore(subscribeToOrientation, getDiffLayoutSnapshot, () => "split");

const normalizeTextForDiff = (text: string): string => {
    if (text.length === 0 || LINE_BREAK_REGEX.test(text)) return text;
    return `${text}${text.includes("\r\n") ? "\r\n" : "\n"}`;
};

const pageStyles = css({
    display: "grid",
    gap: "1.25rem",
    left: "50%",
    position: "relative",
    transform: "translateX(-50%)",
    width: "min(96rem, calc(100vw - 2rem))"
});

const controlsStyles = css({
    display: "grid",
    gap: "0.5rem"
});

const languageFieldStyles = css({
    display: "grid",
    gap: "0.5rem",
    width: "fit-content"
});

const fieldLabelStyles = css({
    color: "var(--color-on-surface)",
    fontSize: "0.95rem",
    fontWeight: 700
});

const selectStyles = css({
    ":focus": {
        borderColor: "var(--color-outline)",
        outline: "none"
    },

    background: "var(--color-surface-container)",
    border: "0.1rem solid var(--color-outline-variant)",
    borderRadius: "0.5rem",
    color: "var(--color-on-surface)",
    minWidth: "12rem",
    padding: "0.6rem 0.75rem"
});

const editorGridStyles = css({
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "minmax(0, 1fr)",

    "@media (orientation: landscape)": {
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))"
    }
});

const sectionStyles = css({
    display: "grid",
    gap: "0.5rem"
});

const emptyStateStyles = css({
    color: "var(--color-on-surface-variant)",
    minHeight: "4rem"
});

const diffStyles = css({
    display: "block",
    width: "100%"
});

const TextDiff = memo(() => {
    const [language, setLanguage] = useState<DiffLanguage>("markdown");
    const [beforeText, setBeforeText] = useState("");
    const [afterText, setAfterText] = useState("");
    const diffLayout = useResponsiveDiffLayout();
    const normalizedBeforeText = useMemo(() => normalizeTextForDiff(beforeText), [beforeText]);
    const normalizedAfterText = useMemo(() => normalizeTextForDiff(afterText), [afterText]);
    const hasNoDiff = normalizedBeforeText === normalizedAfterText;

    const selectedLanguage = useMemo(
        () => LANGUAGE_OPTIONS.find((option) => option.value === language) ?? LANGUAGE_OPTIONS[0],
        [language]
    );

    const fileDiff = useMemo(
        () =>
            parseDiffFromFile(
                {
                    contents: normalizedBeforeText,
                    lang: language,
                    name: `before.${selectedLanguage.extension}`
                },
                {
                    contents: normalizedAfterText,
                    lang: language,
                    name: `after.${selectedLanguage.extension}`
                }
            ),
        [language, normalizedAfterText, normalizedBeforeText, selectedLanguage.extension]
    );

    const onLanguageChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        setLanguage(event.currentTarget.value as DiffLanguage);
    };

    const onBeforeTextChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        setBeforeText(event.currentTarget.value);
    };

    const onAfterTextChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        setAfterText(event.currentTarget.value);
    };

    const isDiffEmpty = beforeText.length === 0 && afterText.length === 0;

    return (
        <div css={pageStyles}>
            <ToolName>テキスト差分比較</ToolName>
            <div css={controlsStyles}>
                <label css={languageFieldStyles}>
                    <span css={fieldLabelStyles}>言語</span>
                    <select css={selectStyles} value={language} onChange={onLanguageChange}>
                        {LANGUAGE_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div css={editorGridStyles}>
                <section css={sectionStyles}>
                    <h3 css={fieldLabelStyles}>Before</h3>
                    <TextAreaField
                        maxRows={24}
                        minRows={12}
                        onChange={onBeforeTextChange}
                        placeholder="変更前のテキスト"
                        spellCheck={false}
                        value={beforeText}
                    />
                </section>
                <section css={sectionStyles}>
                    <h3 css={fieldLabelStyles}>After</h3>
                    <TextAreaField
                        maxRows={24}
                        minRows={12}
                        onChange={onAfterTextChange}
                        placeholder="変更後のテキスト"
                        spellCheck={false}
                        value={afterText}
                    />
                </section>
            </div>
            <section css={sectionStyles}>
                <h3 css={fieldLabelStyles}>Diff</h3>
                {isDiffEmpty ? (
                    <div css={emptyStateStyles}>左右の入力欄にテキストを入れると差分を表示します。</div>
                ) : hasNoDiff ? (
                    <div css={emptyStateStyles}>差分はありません。</div>
                ) : (
                    <FileDiff
                        css={diffStyles}
                        disableWorkerPool
                        fileDiff={fileDiff}
                        options={{
                            diffStyle: diffLayout,
                            overflow: "wrap",
                            theme: "tokyo-night",
                            themeType: "dark"
                        }}
                    />
                )}
            </section>
        </div>
    );
});

export default TextDiff;
export { meta };
