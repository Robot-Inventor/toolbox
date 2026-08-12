import type { HTMLAttributes, ReactNode } from "react";
import { Icon } from "./Icon";
import type { LucideIcon } from "lucide-react";
import { css } from "@emotion/react";

interface IconButtonProps {
    ["aria-label"]: string;
    icon: LucideIcon;
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

const IconButton = ({
    "aria-label": ariaLabel,
    icon,
    ...props
}: IconButtonProps & HTMLAttributes<HTMLButtonElement>): ReactNode => (
    <button css={buttonStyles} {...props}>
        <Icon aria-label={ariaLabel} icon={icon} />
    </button>
);

export { IconButton };
