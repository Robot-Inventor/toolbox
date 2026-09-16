import { style } from "@vanilla-extract/css";

const ulStyles = style({
    marginTop: "1rem",
    width: "fit-content"
});

const liStyles = style({
    display: "grid",
    gridTemplateColumns: "1fr auto",
    justifyContent: "space-between"
});

const itemStyles = style({
    marginRight: "1rem",
    userSelect: "all"
});

export { itemStyles, liStyles, ulStyles };
