import type { DragEventHandler, ReactNode } from "react";
import { dropZoneStyles, messageStyles } from "./ExifDropZone.css";

interface ExifDropZoneProps {
    isDragging: boolean;
    onDragLeave: DragEventHandler<HTMLLabelElement>;
    onDragOver: DragEventHandler<HTMLLabelElement>;
    onDrop: DragEventHandler<HTMLLabelElement>;
    onFileSelect: (files: FileList | null) => void;
}

const ExifDropZone = ({ isDragging, onDragLeave, onDragOver, onDrop, onFileSelect }: ExifDropZoneProps): ReactNode => (
    <label
        className={isDragging ? `${dropZoneStyles} drag-over` : dropZoneStyles}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
    >
        <p className={messageStyles}>画像をドラッグ&ドロップ または クリックして選択</p>
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
