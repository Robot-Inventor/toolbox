import { type HTMLAttributes, memo } from "react";
import { Icon } from "./Icon";
import { css } from "@emotion/react";

interface IconButtonProps {
    children: string;
}

const buttonStyles = css({
    ":focus-visible": {
        background: "rgb(from currentColor r g b / 0.1)",
        outline: "0.1rem solid var(--color-on-surface-variant)"
    },

    ":hover": {
        background: "rgb(from currentColor r g b / 0.1)",
        color: "var(--color-on-surface)"
    },

    alignItems: "center",
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    height: "2.5em",
    justifyContent: "center",
    width: "2.5em"
});

const IconButton = memo(({ children, ...props }: IconButtonProps & HTMLAttributes<HTMLButtonElement>) => (
    <button css={buttonStyles} {...props}>
        <Icon>{children}</Icon>
    </button>
));

export { IconButton };
