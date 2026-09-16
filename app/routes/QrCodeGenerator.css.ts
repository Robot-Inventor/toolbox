import { style } from "@vanilla-extract/css";
import { vars } from "../css/theme.css";

const textAreaStyles = style({
    ":focus": {
        borderColor: vars.color.outline,
        outline: "none"
    },

    border: `0.1rem solid ${vars.color.outlineVariant}`,
    borderRadius: "0.5rem",
    marginBottom: "1.5rem",
    padding: "0.5rem",
    width: "100%"
});

const qrWrapperStyles = style({
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem"
});

const buttonRowStyles = style({
    display: "flex",
    gap: "0.75rem"
});

const hiddenSvgStyles = style({
    height: 0,
    overflow: "hidden",
    pointerEvents: "none",
    width: 0
});

export { buttonRowStyles, hiddenSvgStyles, qrWrapperStyles, textAreaStyles };
