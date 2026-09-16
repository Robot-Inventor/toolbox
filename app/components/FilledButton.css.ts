import { style } from "@vanilla-extract/css";
import { vars } from "../css/theme.css";

const buttonStyles = style({
    ":focus-visible": {
        filter: "brightness(0.9)",
        outline: `0.1rem solid ${vars.color.onSurface}`,
        outlineOffset: "0.1rem"
    },

    ":hover": {
        filter: "brightness(0.9)"
    },

    background: vars.color.onSurface,
    borderRadius: "0.25em",
    color: vars.color.surface,
    cursor: "pointer",
    padding: "0.25em 1em"
});

export { buttonStyles };
