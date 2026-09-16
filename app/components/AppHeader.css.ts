import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../css/theme.css";

const headerStyles = style({
    alignItems: "center",
    background: vars.color.surface,
    borderBottom: `0.1rem solid ${vars.color.outlineVariant}`,
    boxShadow: "0.1rem 0.1rem 1rem black",
    display: "flex",
    gap: "0.5rem",
    left: 0,
    padding: "0.5rem",
    position: "fixed",
    top: 0,
    width: "100%"
});

const titleStyles = style({
    color: vars.color.onSurface,
    fontSize: "1.5rem",
    fontWeight: 700
});

const sidebarAnimation = keyframes({
    from: {
        transform: "translateX(-100%)"
    },
    to: {
        transform: "translateX(0)"
    }
});

const sidebarStyles = style({
    "::backdrop": {
        backdropFilter: "blur(0.25rem)",
        background: "rgb(0 0 0 / 50%)"
    },

    animation: `${sidebarAnimation} 0.3s forwards`,
    background: vars.color.surface,
    border: `0.1rem solid ${vars.color.outlineVariant}`,
    borderRadius: "0 1rem 1rem 0",
    boxShadow: "0.1rem 0.1rem 1rem black",
    height: "100vh",
    left: 0,
    padding: "0.5rem",
    position: "fixed",
    top: 0,
    width: "min(20rem, 100%)"
});

const toolItemStyles = style({
    ":hover": {
        color: vars.color.onSurface
    },

    display: "flex",
    fontSize: "1.1rem",
    gap: "0.5rem",
    padding: "0.25rem 0.5rem"
});

export { headerStyles, sidebarStyles, titleStyles, toolItemStyles };
