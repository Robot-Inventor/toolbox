/** @jsxImportSource @emotion/react */
import { memo } from "react";
import { css } from "@emotion/react";
import TextArea, { type TextareaAutosizeProps } from "react-textarea-autosize";

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
