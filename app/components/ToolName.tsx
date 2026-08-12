import type { ReactNode } from "react";
import { css } from "@emotion/react";

interface ToolNameProps {
    children: string;
}

const toolNameStyles = css({
    color: "var(--color-on-surface)",
    fontSize: "1.5em",
    fontWeight: 700,
    marginBottom: "1rem"
});

const ToolName = ({ children }: ToolNameProps): ReactNode => <h2 css={toolNameStyles}>{children}</h2>;

export { ToolName };
