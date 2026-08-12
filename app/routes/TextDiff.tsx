/** @jsxImportSource @emotion/react */
import { type ChangeEventHandler, type ReactNode, useState, useSyncExternalStore } from "react";
import { FileDiff } from "@pierre/diffs/react";
import type { MetaDescriptor } from "react-router";
import { TextAreaField } from "../components/TextAreaField";
import { ToolName } from "../components/ToolName";
import { css } from "@emotion/react";
import { parseDiffFromFile } from "@pierre/diffs";

type DiffLanguage = "markdown" | "typescript" | "html" | "css";
type DiffLayout = "split" | "unified";
type FileDiffData = ReturnType<typeof parseDiffFromFile>;

interface LanguageOption {
    extension: string;
    label: string;
    value: DiffLanguage;
}

interface TextDiffInputs {
    afterText: string;
    beforeText: string;
    language: DiffLanguage;
    onAfterTextChange: ChangeEventHandler<HTMLTextAreaElement>;
    onBeforeTextChange: ChangeEventHandler<HTMLTextAreaElement>;
    onLanguageChange: ChangeEventHandler<HTMLSelectElement>;
}

interface DiffPreviewModel {
    diffLayout: DiffLayout;
    fileDiff: FileDiffData;
    hasNoDiff: boolean;
    isDiffEmpty: boolean;
}

const DEFAULT_DIFF_LAYOUT: DiffLayout = "split";
const DEFAULT_LANGUAGE: DiffLanguage = "markdown";
const EMPTY_TEXT_LENGTH = 0;
const FIRST_LANGUAGE_OPTION_INDEX = 0;
const MAX_TEXTAREA_ROWS = 24;
const MIN_TEXTAREA_ROWS = 12;
const PORTRAIT_MEDIA_QUERY = "(orientation: portrait)";
const LINE_BREAK_REGEX = /(?:\r\n|\r|\n)$/u;
const EMPTY_STATE_MESSAGE = "左右の入力欄にテキストを入れると差分を表示します。";
const NO_DIFF_MESSAGE = "差分はありません。";

const LANGUAGE_OPTIONS = [
    { extension: "md", label: "Markdown", value: "markdown" },
    { extension: "ts", label: "TypeScript", value: "typescript" },
    { extension: "html", label: "HTML", value: "html" },
    { extension: "css", label: "CSS", value: "css" }
] as const satisfies readonly LanguageOption[];

const meta = () =>
    [
        {
            title: "テキスト差分比較 | Toolbox"
        },
        {
            content: "テキストの差分を比較するツールです。",
            name: "description"
        }
    ] as const satisfies MetaDescriptor[];

const subscribeToOrientation = (onStoreChange: () => void): (() => void) => {
    const mediaQueryList = window.matchMedia(PORTRAIT_MEDIA_QUERY);
    mediaQueryList.addEventListener("change", onStoreChange);
    return () => {
        mediaQueryList.removeEventListener("change", onStoreChange);
    };
};

const getDiffLayoutSnapshot = (): DiffLayout => {
    if (typeof window === "undefined") return DEFAULT_DIFF_LAYOUT;
    return window.matchMedia(PORTRAIT_MEDIA_QUERY).matches ? "unified" : DEFAULT_DIFF_LAYOUT;
};

const useResponsiveDiffLayout = (): DiffLayout =>
    useSyncExternalStore(subscribeToOrientation, getDiffLayoutSnapshot, () => DEFAULT_DIFF_LAYOUT);

const normalizeTextForDiff = (text: string): string => {
    if (text.length === EMPTY_TEXT_LENGTH || LINE_BREAK_REGEX.test(text)) return text;
    return `${text}${text.includes("\r\n") ? "\r\n" : "\n"}`;
};

const getSelectedLanguageOption = (language: DiffLanguage): LanguageOption =>
    LANGUAGE_OPTIONS.find((option) => option.value === language) ?? LANGUAGE_OPTIONS[FIRST_LANGUAGE_OPTION_INDEX];

const createFileDiff = (beforeText: string, afterText: string, selectedLanguage: LanguageOption): FileDiffData =>
    parseDiffFromFile(
        {
            contents: beforeText,
            lang: selectedLanguage.value,
            name: `before.${selectedLanguage.extension}`
        },
        {
            contents: afterText,
            lang: selectedLanguage.value,
            name: `after.${selectedLanguage.extension}`
        }
    );

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
    "@media (orientation: landscape)": {
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))"
    },

    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "minmax(0, 1fr)"
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

