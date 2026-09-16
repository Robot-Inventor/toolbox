import type { ReactNode } from "react";
import { toolNameStyles } from "./ToolName.css";

interface ToolNameProps {
    children: string;
}

const ToolName = ({ children }: ToolNameProps): ReactNode => <h2 className={toolNameStyles}>{children}</h2>;

export { ToolName };
