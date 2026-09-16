import { style } from "@vanilla-extract/css";

const listWrapperStyles = style({
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "repeat(2, 1fr)"
});

export { listWrapperStyles };
