import { type HTMLAttributes, memo } from "react";
import { css } from "@emotion/react";

interface IconPropsBase {
    children: string;
}

type IconAriaProps = { "aria-hidden": true; "aria-label"?: never } | { "aria-hidden"?: never; "aria-label": string };

type IconProps = (IconPropsBase & Omit<HTMLAttributes<HTMLDivElement>, "aria-hidden" | "aria-label">) & IconAriaProps;

const iconStyles = css({
    fontFamily: "Material Symbols Outlined, sans-serif",
    fontSize: "1.25em"
});

const Icon = memo(({ children, ...props }: IconProps) => (
    <div css={iconStyles} {...props}>
        {children}
    </div>
));

export { Icon };
