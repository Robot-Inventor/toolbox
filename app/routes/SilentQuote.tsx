/** @jsxImportSource @emotion/react */
import { type MetaDescriptor, useFetcher } from "react-router";
import { memo, useEffect, useState } from "react";
import { FilledButton } from "../components/FilledButton";
import type { Route } from "./+types/SilentQuote";
import { TextField } from "../components/TextField";
import { Toast } from "../components/Toast";
import { ToolName } from "../components/ToolName";
import { css } from "@emotion/react";

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

    const parsedUrl = URL.parse(url);
    if (!parsedUrl) return { error: "有効なURLを入力してください。", success: false };

    if (!["twitter.com", "mobile.twitter.com", "x.com", "mobile.x.com"].includes(parsedUrl.hostname)) {
        return { error: "XのURLを入力してください。", success: false };
    }
    if (!/\/[^/]+\/status\//u.exec(parsedUrl.pathname)) {
        return { error: "ポストのURLを入力してください。", success: false };
    }

    const convertedUrl = new URL(
        parsedUrl.pathname.replace(/\/[^/]+\/status\//u, "/i/web/status/"),
        "https://x.com"
    ).toString();
    const composerUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(convertedUrl)}`;
    open(composerUrl);

    return { composerUrl, convertedUrl, success: true };
};

// eslint-disable-next-line jsdoc/require-jsdoc
const meta = () =>
    [
        {
            title: "通知なしで引用ポスト | Toolbox"
        }
    ] as const satisfies MetaDescriptor[];

const textFieldStyles = css({
    marginBottom: "1rem"
});

const UuidGenerator = memo(() => {
    const [toastVisible, setToastVisible] = useState(false);
    const fetcher = useFetcher<ActionResult>();

    useEffect(() => {
        if (fetcher.data && !fetcher.data.success) {
            setToastVisible(true);
        }
    }, [fetcher.data]);

    return (
        <>
            <ToolName>通知なしで引用ポスト</ToolName>
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

export default UuidGenerator;
export { clientAction, meta };
