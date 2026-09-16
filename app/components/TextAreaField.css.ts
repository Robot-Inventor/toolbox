import { style } from "@vanilla-extract/css";
import { vars } from "../css/theme.css";

const textareaStyles = style({
    ":focus": {
        borderColor: vars.color.outline,
        outline: "none"
    },

    border: `0.1rem solid ${vars.color.outlineVariant}`,
    borderRadius: "0.5rem",
    padding: "0.5rem",
    width: "100%"
});

export { textareaStyles };
