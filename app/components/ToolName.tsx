import { css } from "@emotion/react";
import { memo } from "react";

interface ToolNameProps {
    children: string;
}

const toolNameStyles = css({
    color: "var(--color-on-surface)",
    fontSize: "1.5em",
    fontWeight: 700,
    marginBottom: "1rem"
});

const ToolName = memo(({ children }: ToolNameProps) => <h2 css={toolNameStyles}>{children}</h2>);

export { ToolName };
