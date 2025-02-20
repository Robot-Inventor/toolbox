/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { Icon } from "./Icon";
import { Toast as RadixToast } from "radix-ui";
import { memo } from "react";

interface ToastProps {
    icon: string;
    message: string;
    type: "info" | "error";
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

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

const rootStyles = css({
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
    },

    background: "var(--color-surface-container)",
    border: "0.1rem solid var(--color-outline-variant)",
    borderRadius: "0.25rem",
    boxShadow: "0.1rem 0.1rem 1rem black",
    color: "var(--color-on-surface)",
    cursor: "default",
    left: "50%",
    padding: "1rem 2rem",
    position: "fixed",
    top: "1rem",
    transform: "translateX(-50%)",
    transition: "top 0.5s ease-out, opacity 0.5s",
    zIndex: 1
});

const titleWrapperStyles = css({
    alignItems: "center",
    display: "flex"
});

const iconStyles = css({
    fontSize: "1.5rem",
    marginRight: "0.25rem"
});

const iconColors = {
    error: css({
        color: "var(--color-error)"
    }),
    info: css({
        color: "var(--color-primary)"
    })
} as const satisfies Record<ToastProps["type"], ReturnType<typeof css>>;

const titleColors = {
    error: css({
        color: "var(--color-error)"
    }),
    info: css({
        color: "var(--color-on-surface)"
    })
};

const Toast = memo(({ icon, type, message, open, onOpenChange }: ToastProps) => (
    <RadixToast.Provider swipeDirection="up" duration={2000}>
        <RadixToast.Root open={open} onOpenChange={onOpenChange} css={rootStyles}>
            <div css={titleWrapperStyles}>
                <Icon css={[iconStyles, iconColors[type]]} aria-hidden>
                    {icon}
                </Icon>
                <RadixToast.Title css={titleColors[type]}>{message}</RadixToast.Title>
            </div>
        </RadixToast.Root>
        <RadixToast.Viewport />
    </RadixToast.Provider>
));

export { Toast };
