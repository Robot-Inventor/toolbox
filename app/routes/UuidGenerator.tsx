import { type MetaDescriptor, useFetcher } from "react-router";
import { itemStyles, liStyles, ulStyles } from "./UuidGenerator.css";
import { FilledButton } from "../components/FilledButton";
import type { ReactNode } from "react";
import { TextButton } from "../components/TextButton";
import { ToolName } from "../components/ToolName";
import { showToast } from "../components/Toast";

interface ActionResult {
    uuids: string[];
}

const UUID_COUNT = 5;

const clientAction = (): ActionResult => ({
    uuids: Array.from({ length: UUID_COUNT }, () => crypto.randomUUID())
});

const meta = () =>
    [
        {
            title: "UUIDジェネレーター | Toolbox"
        },
        {
            content: "UUIDを生成するツールです。",
            name: "description"
        }
    ] as const satisfies MetaDescriptor[];

const UuidGenerator = (): ReactNode => {
    const fetcher = useFetcher<ActionResult>();

    const handleCopy = (uuid: string): void => {
        void navigator.clipboard.writeText(uuid);
        showToast("コピーしました", "info");
    };

    return (
        <>
            <ToolName>UUIDジェネレーター</ToolName>
            <fetcher.Form method="post">
                <FilledButton>生成</FilledButton>
            </fetcher.Form>
            {fetcher.data && (
                <ul className={ulStyles}>
                    {fetcher.data.uuids.map((uuid) => (
                        <li key={uuid} className={liStyles}>
                            <span className={itemStyles}>{uuid}</span>
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
};

export default UuidGenerator;
export { clientAction, meta };
