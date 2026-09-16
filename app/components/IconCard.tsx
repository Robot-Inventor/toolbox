import { iconStyles, titleStyles, wrapperStyles } from "./IconCard.css";
import { Icon } from "./Icon";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface IconCardProps {
    icon: LucideIcon;
    title: string;
}

const IconCard = ({ icon: iconComponent, title: titleText }: IconCardProps): ReactNode => (
    <article className={wrapperStyles}>
        <Icon aria-hidden className={iconStyles} icon={iconComponent} />
        <h3 className={titleStyles}>{titleText}</h3>
    </article>
);

export { IconCard };
