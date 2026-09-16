import { style } from "@vanilla-extract/css";
import { vars } from "../css/theme.css";

const toolNameStyles = style({
    color: vars.color.onSurface,
    fontSize: "1.5em",
    fontWeight: 700,
    marginBottom: "1rem"
});

export { toolNameStyles };
