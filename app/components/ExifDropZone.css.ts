import { style } from "@vanilla-extract/css";
import { vars } from "../css/theme.css";

const dropZoneStyles = style({
    ":focus-within": {
        borderColor: vars.color.outline,
        outline: "none"
    },

    alignItems: "center",
    border: `0.2rem dashed ${vars.color.outlineVariant}`,
    borderRadius: "0.5rem",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    justifyContent: "center",
    marginBottom: "1.5rem",
    minHeight: "12rem",
    padding: "2rem",

    selectors: {
        "&.drag-over": {
            backgroundColor: vars.color.surfaceContainerHigh,
            borderColor: vars.color.primary
        }
    },

    transition: "all 0.2s ease"
});

const messageStyles = style({
    color: vars.color.onSurfaceVariant,
    textAlign: "center"
});

export { dropZoneStyles, messageStyles };
