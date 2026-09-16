import type { HTMLAttributes, ReactNode } from "react";
import { buttonStyles } from "./TextButton.css";

interface ButtonProps {
    children?: string;
    onClick?: () => void | Promise<void>;
}

const TextButton = ({ children, ...props }: ButtonProps & HTMLAttributes<HTMLButtonElement>): ReactNode => (
    <button className={buttonStyles} {...props}>
        {children}
    </button>
);

export { TextButton };
