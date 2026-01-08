/** @jsxImportSource @emotion/react */
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FilledButton } from "../components/FilledButton";
import type { MetaDescriptor } from "react-router";
import TextArea from "react-textarea-autosize";
import { TextButton } from "../components/TextButton";
import { ToolName } from "../components/ToolName";
import { css } from "@emotion/react";

const HASH_SUFFIX_LENGTH = 8;
const QR_SIZE = 256;

// eslint-disable-next-line jsdoc/require-jsdoc
const meta = () =>
    [
        {
            title: "QRコードジェネレーター | Toolbox"
        },
        {
            content: "入力したテキストをリアルタイムでQRコードに変換し、PNGまたはSVGで保存できます。",
            name: "description"
        }
    ] as const satisfies MetaDescriptor[];

const textAreaStyles = css({
    ":focus": {
        borderColor: "var(--color-outline)",
        outline: "none"
    },

    border: "0.1rem solid var(--color-outline-variant)",
    borderRadius: "0.5rem",
    marginBottom: "1.5rem",
    padding: "0.5rem",
    width: "100%"
});

const qrWrapperStyles = css({
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem"
});

const buttonRowStyles = css({
    display: "flex",
    gap: "0.75rem"
});

const hiddenSvgStyles = css({
    height: 0,
    overflow: "hidden",
    pointerEvents: "none",
    width: 0
});

/**
 * ArrayBufferを16進数文字列に変換する
 * @param buffer 変換するArrayBuffer
 * @returns 16進数文字列
 */
const toHex = (buffer: ArrayBuffer): string =>
    Array.from(new Uint8Array(buffer))
        // eslint-disable-next-line no-magic-numbers
        .map((value) => value.toString(16).padStart(2, "0"))
        .join("");

// eslint-disable-next-line max-lines-per-function
const QrCodeGenerator = memo(() => {
    const [text, setText] = useState("");
    const [hashSuffix, setHashSuffix] = useState("00000000");
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        let cancelled = false;
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        void crypto.subtle.digest("SHA-256", data).then((digest) => {
            if (cancelled) return;
            // eslint-disable-next-line no-magic-numbers
            setHashSuffix(toHex(digest).slice(0, HASH_SUFFIX_LENGTH));
        });

        /**
         * クリーンアップ関数
         */
        return (): void => {
            cancelled = true;
        };
    }, [text]);

    const fileBaseName = useMemo(() => `qr-code-${hashSuffix}`, [hashSuffix]);

    const handleDownloadPng = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = `${fileBaseName}.png`;
        link.href = dataUrl;
        link.click();
    }, [fileBaseName]);

    const handleDownloadSvg = useCallback(() => {
        const svg = svgRef.current;
        if (!svg) return;
        const serialized = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([serialized], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `${fileBaseName}.svg`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    }, [fileBaseName]);

    return (
        <>
            <ToolName>QRコードジェネレーター</ToolName>
            <TextArea
                css={textAreaStyles}
                minRows={4}
                maxRows={12}
                value={text}
                placeholder="QRコードに変換するテキストを入力"
                onChange={(event) => {
                    setText(event.currentTarget.value);
                }}
            />
            <div css={qrWrapperStyles}>
                <QRCodeCanvas ref={canvasRef} value={text} size={QR_SIZE} marginSize={4} />
                <div css={buttonRowStyles}>
                    <FilledButton onClick={handleDownloadPng}>PNGをダウンロード</FilledButton>
                    <TextButton onClick={handleDownloadSvg}>SVGをダウンロード</TextButton>
                </div>
                <QRCodeSVG ref={svgRef} value={text} size={QR_SIZE} marginSize={4} css={hiddenSvgStyles} />
            </div>
        </>
    );
});

export default QrCodeGenerator;
export { meta };
