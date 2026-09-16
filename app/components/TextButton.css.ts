import { style } from "@vanilla-extract/css";
import { vars } from "../css/theme.css";

const buttonStyles = style({
    ":focus-visible": {
        outline: `0.1rem solid ${vars.color.onSurfaceVariant}`
    },

    ":hover": {
        background: "rgb(from currentColor r g b / 0.1)",
        color: vars.color.onSurface
    },

    borderRadius: "0.25em",
    color: vars.color.onSurfaceVariant,
    cursor: "pointer",
    height: "fit-content",
    padding: "0.25em 1em"
});

export { buttonStyles };
