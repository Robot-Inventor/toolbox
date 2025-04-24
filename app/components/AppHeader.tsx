/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { memo, useCallback, useRef } from "react";
import { Icon } from "./Icon";
import { IconButton } from "./IconButton";
import { Link } from "react-router";
import { TOOL_LIST } from "../toolList";

const toolList = [
    {
        icon: "home",
        link: "/",
        name: "ホーム"
    },
    ...TOOL_LIST
] as const;

const headerStyles = css({
    alignItems: "center",
    background: "var(--color-surface)",
    borderBottom: "0.1rem solid var(--color-outline-variant)",
    boxShadow: "0.1rem 0.1rem 1rem black",
    display: "flex",
    gap: "0.5rem",
    left: 0,
    padding: "0.5rem",
    position: "fixed",
    top: 0,
    width: "100%"
});

const titleStyles = css({
    color: "var(--color-on-surface)",
    fontSize: "1.5rem",
    fontWeight: 700
});

const sidebarAnimation = keyframes({
    from: { transform: "translateX(-100%)" },
    to: { transform: "translateX(0)" }
});

const sidebarStyles = css({
    "::backdrop": {
        backdropFilter: "blur(0.25rem)",
        background: "rgb(0 0 0 / 50%)"
    },

    animation: `${sidebarAnimation} 0.3s forwards`,
    background: "var(--color-surface)",
    border: "0.1rem solid var(--color-outline-variant)",
    borderRadius: "0 1rem 1rem 0",
    boxShadow: "0.1rem 0.1rem 1rem black",
    height: "100vh",
    left: 0,
    padding: "0.5rem",
    position: "fixed",
    top: 0,
    width: "min(20rem, 100%)"
});

const toolItemStyles = css({
    ":hover": {
        color: "var(--color-on-surface)"
    },

    display: "flex",
    fontSize: "1.1rem",
    gap: "0.5rem",
    padding: "0.25rem 0.5rem"
});

const AppHeader = memo(() => {
    const sidebar = useRef<HTMLDivElement>(null);
    const closeSidebar = useCallback(() => {
        if (!sidebar.current) throw new Error("Sidebar not found");
        sidebar.current.hidePopover();
    }, [sidebar]);

    return (
        <header css={headerStyles}>
            <IconButton popoverTarget="sidebar-menu" popoverTargetAction="show" aria-label="メニューを開く">
                menu
            </IconButton>
            <div popover="auto" id="sidebar-menu" ref={sidebar} css={sidebarStyles}>
                <IconButton popoverTarget="sidebar-menu" popoverTargetAction="hide" aria-label="メニューを閉じる">
                    close
                </IconButton>
                <ul>
                    {toolList.map(({ icon, link, name }) => (
                        <li key={link}>
                            <Link to={link} css={toolItemStyles} onClick={closeSidebar}>
                                <Icon aria-hidden>{icon}</Icon>
                                {name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <h1 css={titleStyles}>
                <Link to="/">Toolbox</Link>
            </h1>
        </header>
    );
});

export default AppHeader;
