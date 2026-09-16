import type { ComponentProps, ReactNode } from "react";
import TextArea from "react-textarea-autosize";
import { mergeClassNames } from "../utils/mergeClassNames";
import { textareaStyles } from "./TextAreaField.css";

type TextareaAutosizeProps = ComponentProps<typeof TextArea>;

const TextAreaField = ({ className, ...props }: TextareaAutosizeProps): ReactNode => (
    <TextArea className={mergeClassNames(textareaStyles, className)} {...props} />
);

export { TextAreaField };
