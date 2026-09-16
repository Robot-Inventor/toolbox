import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../css/theme.css";

const rootStyles = style({
    background: vars.color.surfaceContainer,
    border: `0.1rem solid ${vars.color.outlineVariant}`,
    borderRadius: "0.25rem",
    boxShadow: "0.1rem 0.1rem 1rem black",
    color: vars.color.onSurface,
    cursor: "default",
    left: "50%",
    padding: "1rem 2rem",
    position: "fixed",

    selectors: {
        "&[data-ending-style]": {
            opacity: 0
        },

        "&[data-ending-style][data-swipe-direction='up']": {
            transform: "translate(-50%, calc(var(--toast-swipe-movement-y) - 150%))"
        },

        "&[data-starting-style]": {
            opacity: 0,
            transform: "translate(-50%, -100%)"
        }
    },

    top: "1rem",
    transform: "translateX(-50%)",
    transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease-in",
    zIndex: 1
});

const titleWrapperStyles = style({
    alignItems: "center",
    display: "flex"
});

const iconStyles = style({
    height: "1.5rem",
    marginRight: "0.25rem",
    width: "1.5rem"
});

const iconColors = styleVariants({
    error: {
        color: vars.color.error
    },
    info: {
        color: vars.color.primary
    }
});

const titleColors = styleVariants({
    error: {
        color: vars.color.error
    },
    info: {
        color: vars.color.onSurface
    }
});

export { iconColors, iconStyles, rootStyles, titleColors, titleWrapperStyles };
