/** @jsxImportSource @emotion/react */
import { Icon } from "./Icon";
import type { LucideIcon } from "lucide-react";
import { css } from "@emotion/react";
import { memo } from "react";

interface IconCardProps {
    icon: LucideIcon;
    title: string;
}

const wrapperStyles = css({
    alignItems: "center",
    background: "var(--color-surface-container)",
    border: "0.1rem solid var(--color-outline-variant)",
    borderRadius: "0.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "1rem"
});

const iconStyles = css({
    color: "var(--color-on-surface)",
    height: "3rem",
    width: "3rem"
});

const titleStyles = css({
    fontSize: "1.2rem"
});

const IconCard = memo(({ icon, title }: IconCardProps) => (
    <article css={wrapperStyles}>
        <Icon aria-hidden css={iconStyles} icon={icon} />
        <h3 css={titleStyles}>{title}</h3>
    </article>
));

export { IconCard };
