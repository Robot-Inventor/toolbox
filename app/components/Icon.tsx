import type { HTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { iconStyles } from "./Icon.css";

type IconAriaProps = { "aria-hidden": true; "aria-label"?: never } | { "aria-hidden"?: never; "aria-label": string };

type IconProps = { icon: LucideIcon } & Omit<HTMLAttributes<SVGSVGElement>, "aria-hidden" | "aria-label"> &
    IconAriaProps;

const Icon = ({ icon: IconComponent, ...props }: IconProps): ReactNode => (
    <IconComponent className={iconStyles} {...props} />
);

export { Icon };
