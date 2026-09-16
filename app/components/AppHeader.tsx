import { House, Menu, X } from "lucide-react";
import { type ReactNode, useRef } from "react";
import { headerStyles, sidebarStyles, titleStyles, toolItemStyles } from "./AppHeader.css";
import { Icon } from "./Icon";
import { IconButton } from "./IconButton";
import { Link } from "react-router";
import { TOOL_LIST } from "../toolList";

const toolList = [
    {
        icon: House,
        link: "/",
        name: "ホーム"
    },
    ...TOOL_LIST
] as const;

const AppHeader = (): ReactNode => {
    const sidebarRef = useRef<HTMLDivElement>(null);
    const closeSidebar = (): void => {
        if (!sidebarRef.current) throw new Error("Sidebar not found");
        sidebarRef.current.hidePopover();
    };

    return (
        <header className={headerStyles}>
            <IconButton
                aria-label="メニューを開く"
                icon={Menu}
                popoverTarget="sidebar-menu"
                popoverTargetAction="show"
            />
            <div className={sidebarStyles} id="sidebar-menu" popover="auto" ref={sidebarRef}>
                <IconButton
                    aria-label="メニューを閉じる"
                    icon={X}
                    popoverTarget="sidebar-menu"
                    popoverTargetAction="hide"
                />
                <ul>
                    {toolList.map(({ icon, link, name }) => (
                        <li key={link}>
                            <Link className={toolItemStyles} onClick={closeSidebar} to={link}>
                                <Icon aria-hidden icon={icon} />
                                {name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <h1 className={titleStyles}>
                <Link to="/">Toolbox</Link>
            </h1>
        </header>
    );
};

export default AppHeader;
