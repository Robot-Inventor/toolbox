import { style } from "@vanilla-extract/css";
import { vars } from "../css/theme.css";

const wrapperStyles = style({
    alignItems: "center",
    background: vars.color.surfaceContainer,
    border: `0.1rem solid ${vars.color.outlineVariant}`,
    borderRadius: "0.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "1rem"
});

const iconStyles = style({
    color: vars.color.onSurface,
    height: "3rem",
    width: "3rem"
});

const titleStyles = style({
    fontSize: "1.2rem"
});

export { iconStyles, titleStyles, wrapperStyles };
