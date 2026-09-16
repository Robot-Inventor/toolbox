import { style, styleVariants } from "@vanilla-extract/css";

const canvasStyles = style({
    background: "#9bb4c4",
    padding: "3rem",
    width: "min(56rem, 100%)"
});

const windowStyles = style({
    background: "#1e1e2e",
    borderRadius: "0.75rem",
    boxShadow: "0 1.5rem 4rem rgba(0, 0, 0, 0.45)",
    overflow: "hidden",
    width: "min(56rem, 100%)"
});

const titleBarStyles = style({
    alignItems: "center",
    background: "#181825",
    display: "flex",
    gap: "0.5rem",
    padding: "0.7rem 1rem"
});

const trafficLightBase = style({
    borderRadius: "50%",
    height: "0.75rem",
    width: "0.75rem"
});

const trafficLightStyles = styleVariants({
    green: [
        trafficLightBase,
        {
            background: "#28c840"
        }
    ],
    red: [
        trafficLightBase,
        {
            background: "#ff5f57"
        }
    ],
    yellow: [
        trafficLightBase,
        {
            background: "#febc2e"
        }
    ]
});

const titleStyles = style({
    color: "#a6adc8",
    flex: 1,
    textAlign: "center"
});

const titleInputStyles = style({
    ":focus": {
        outline: "0.1rem solid #a6adc8"
    },

    textAlign: "center"
});

const editorContainerStyles = style({
    minHeight: "10rem"
});

export {
    canvasStyles,
    editorContainerStyles,
    titleBarStyles,
    titleInputStyles,
    titleStyles,
    trafficLightStyles,
    windowStyles
};
