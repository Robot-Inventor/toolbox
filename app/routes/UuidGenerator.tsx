/** @jsxImportSource @emotion/react */
import { type MetaDescriptor, useFetcher } from "react-router";
import { memo, useCallback, useState } from "react";
import { FilledButton } from "../components/FilledButton";
import { TextButton } from "../components/TextButton";
import { Toast } from "../components/Toast";
import { ToolName } from "../components/ToolName";
import { css } from "@emotion/react";

interface ActionResult {
    uuids: string[];
}

const UUID_COUNT = 5;

// eslint-disable-next-line jsdoc/require-jsdoc
const clientAction = (): ActionResult => ({
    uuids: Array.from({ length: UUID_COUNT }, () => crypto.randomUUID())
});

// eslint-disable-next-line jsdoc/require-jsdoc
const meta = () =>
    [
        {
            title: "UUIDジェネレーター | Toolbox"
        }
    ] as const satisfies MetaDescriptor[];

const ulStyles = css({
    marginTop: "1rem",
    width: "fit-content"
});

const liStyles = css({
    display: "grid",
    gridTemplateColumns: "1fr auto",
    justifyContent: "space-between"
});

const itemStyles = css({
    marginRight: "1rem",
    userSelect: "all"
});

const UuidGenerator = memo(() => {
    const fetcher = useFetcher<ActionResult>();
    const [toastVisible, setToastVisible] = useState(false);

    const handleCopy = useCallback((uuid: string) => {
        void navigator.clipboard.writeText(uuid);
        setToastVisible(true);
        setTimeout(() => {
            setToastVisible(false);
            // eslint-disable-next-line no-magic-numbers
        }, 2000);
    }, []);

    return (
        <>
            <ToolName>UUIDジェネレーター</ToolName>
            <Toast visible={toastVisible} message="コピーしました" />
            <fetcher.Form method="post">
                <FilledButton>生成</FilledButton>
            </fetcher.Form>
            {fetcher.data && (
                <ul css={ulStyles}>
                    {fetcher.data.uuids.map((uuid) => (
                        <li key={uuid} css={liStyles}>
                            <span css={itemStyles}>{uuid}</span>
                            <TextButton
                                onClick={() => {
                                    handleCopy(uuid);
                                }}
                            >
                                コピー
                            </TextButton>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
});

export default UuidGenerator;
export { clientAction, meta };
