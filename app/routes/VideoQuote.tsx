/** @jsxImportSource @emotion/react */
import { type MetaDescriptor, useFetcher } from "react-router";
import { memo, useEffect, useState } from "react";
import { FilledButton } from "../components/FilledButton";
import type { Route } from "./+types/VideoQuote";
import { TextField } from "../components/TextField";
import { Toast } from "../components/Toast";
import { ToolName } from "../components/ToolName";
import { css } from "@emotion/react";
import { validateXStatusUrl } from "../utils/xUrl";

interface SuccessActionResult {
    success: true;
    convertedUrl: string;
    composerUrl: string;
}

interface ErrorActionResult {
    success: false;
    error: string;
}

type ActionResult = SuccessActionResult | ErrorActionResult;

// eslint-disable-next-line jsdoc/require-jsdoc, max-statements
const clientAction = async ({ request }: Route.ClientActionArgs): Promise<ActionResult> => {
    const data = await request.formData();
    const url = data.get("url");
    if (typeof url !== "string") return { error: "URLが見つかりませんでした。", success: false };

    const validationResult = validateXStatusUrl(url);
    if (!validationResult.ok) return { error: validationResult.error, success: false };

    const statusPath = validationResult.url.pathname;
    const normalizedStatusPath = statusPath.endsWith("/video/1")
        ? statusPath
        : `${statusPath.replace(/\/+$/u, "")}/video/1`;
    const convertedUrl = new URL(normalizedStatusPath, "https://x.com").toString();
    const composerUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(convertedUrl)}`;
    open(composerUrl);

    return { composerUrl, convertedUrl, success: true };
};

// eslint-disable-next-line jsdoc/require-jsdoc
const meta = () =>
    [
        {
            title: "動画のみ引用ポスト | Toolbox"
        },
        {
            content: "XのポストURL末尾に/video/1を付けて動画のみ引用するツールです。",
            name: "description"
        }
    ] as const satisfies MetaDescriptor[];

const textFieldStyles = css({
    marginBottom: "1rem"
});

const VideoQuote = memo(() => {
    const [toastVisible, setToastVisible] = useState(false);
    const fetcher = useFetcher<ActionResult>();

    useEffect(() => {
        if (fetcher.data && !fetcher.data.success) {
            setToastVisible(true);
        }
    }, [fetcher.data]);

    return (
        <>
            <ToolName>動画のみ引用ポスト</ToolName>
            <fetcher.Form method="post">
                <TextField type="url" placeholder="引用したいポストのURLを入力" css={textFieldStyles} name="url" />
                <FilledButton>ポストする</FilledButton>
            </fetcher.Form>
            {fetcher.data && !fetcher.data.success && (
                <Toast
                    open={toastVisible}
                    onOpenChange={setToastVisible}
                    message={fetcher.data.error}
                    icon="priority_high"
                    type="error"
                />
            )}
        </>
    );
});

export default VideoQuote;
export { clientAction, meta };
