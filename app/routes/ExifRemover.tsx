/** @jsxImportSource @emotion/react */
import { memo, useCallback, useRef, useState } from "react";
import { FilledButton } from "../components/FilledButton";
import type { MetaDescriptor } from "react-router";
import { ToolName } from "../components/ToolName";
import { css } from "@emotion/react";

// eslint-disable-next-line jsdoc/require-jsdoc
const meta = () =>
    [
        {
            title: "Exif削除ツール | Toolbox"
        },
        {
            content:
                "画像のExif情報を削除するツールです。orientationなど画像の見た目に影響する重要なプロパティは保持します。",
            name: "description"
        }
    ] as const satisfies MetaDescriptor[];

const dropZoneStyles = css({
    "&.drag-over": {
        backgroundColor: "var(--color-surface-container-high)",
        borderColor: "var(--color-primary)"
    },

    ":focus": {
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

const previewImageStyles = css({
    borderRadius: "0.5rem",
    maxHeight: "20rem",
    maxWidth: "100%",
    objectFit: "contain"
});

const buttonContainerStyles = css({
    display: "flex",
    gap: "0.75rem",
    justifyContent: "center",
    marginTop: "1rem"
});

const hiddenCanvasStyles = css({
    display: "none"
});

const messageStyles = css({
    color: "var(--color-on-surface-variant)",
    textAlign: "center"
});

const DEFAULT_QUALITY = 0.95;
const CANVAS_ORIGIN_X = 0;
const CANVAS_ORIGIN_Y = 0;

/**
 * Create a blob from canvas and set it as the processed URL
 * @param canvas The canvas element
 * @param fileType The file type
 * @param setUrl The function to set the processed URL
 */
const createProcessedBlob = (canvas: HTMLCanvasElement, fileType: string, setUrl: (url: string) => void): void => {
    canvas.toBlob(
        (blob) => {
            if (blob) {
                const newProcessedUrl = URL.createObjectURL(blob);
                setUrl(newProcessedUrl);
            }
        },
        fileType,
        DEFAULT_QUALITY
    );
};

/**
 * Draw image bitmap to canvas
 * @param canvas The canvas element
 * @param bitmap The image bitmap
 */
const drawBitmapToCanvas = (canvas: HTMLCanvasElement, bitmap: ImageBitmap): void => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = bitmap.width;
    canvas.height = bitmap.height;

    // CreateImageBitmap automatically applies EXIF orientation
    ctx.drawImage(bitmap, CANVAS_ORIGIN_X, CANVAS_ORIGIN_Y);
};

/**
 * Trigger download of processed image
 * @param url The URL of the processed image
 * @param filename The original filename
 */
const downloadProcessedImage = (url: string, filename: string): void => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `no-exif-${filename}`;
    link.click();
};

// eslint-disable-next-line max-lines-per-function
const ExifRemover = memo(() => {
    const [state, setState] = useState({
        isDragging: false,
        originalFile: null as File | null,
        previewUrl: null as string | null,
        processedUrl: null as string | null
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    /**
     * Process the image and remove EXIF data
     * @param file The image file to process
     */
    const processImage = useCallback(async (file: File): Promise<void> => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // CreateImageBitmap automatically applies EXIF orientation
        const bitmap = await createImageBitmap(file);

        drawBitmapToCanvas(canvas, bitmap);

        // Create processed image URL
        createProcessedBlob(canvas, file.type, (url) => {
            setState((previous) => ({ ...previous, processedUrl: url }));
        });

        const objectUrl = URL.createObjectURL(file);
        setState({ isDragging: false, originalFile: file, previewUrl: objectUrl, processedUrl: null });
    }, []);

    const handleFileSelect = useCallback(
        (files: FileList | null) => {
            const [file] = files ?? [];
            if (!file?.type.startsWith("image/")) return;
            void processImage(file);
        },
        [processImage]
    );

    const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setState((previous) => ({ ...previous, isDragging: true }));
    }, []);

    const handleDragEnd = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            setState((previous) => ({ ...previous, isDragging: false }));
            handleFileSelect(event.dataTransfer.files);
        },
        [handleFileSelect]
    );

    const handleClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleDownload = useCallback(() => {
        if (!state.processedUrl || !state.originalFile) return;
        downloadProcessedImage(state.processedUrl, state.originalFile.name);
    }, [state.processedUrl, state.originalFile]);

    return (
        <>
            <ToolName>Exif削除ツール</ToolName>
            <div
                css={dropZoneStyles}
                className={state.isDragging ? "drag-over" : ""}
                onDragOver={handleDragOver}
                onDragLeave={handleDragEnd}
                onDrop={handleDragEnd}
                onClick={handleClick}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        handleClick();
                    }
                }}
            >
                <p css={messageStyles}>画像をドラッグ&ドロップ または クリックして選択</p>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                        handleFileSelect(event.target.files);
                    }}
                    style={{ display: "none" }}
                />
            </div>
            {state.previewUrl && (
                <>
                    <img src={state.previewUrl} alt="Preview" css={previewImageStyles} />
                    <div css={buttonContainerStyles}>
                        {state.processedUrl && <FilledButton onClick={handleDownload}>ダウンロード</FilledButton>}
                    </div>
                </>
            )}
            <canvas ref={canvasRef} css={hiddenCanvasStyles} />
        </>
    );
});

export default ExifRemover;
export { meta };
