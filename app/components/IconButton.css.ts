import { style } from "@vanilla-extract/css";
import { vars } from "../css/theme.css";

const buttonStyles = style({
    ":focus-visible": {
        background: "rgb(from currentColor r g b / 0.1)",
        outline: `0.1rem solid ${vars.color.onSurfaceVariant}`
    },

    ":hover": {
        background: "rgb(from currentColor r g b / 0.1)",
        color: vars.color.onSurface
    },

    alignItems: "center",
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    height: "2.5em",
    justifyContent: "center",
    width: "2.5em"
});

export { buttonStyles };
