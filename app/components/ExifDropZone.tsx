/** @jsxImportSource @emotion/react */
import type { DragEventHandler, ReactNode } from "react";
import { css } from "@emotion/react";

interface ExifDropZoneProps {
    isDragging: boolean;
    onDragLeave: DragEventHandler<HTMLLabelElement>;
    onDragOver: DragEventHandler<HTMLLabelElement>;
    onDrop: DragEventHandler<HTMLLabelElement>;
    onFileSelect: (files: FileList | null) => void;
}

const dropZoneStyles = css({
    "&.drag-over": {
        backgroundColor: "var(--color-surface-container-high)",
        borderColor: "var(--color-primary)"
    },

    ":focus-within": {
        borderColor: "var(--color-outline)",
        outline: "none"
    },

    alignItems: "center",
    border: "0.2rem dashed var(--color-outline-variant)",
    borderRadius: "0.5rem",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    justifyContent: "center",
    marginBottom: "1.5rem",
    minHeight: "12rem",
    padding: "2rem",
    transition: "all 0.2s ease"
});

const messageStyles = css({
    color: "var(--color-on-surface-variant)",
    textAlign: "center"
});

const ExifDropZone = ({ isDragging, onDragLeave, onDragOver, onDrop, onFileSelect }: ExifDropZoneProps): ReactNode => (
    <label
        css={dropZoneStyles}
        className={isDragging ? "drag-over" : ""}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
    >
        <p css={messageStyles}>画像をドラッグ&ドロップ または クリックして選択</p>
        <input
            type="file"
            accept="image/*"
            onChange={(event) => {
                onFileSelect(event.target.files);
            }}
            style={{ display: "none" }}
        />
    </label>
);

export { ExifDropZone };
