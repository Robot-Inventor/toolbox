/** @jsxImportSource @emotion/react */
import { EditProvider, File } from "@pierre/diffs/react";
import { Editor, type EditorFactory } from "@pierre/diffs/edit";
import type { ReactNode, RefObject } from "react";
import { css } from "@emotion/react";

interface CodeWindowProps {
    canvasRef: RefObject<HTMLDivElement | null>;
    file: { contents: string; lang: string; name: string };
    fileName: string;
    onFileNameBlur: () => void;
    onFileNameChange: (name: string) => void;
    onEditChange: (contents: string) => void;
}

const createEditor: EditorFactory<undefined, undefined> = (editorType, options, editStateKey) =>
    new Editor(editorType, options, editStateKey);

const canvasStyles = css({
    background: "#9bb4c4",
    padding: "3rem",
    width: "min(56rem, 100%)"
});

const windowStyles = css({
    background: "#1e1e2e",
    borderRadius: "0.75rem",
    boxShadow: "0 1.5rem 4rem rgba(0, 0, 0, 0.45)",
    overflow: "hidden",
    width: "min(56rem, 100%)"
});

const titleBarStyles = css({
    alignItems: "center",
    background: "#181825",
    display: "flex",
    gap: "0.5rem",
    padding: "0.7rem 1rem"
});

const trafficLightBase = css({
    borderRadius: "50%",
    height: "0.75rem",
    width: "0.75rem"
});

const titleStyles = css({
    color: "#a6adc8",
    flex: 1,
    textAlign: "center"
});

const titleInputStyles = css({
    ":focus": {
        outline: "0.1rem solid #a6adc8"
    },

    textAlign: "center"
});

const editorContainerStyles = css({
    minHeight: "10rem"
});

const CodeWindow = ({
    canvasRef,
    file,
    fileName,
    onEditChange,
    onFileNameBlur,
    onFileNameChange
}: CodeWindowProps): ReactNode => (
    <div css={canvasStyles} ref={canvasRef}>
        <div css={windowStyles}>
            <div css={titleBarStyles}>
                <span css={[trafficLightBase, { background: "#ff5f57" }]} />
                <span css={[trafficLightBase, { background: "#febc2e" }]} />
                <span css={[trafficLightBase, { background: "#28c840" }]} />
                <input
                    aria-label="ファイル名"
                    css={[titleStyles, titleInputStyles]}
                    type="text"
                    value={fileName}
                    onChange={(event) => {
                        onFileNameChange(event.currentTarget.value);
                    }}
                    onBlur={onFileNameBlur}
                />
            </div>
            <div css={editorContainerStyles}>
                <EditProvider createEditor={createEditor}>
                    <File
                        key={file.lang}
                        disableWorkerPool
                        edit
                        file={file}
                        options={{
                            disableFileHeader: true,
                            overflow: "wrap",
                            theme: "catppuccin-macchiato",
                            themeType: "dark",
                            unsafeCSS:
                                ":host, [data-code] { --diffs-bg: #1e1e2e; --diffs-line-bg: #1e1e2e; --diffs-line-height: 1.2rem; } [data-code], [data-content] { line-height: 1.2rem; }"
                        }}
                        onEditChange={(event) => {
                            onEditChange(event.file.contents);
                        }}
                    />
                </EditProvider>
            </div>
        </div>
    </div>
);
export { CodeWindow };
