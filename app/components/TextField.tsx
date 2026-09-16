import type { InputHTMLAttributes, ReactNode } from "react";
import { inputStyles, wrapperStyles } from "./TextField.css";
import { mergeClassNames } from "../utils/mergeClassNames";

const TextField = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>): ReactNode => (
    <div className={mergeClassNames(wrapperStyles, className)}>
        <input className={inputStyles} {...props} />
    </div>
);

export { TextField };
