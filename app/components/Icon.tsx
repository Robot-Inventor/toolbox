import { type HTMLAttributes, memo } from "react";
import { css } from "@emotion/react";

interface IconProps {
    children: string;
}

const iconStyles = css({
    fontFamily: "Material Symbols Outlined, sans-serif",
    fontSize: "1.25em"
});

const Icon = memo(({ children, ...props }: IconProps & HTMLAttributes<HTMLDivElement>) => (
    <div css={iconStyles} {...props}>
        {children}
    </div>
));

export { Icon };
