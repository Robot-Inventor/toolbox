import { EditProvider, File } from "@pierre/diffs/react";
import { Editor, type EditorFactory } from "@pierre/diffs/edit";
import type { ReactNode, RefObject } from "react";
import {
    canvasStyles,
    editorContainerStyles,
    titleBarStyles,
    titleInputStyles,
    titleStyles,
    trafficLightStyles,
    windowStyles
} from "./CodeWindow.css";
import { mergeClassNames } from "../utils/mergeClassNames";

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

const CodeWindow = ({
    canvasRef,
    file,
    fileName,
    onEditChange,
    onFileNameBlur,
    onFileNameChange
}: CodeWindowProps): ReactNode => (
    <div className={canvasStyles} ref={canvasRef}>
        <div className={windowStyles}>
            <div className={titleBarStyles}>
                <span className={trafficLightStyles.red} />
                <span className={trafficLightStyles.yellow} />
                <span className={trafficLightStyles.green} />
                <input
                    aria-label="ファイル名"
                    className={mergeClassNames(titleStyles, titleInputStyles)}
                    type="text"
                    value={fileName}
                    onChange={(event) => {
                        onFileNameChange(event.currentTarget.value);
                    }}
                    onBlur={onFileNameBlur}
                />
            </div>
            <div className={editorContainerStyles}>
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
