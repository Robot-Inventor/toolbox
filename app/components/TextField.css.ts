import { style } from "@vanilla-extract/css";
import { vars } from "../css/theme.css";

const wrapperStyles = style({
    ":focus-within": {
        borderColor: vars.color.outline
    },

    border: `0.1rem solid ${vars.color.outlineVariant}`,
    borderRadius: "0.25rem",
    transition: "border-color 0.2s"
});

const inputStyles = style({
    "::placeholder": {
        color: vars.color.onSurfaceVariant
    },

    color: vars.color.onSurface,
    padding: "0.25rem 0.5rem",
    width: "100%"
});

export { inputStyles, wrapperStyles };
