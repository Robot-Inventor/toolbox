import type { HTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { css } from "@emotion/react";

type IconAriaProps = { "aria-hidden": true; "aria-label"?: never } | { "aria-hidden"?: never; "aria-label": string };

type IconProps = { icon: LucideIcon } & Omit<HTMLAttributes<SVGSVGElement>, "aria-hidden" | "aria-label"> &
    IconAriaProps;

const iconStyles = css({
    height: "1.25em",
    width: "1.25em"
});

const Icon = ({ icon: IconComponent, ...props }: IconProps): ReactNode => <IconComponent css={iconStyles} {...props} />;

export { Icon };
