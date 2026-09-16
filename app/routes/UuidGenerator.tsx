import { type MetaDescriptor, useFetcher } from "react-router";
import { type ReactNode, useState } from "react";
import { itemStyles, liStyles, ulStyles } from "./UuidGenerator.css";
import { Check } from "lucide-react";
import { FilledButton } from "../components/FilledButton";
import { TextButton } from "../components/TextButton";
import { Toast } from "../components/Toast";
import { ToolName } from "../components/ToolName";

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
    const [toastVisible, setToastVisible] = useState(false);

    const handleCopy = (uuid: string): void => {
        void navigator.clipboard.writeText(uuid);
        setToastVisible(true);
    };

    return (
        <>
            <ToolName>UUIDジェネレーター</ToolName>
            <Toast
                open={toastVisible}
                onOpenChange={setToastVisible}
                message="コピーしました"
                icon={Check}
                type="info"
            />
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
