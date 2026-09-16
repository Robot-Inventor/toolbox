import { style } from "@vanilla-extract/css";
import { vars } from "../css/theme.css";

const pageStyles = style({
    display: "grid",
    gap: "1.25rem",
    left: "50%",
    position: "relative",
    transform: "translateX(-50%)",
    width: "min(96rem, calc(100vw - 2rem))"
});

const fieldLabelStyles = style({
    display: "grid",
    gap: "0.5rem"
});

const selectStyles = style({
    ":focus": {
        borderColor: vars.color.outline,
        outline: "none"
    },

    background: vars.color.surfaceContainer,
    border: `0.1rem solid ${vars.color.outlineVariant}`,
    borderRadius: "0.5rem",
    color: vars.color.onSurface,
    padding: "0.6rem 0.75rem",
    width: "fit-content"
});

const buttonRowStyles = style({
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    gap: "0.75rem"
});

export { buttonRowStyles, fieldLabelStyles, pageStyles, selectStyles };
