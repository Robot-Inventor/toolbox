import { type HTMLAttributes, memo } from "react";
import { css } from "@emotion/react";

interface ButtonProps {
    children?: string;
}

const buttonStyles = css({
    ":focus-visible": {
        filter: "brightness(0.9)",
        outline: "0.1rem solid var(--color-on-surface)",
        outlineOffset: "0.1rem"
    },

    ":hover": {
        filter: "brightness(0.9)"
    },

    background: "var(--color-on-surface)",
    borderRadius: "0.25em",
    color: "var(--color-surface)",
    cursor: "pointer",
    padding: "0.25em 1em"
});

const FilledButton = memo(({ children, ...props }: ButtonProps & HTMLAttributes<HTMLButtonElement>) => (
    <button css={buttonStyles} {...props}>
        {children}
    </button>
));

export { FilledButton };
