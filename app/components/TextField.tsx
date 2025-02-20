/** @jsxImportSource @emotion/react */
import { type InputHTMLAttributes, memo } from "react";
import { css } from "@emotion/react";

const wrapperStyles = css({
    ":focus-within": {
        borderColor: "var(--color-outline)"
    },

    border: "0.1rem solid var(--color-outline-variant)",
    borderRadius: "0.25rem",
    transition: "border-color 0.2s"
});

const inputStyles = css({
    "::placeholder": {
        color: "var(--color-on-surface-variant)"
    },

    color: "var(--color-on-surface)",
    padding: "0.25rem 0.5rem",
    width: "100%"
});

const TextField = memo(({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => (
    <div css={wrapperStyles} className={className}>
        <input css={inputStyles} {...props} />
    </div>
));

export { TextField };
