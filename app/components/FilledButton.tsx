import type { HTMLAttributes, ReactNode } from "react";
import { buttonStyles } from "./FilledButton.css";

interface ButtonProps {
    children?: string;
}

const FilledButton = ({ children, ...props }: ButtonProps & HTMLAttributes<HTMLButtonElement>): ReactNode => (
    <button className={buttonStyles} {...props}>
        {children}
    </button>
);

export { FilledButton };
