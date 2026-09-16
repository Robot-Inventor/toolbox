import { keyframes, style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../css/theme.css";

const slideInAnimation = keyframes({
    from: {
        transform: "translate(-50%, -100%)"
    },
    to: {
        transform: "translate(-50%, 0)"
    }
});

const hideAnimation = keyframes({
    from: {
        opacity: 1
    },
    to: {
        opacity: 0
    }
});

const swipeOutAnimation = keyframes({
    from: {
        transform: "translate(-50%, var(--radix-toast-swipe-end-y))"
    },
    to: {
        transform: "translate(-50%, calc(-100% - 1rem))"
    }
});

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
        "&[data-state='closed']": {
            animation: `${hideAnimation} 0.5s ease-in`
        },

        "&[data-state='open']": {
            animation: `${slideInAnimation} 0.5s cubic-bezier(0.16, 1, 0.3, 1)`
        },

        "&[data-swipe='end']": {
            animation: `${swipeOutAnimation} 0.5s ease-out`
        },

        "&[data-swipe='move']": {
            transform: "translate(-50%, var(--radix-toast-swipe-move-y))"
        }
    },

    top: "1rem",
    transform: "translateX(-50%)",
    transition: "top 0.5s ease-out, opacity 0.5s",
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
