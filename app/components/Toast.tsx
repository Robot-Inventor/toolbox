import { iconColors, iconStyles, rootStyles, titleColors, titleWrapperStyles } from "./Toast.css";
import { Icon } from "./Icon";
import type { LucideIcon } from "lucide-react";
import { Toast as RadixToast } from "radix-ui";
import type { ReactNode } from "react";
import { mergeClassNames } from "../utils/mergeClassNames";

interface ToastProps {
    icon: LucideIcon;
    message: string;
    type: "info" | "error";
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const Toast = ({ icon: IconComponent, type, message, open, onOpenChange }: ToastProps): ReactNode => (
    <RadixToast.Provider swipeDirection="up" duration={2000}>
        <RadixToast.Root open={open} onOpenChange={onOpenChange} className={rootStyles}>
            <div className={titleWrapperStyles}>
                <Icon aria-hidden className={mergeClassNames(iconStyles, iconColors[type])} icon={IconComponent} />
                <RadixToast.Title className={titleColors[type]}>{message}</RadixToast.Title>
            </div>
        </RadixToast.Root>
        <RadixToast.Viewport />
    </RadixToast.Provider>
);

export { Toast };
