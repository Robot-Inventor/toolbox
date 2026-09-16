import { type MetaDescriptor, useFetcher } from "react-router";
import { type ReactNode, useEffect } from "react";
import { toXWebStatusPath, validateXStatusUrl } from "../utils/xUrl";
import { FilledButton } from "../components/FilledButton";
import type { Route } from "./+types/SilentQuote";
import { TextField } from "../components/TextField";
import { ToolName } from "../components/ToolName";
import { showToast } from "../components/Toast";
import { textFieldStyles } from "./SilentQuote.css";

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

    const convertedUrl = new URL(toXWebStatusPath(validationResult.url.pathname), "https://x.com").toString();
    const composerUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(convertedUrl)}`;
    open(composerUrl);

    return { composerUrl, convertedUrl, success: true };
};

const meta = () =>
    [
        {
            title: "通知なしで引用ポスト | Toolbox"
        },
        {
            content: "引用元のユーザーに通知が飛ばないように引用ポストするツールです。",
            name: "description"
        }
    ] as const satisfies MetaDescriptor[];

const SilentQuote = (): ReactNode => {
    const fetcher = useFetcher<ActionResult>();

    useEffect(() => {
        if (fetcher.data && !fetcher.data.success) {
            showToast(fetcher.data.error, "error");
        }
    }, [fetcher.data]);

    return (
        <>
            <ToolName>通知なしで引用ポスト</ToolName>
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

export default SilentQuote;
export { clientAction, meta };
