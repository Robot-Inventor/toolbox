import { type MetaDescriptor, useFetcher } from "react-router";
import { type ReactNode, useEffect } from "react";
import { FilledButton } from "../components/FilledButton";
import type { Route } from "./+types/VideoQuote";
import { TextField } from "../components/TextField";
import { ToolName } from "../components/ToolName";
import { showToast } from "../components/Toast";
import { textFieldStyles } from "./VideoQuote.css";
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

const VideoQuote = (): ReactNode => {
    const fetcher = useFetcher<ActionResult>();

    useEffect(() => {
        if (fetcher.data && !fetcher.data.success) {
            showToast(fetcher.data.error, "error");
        }
    }, [fetcher.data]);

    return (
        <>
            <ToolName>動画のみ引用ポスト</ToolName>
            <fetcher.Form method="post">
                <TextField
                    type="url"
                    placeholder="引用したいポストのURLを入力"
                    className={textFieldStyles}
                    name="url"
                />
                <FilledButton>ポストする</FilledButton>
            </fetcher.Form>
        </>
    );
};

export default VideoQuote;
export { clientAction, meta };
