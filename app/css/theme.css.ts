import { createGlobalTheme, globalStyle } from "@vanilla-extract/css";

const vars = createGlobalTheme(":root", {
    color: {
        error: "#dd5858",
        onSurface: "white",
        onSurfaceVariant: "#949499",
        outline: "#666",
        outlineVariant: "#222",
        primary: "#6b88d9",
        surface: "black",
        surfaceContainer: "#0d0d0d",
        surfaceContainerHigh: "#161616"
    }
});

globalStyle(":root", {
    background: vars.color.surface,
    color: vars.color.onSurfaceVariant,
    fontFamily: '"Mona Sans", "Noto Sans JP", sans-serif',
    fontOpticalSizing: "auto",
    fontStyle: "normal",
    fontVariationSettings: '"wdth" 100',
    fontWeight: "normal"
});

globalStyle("body:has([popover]:popover-open)", {
    pointerEvents: "none",
    userSelect: "none"
});

globalStyle("[popover]:popover-open", {
    pointerEvents: "auto",
    userSelect: "text"
});

export { vars };
