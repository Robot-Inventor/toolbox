/** @jsxImportSource @emotion/react */
import { type FormEventHandler, memo, useCallback } from "react";
import { type MetaDescriptor, useFetcher } from "react-router";
import type { Route } from "./+types/CharacterCounter";
import TextArea from "react-textarea-autosize";
import { ToolName } from "../components/ToolName";
import { css } from "@emotion/react";

interface ActionResult {
    lengthAll: number;
    lengthWithoutNewlines: number;
}

// eslint-disable-next-line jsdoc/require-jsdoc
const clientAction = async ({ request }: Route.ClientActionArgs): Promise<ActionResult> => {
    const data = await request.formData();
    const text = data.get("text");
    if (typeof text !== "string") return { lengthAll: 0, lengthWithoutNewlines: 0 };

    const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });
    const lengthAll = [...segmenter.segment(text)].length;
    const lengthWithoutNewlines = [...segmenter.segment(text.replace(/[\r\n]/gu, ""))].length;
    return { lengthAll, lengthWithoutNewlines };
};

// eslint-disable-next-line jsdoc/require-jsdoc
const meta = () =>
    [
        {
            title: "文字数カウンター | Toolbox"
        },
        {
            content:
                "できるだけ正確に文字数をカウントするツールです。一般的な文字数カウンターと違い、絵文字を含むテキストも正確にカウントできます。",
            name: "description"
        }
    ] as const satisfies MetaDescriptor[];

const textareaStyles = css({
    ":focus": {
        borderColor: "var(--color-outline)",
        outline: "none"
    },

    border: "0.1rem solid var(--color-outline-variant)",
    borderRadius: "0.5rem",
    height: "10em",
    padding: "0.5rem",
    width: "100%"
});

const CharacterCounter = memo(() => {
    const fetcher = useFetcher<ActionResult>();

    const onChangeHandler: FormEventHandler<HTMLTextAreaElement> = useCallback(
        (event) => {
            const { form } = event.currentTarget;
            if (!form) throw new Error("Form not found");
            void fetcher.submit(form);
        },
        [fetcher]
    );

    return (
        <>
            <ToolName>文字数カウンター</ToolName>
            <fetcher.Form method="post">
                <TextArea css={textareaStyles} minRows={5} maxRows={30} name="text" onChange={onChangeHandler} />
            </fetcher.Form>
            {fetcher.data && (
                <>
                    <p>文字数（改行を含む）: {fetcher.data.lengthAll}</p>
                    <p>文字数（改行を含まない）: {fetcher.data.lengthWithoutNewlines}</p>
                </>
            )}
        </>
    );
});

export default CharacterCounter;
export { clientAction, meta };
