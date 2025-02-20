/* eslint-disable jsdoc/require-jsdoc */
/** @jsxImportSource @emotion/react */
// eslint-disable-next-line import-x/no-unassigned-import
import "the-new-css-reset/css/reset.css";
// eslint-disable-next-line import-x/no-unassigned-import
import "./css/global.css";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse } from "react-router";
import AppHeader from "./components/AppHeader";
import type { JSX } from "react";
import type { Route } from "./+types/root";
import { css } from "@emotion/react";

const mainStyles = css({
    margin: "auto",
    marginTop: "4rem",
    maxWidth: "40rem",
    padding: "1rem"
});

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => (
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
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
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

const App = (): JSX.Element => <Outlet />;

const ErrorBoundary = ({ error }: Route.ErrorBoundaryProps): JSX.Element => {
    const notFoundStatus = 404;

    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | null = null;

    if (isRouteErrorResponse(error)) {
        message = error.status === notFoundStatus ? "404" : "Error";
        details =
            error.status === notFoundStatus ? "The requested page could not be found." : error.statusText || details;
    } else if (process.env["DEV"] && error && error instanceof Error) {
        details = error.message;
        stack = error.stack ?? null;
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
};

export default App;
export { Layout, ErrorBoundary };
