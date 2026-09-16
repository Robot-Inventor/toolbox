import { style } from "@vanilla-extract/css";

const previewImageStyles = style({
    borderRadius: "0.5rem",
    maxHeight: "20rem",
    maxWidth: "100%",
    objectFit: "contain"
});

const buttonContainerStyles = style({
    display: "flex",
    gap: "0.75rem",
    justifyContent: "center",
    marginTop: "1rem"
});

const hiddenCanvasStyles = style({
    display: "none"
});

export { buttonContainerStyles, hiddenCanvasStyles, previewImageStyles };
