import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { buttonRowStyles, hiddenSvgStyles, qrWrapperStyles, textAreaStyles } from "./QrCodeGenerator.css";
import { FilledButton } from "../components/FilledButton";
import type { MetaDescriptor } from "react-router";
import TextArea from "react-textarea-autosize";
import { TextButton } from "../components/TextButton";
import { ToolName } from "../components/ToolName";

const HASH_SUFFIX_LENGTH = 8;
const QR_SIZE = 256;

const meta = () =>
    [
        {
            title: "QRコードジェネレーター | Toolbox"
        },
        {
            content: "QRコードを生成します。PNGまたはSVGで保存できます。",
            name: "description"
        }
    ] as const satisfies MetaDescriptor[];

/**
 * ArrayBufferを16進数文字列に変換する
 * @param buffer 変換するArrayBuffer
 * @returns 16進数文字列
 */
const toHex = (buffer: ArrayBuffer): string =>
    Array.from(new Uint8Array(buffer))
        // oxlint-disable-next-line no-magic-numbers
        .map((value) => value.toString(16).padStart(2, "0"))
        .join("");

// oxlint-disable-next-line max-lines-per-function
const QrCodeGenerator = (): ReactNode => {
    const [text, setText] = useState("");
    const hashSuffixRef = useRef("00000000");
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        let cancelled = false;
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        void crypto.subtle.digest("SHA-256", data).then((digest) => {
            if (cancelled) return;
            // oxlint-disable-next-line no-magic-numbers
            hashSuffixRef.current = toHex(digest).slice(0, HASH_SUFFIX_LENGTH);
        });

        /**
         * クリーンアップ関数
         */
        return (): void => {
            cancelled = true;
        };
    }, [text]);

    const handleDownloadPng = (): void => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = `qr-code-${hashSuffixRef.current}.png`;
        link.href = dataUrl;
        link.click();
    };

    const handleDownloadSvg = (): void => {
        const svg = svgRef.current;
        if (!svg) return;
        const serialized = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([serialized], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `qr-code-${hashSuffixRef.current}.svg`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <>
            <ToolName>QRコードジェネレーター</ToolName>
            <TextArea
                className={textAreaStyles}
                minRows={4}
                maxRows={12}
                value={text}
                placeholder="QRコードに変換するテキストを入力"
                onChange={(event) => {
                    setText(event.currentTarget.value);
                }}
            />
            <div className={qrWrapperStyles}>
                <QRCodeCanvas ref={canvasRef} value={text} size={QR_SIZE} marginSize={4} />
                <div className={buttonRowStyles}>
                    <FilledButton onClick={handleDownloadPng}>PNGをダウンロード</FilledButton>
                    <TextButton onClick={handleDownloadSvg}>SVGをダウンロード</TextButton>
                </div>
                <QRCodeSVG ref={svgRef} value={text} size={QR_SIZE} marginSize={4} className={hiddenSvgStyles} />
            </div>
        </>
    );
};

export default QrCodeGenerator;
export { meta };