const useTextDiffInputs = (): TextDiffInputs => {
    const [language, setLanguage] = useState<DiffLanguage>(DEFAULT_LANGUAGE);
    const [beforeText, setBeforeText] = useState("");
    const [afterText, setAfterText] = useState("");

    const onLanguageChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        setLanguage(event.currentTarget.value as DiffLanguage);
    };

    const onBeforeTextChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        setBeforeText(event.currentTarget.value);
    };

    const onAfterTextChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        setAfterText(event.currentTarget.value);
    };

    return { afterText, beforeText, language, onAfterTextChange, onBeforeTextChange, onLanguageChange };
};

const useDiffPreview = (inputs: Pick<TextDiffInputs, "afterText" | "beforeText" | "language">): DiffPreviewModel => {
    const { afterText, beforeText, language } = inputs;
    const diffLayout = useResponsiveDiffLayout();
    const normalizedBeforeText = normalizeTextForDiff(beforeText);
    const normalizedAfterText = normalizeTextForDiff(afterText);
    const hasNoDiff = normalizedBeforeText === normalizedAfterText;
    const selectedLanguage = getSelectedLanguageOption(language);
    const fileDiff = createFileDiff(normalizedBeforeText, normalizedAfterText, selectedLanguage);
    const isDiffEmpty = beforeText.length === EMPTY_TEXT_LENGTH && afterText.length === EMPTY_TEXT_LENGTH;

    return { diffLayout, fileDiff, hasNoDiff, isDiffEmpty };
};

const LanguageSelector = ({
    language,
    onLanguageChange
}: Pick<TextDiffInputs, "language" | "onLanguageChange">): ReactNode => (
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
);

const TextEditors = ({
    afterText,
    beforeText,
    onAfterTextChange,
    onBeforeTextChange
}: Pick<TextDiffInputs, "afterText" | "beforeText" | "onAfterTextChange" | "onBeforeTextChange">): ReactNode => (
    <div css={editorGridStyles}>
        <section css={sectionStyles}>
            <h3 css={fieldLabelStyles}>Before</h3>
            <TextAreaField
                maxRows={MAX_TEXTAREA_ROWS}
                minRows={MIN_TEXTAREA_ROWS}
                onChange={onBeforeTextChange}
                placeholder="変更前のテキスト"
                spellCheck={false}
                value={beforeText}
            />
        </section>
        <section css={sectionStyles}>
            <h3 css={fieldLabelStyles}>After</h3>
            <TextAreaField
                maxRows={MAX_TEXTAREA_ROWS}
                minRows={MIN_TEXTAREA_ROWS}
                onChange={onAfterTextChange}
                placeholder="変更後のテキスト"
                spellCheck={false}
                value={afterText}
            />
        </section>
    </div>
);

const DiffPreview = ({ diffLayout, fileDiff, hasNoDiff, isDiffEmpty }: DiffPreviewModel): ReactNode => {
    if (isDiffEmpty) return <div css={emptyStateStyles}>{EMPTY_STATE_MESSAGE}</div>;
    if (hasNoDiff) return <div css={emptyStateStyles}>{NO_DIFF_MESSAGE}</div>;

    return (
        <FileDiff
            css={diffStyles}
            disableWorkerPool
            fileDiff={fileDiff}
            options={{
                diffStyle: diffLayout,
                overflow: "wrap",
                theme: "pierre-dark",
                themeType: "dark"
            }}
        />
    );
};

const TextDiff = (): ReactNode => {
    const inputs = useTextDiffInputs();
    const preview = useDiffPreview(inputs);

    return (
        <div css={pageStyles}>
            <ToolName>テキスト差分比較</ToolName>
            <LanguageSelector language={inputs.language} onLanguageChange={inputs.onLanguageChange} />
            <TextEditors
                afterText={inputs.afterText}
                beforeText={inputs.beforeText}
                onAfterTextChange={inputs.onAfterTextChange}
                onBeforeTextChange={inputs.onBeforeTextChange}
            />
            <section css={sectionStyles}>
                <h3 css={fieldLabelStyles}>Diff</h3>
                <DiffPreview {...preview} />
            </section>
        </div>
    );
};

export default TextDiff;
export { meta };
