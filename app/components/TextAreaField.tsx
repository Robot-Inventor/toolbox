/** @jsxImportSource @emotion/react */
import { type ComponentProps, memo } from "react";
import TextArea from "react-textarea-autosize";
import { css } from "@emotion/react";

type TextareaAutosizeProps = ComponentProps<typeof TextArea>;

const textareaStyles = css({
    ":focus": {
        borderColor: "var(--color-outline)",
        outline: "none"
    },

    border: "0.1rem solid var(--color-outline-variant)",
    borderRadius: "0.5rem",
    padding: "0.5rem",
    width: "100%"
});

const TextAreaField = memo(({ className, ...props }: TextareaAutosizeProps) => (
    <TextArea css={textareaStyles} className={className} {...props} />
));

export { TextAreaField };
