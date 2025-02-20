import { type HTMLAttributes, memo } from "react";
import { css } from "@emotion/react";

interface ButtonProps {
    children?: string;
    onClick?: () => void | Promise<void>;
}

const buttonStyles = css({
    ":focus-visible": {
        outline: "0.1rem solid var(--color-on-surface-variant)"
    },

    ":hover": {
        background: "rgb(from currentColor r g b / 0.1)",
        color: "var(--color-on-surface)"
    },

    borderRadius: "0.25em",
    color: "var(--color-on-surface-variant)",
    cursor: "pointer",
    height: "fit-content",
    padding: "0.25em 1em"
});

const TextButton = memo(({ children, ...props }: ButtonProps & HTMLAttributes<HTMLButtonElement>) => (
    <button css={buttonStyles} {...props}>
        {children}
    </button>
));

export { TextButton };
