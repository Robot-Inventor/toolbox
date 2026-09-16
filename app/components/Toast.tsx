import { Check, CircleAlert, type LucideIcon } from "lucide-react";
import { iconColors, iconStyles, rootStyles, titleColors, titleWrapperStyles } from "./Toast.css";
import { Toast as BaseToast } from "@base-ui/react/toast";
import { Icon } from "./Icon";
import type { ReactNode } from "react";
import { mergeClassNames } from "../utils/mergeClassNames";

type ToastType = "info" | "error";

const toastManager = BaseToast.createToastManager();

const TOAST_ID = "toolbox-toast";

const toastIcons = {
    error: CircleAlert,
    info: Check
} as const satisfies Record<ToastType, LucideIcon>;

const showToast = (message: string, type: ToastType): void => {
    toastManager.add({
        id: TOAST_ID,
        title: message,
        type
    });
};

const ToastList = (): ReactNode => {
    const { toasts } = BaseToast.useToastManager();

    return toasts.map((toast) => {
        const type = toast.type === "error" ? "error" : "info";
        return (
            <BaseToast.Root className={rootStyles} key={toast.id} swipeDirection="up" toast={toast}>
                <div className={titleWrapperStyles}>
                    <Icon
                        aria-hidden
                        className={mergeClassNames(iconStyles, iconColors[type])}
                        icon={toastIcons[type]}
                    />
                    <BaseToast.Title className={titleColors[type]} />
                </div>
            </BaseToast.Root>
        );
    });
};

const Toast = (): ReactNode => (
    <BaseToast.Provider timeout={2000} toastManager={toastManager}>
        <BaseToast.Viewport>
            <ToastList />
        </BaseToast.Viewport>
    </BaseToast.Provider>
);

export { Toast, showToast };
