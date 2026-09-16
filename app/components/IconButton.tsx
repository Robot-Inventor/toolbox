import type { HTMLAttributes, ReactNode } from "react";
import { Icon } from "./Icon";
import type { LucideIcon } from "lucide-react";
import { buttonStyles } from "./IconButton.css";

interface IconButtonProps {
    ["aria-label"]: string;
    icon: LucideIcon;
}

const IconButton = ({
    "aria-label": ariaLabel,
    icon,
    ...props
}: IconButtonProps & HTMLAttributes<HTMLButtonElement>): ReactNode => (
    <button className={buttonStyles} {...props}>
        <Icon aria-label={ariaLabel} icon={icon} />
    </button>
);

export { IconButton };
