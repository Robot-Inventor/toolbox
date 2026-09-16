import { style } from "@vanilla-extract/css";
import { vars } from "../css/theme.css";

const pageStyles = style({
    display: "grid",
    gap: "1.25rem",
    left: "50%",
    position: "relative",
    transform: "translateX(-50%)",
    width: "min(96rem, calc(100vw - 2rem))"
});

const controlsStyles = style({
    display: "grid",
    gap: "0.5rem"
});

const languageFieldStyles = style({
    display: "grid",
    gap: "0.5rem",
    width: "fit-content"
});

const fieldLabelStyles = style({
    color: vars.color.onSurface,
    fontSize: "0.95rem",
    fontWeight: 700
});

const selectStyles = style({
    ":focus": {
        borderColor: vars.color.outline,
        outline: "none"
    },

    background: vars.color.surfaceContainer,
    border: `0.1rem solid ${vars.color.outlineVariant}`,
    borderRadius: "0.5rem",
    color: vars.color.onSurface,
    minWidth: "12rem",
    padding: "0.6rem 0.75rem"
});

const editorGridStyles = style({
    "@media": {
        "(orientation: landscape)": {
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))"
        }
    },

    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "minmax(0, 1fr)"
});

const sectionStyles = style({
    display: "grid",
    gap: "0.5rem"
});

const emptyStateStyles = style({
    color: vars.color.onSurfaceVariant,
    minHeight: "4rem"
});

const diffStyles = style({
    display: "block",
    width: "100%"
});

export {
    controlsStyles,
    diffStyles,
    editorGridStyles,
    emptyStateStyles,
    fieldLabelStyles,
    languageFieldStyles,
    pageStyles,
    sectionStyles,
    selectStyles
};
