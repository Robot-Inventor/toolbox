import { css } from "@emotion/react";
import { memo } from "react";

interface ToastProps {
    message: string;
    visible: boolean;
}

const wrapperStyles = css({
    background: "var(--color-surface)",
    border: "0.1rem solid var(--color-outline-variant)",
    borderRadius: "0.25rem",
    boxShadow: "0.1rem 0.1rem 1rem black",
    color: "var(--color-on-surface)",
    cursor: "default",
    left: "50%",
    opacity: 0,
    padding: "1rem 2rem",
    position: "fixed",
    top: "-100%",
    transform: "translateX(-50%)",
    transition: "top 0.5s ease-out, opacity 0.5s",
    zIndex: 1
});

const visibleWrapperStyles = css({
    opacity: 1,
    top: "1rem"
});

const Toast = memo(({ message, visible }: ToastProps) => (
    <div role="alert" css={[wrapperStyles, visible && visibleWrapperStyles]}>
        {message}
    </div>
));

export { Toast };
