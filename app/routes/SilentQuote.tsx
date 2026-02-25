/** @jsxImportSource @emotion/react */
import { type MetaDescriptor, useFetcher } from "react-router";
import { memo, useState } from "react";
import { toXWebStatusPath, validateXStatusUrl } from "../utils/xUrl";
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

// eslint-disable-next-line jsdoc/require-jsdoc
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

// eslint-disable-next-line jsdoc/require-jsdoc
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

const textFieldStyles = css({
    marginBottom: "1rem"
});

const UuidGenerator = memo(() => {
    const [toastVisible, setToastVisible] = useState(false);
    const fetcher = useFetcher<ActionResult>();
    const [prevFetcherData, setPrevFetcherData] = useState(fetcher.data);

    if (fetcher.data !== prevFetcherData) {
        setPrevFetcherData(fetcher.data);
        if (fetcher.data && !fetcher.data.success) {
            setToastVisible(true);
        }
    }

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
