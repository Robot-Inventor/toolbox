// oxlint-disable-next-line import-x/no-unassigned-import
import "the-new-css-reset/css/reset.css";
import { Links, Meta, Scripts, ScrollRestoration } from "react-router";
import App from "./components/App";
import AppHeader from "./components/AppHeader";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Toast } from "./components/Toast";
import { mainStyles } from "./root.css";

const Layout = ({ children }: { children: React.ReactNode }): React.ReactNode => (
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
            <main className={mainStyles}>{children}</main>
            <Toast />
            <ScrollRestoration />
            <Scripts />
        </body>
    </html>
);

export default App;
export { Layout, ErrorBoundary };
