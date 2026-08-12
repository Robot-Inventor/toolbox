/** @jsxImportSource @emotion/react */
// eslint-disable-next-line import-x/no-unassigned-import
import "the-new-css-reset/css/reset.css";
// eslint-disable-next-line import-x/no-unassigned-import
import "./css/global.css";
import { Links, Meta, Scripts, ScrollRestoration } from "react-router";
import App from "./components/App";
import AppHeader from "./components/AppHeader";
import { ErrorBoundary } from "./components/ErrorBoundary";
import type { ReactNode } from "react";
import { css } from "@emotion/react";

const mainStyles = css({
    margin: "auto",
    marginTop: "4rem",
    maxWidth: "40rem",
    padding: "1rem"
});

const Layout = ({ children }: { children: React.ReactNode }): ReactNode => (
    <html lang="ja">
        <head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            <link
                href="https://fonts.googleapis.com/css2?family=Mona+Sans:wght@200..900&family=Noto+Sans+JP:wght@100..900&display=swap"
                rel="stylesheet"
            />
            <Meta />
            <Links />
        </head>
        <body>
            <AppHeader />
            <main css={mainStyles}>{children}</main>
            <ScrollRestoration />
            <Scripts />
        </body>
    </html>
);

export default App;
export { Layout, ErrorBoundary };
