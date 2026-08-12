import type { ReactNode } from "react";
import { isRouteErrorResponse } from "react-router";

interface ErrorBoundaryProps {
    error: unknown;
}

const NOT_FOUND_STATUS = 404;

const ErrorBoundary = ({ error }: ErrorBoundaryProps): ReactNode => {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack: string | null = null;

    if (isRouteErrorResponse(error)) {
        message = error.status === NOT_FOUND_STATUS ? "404" : "Error";
        details =
            error.status === NOT_FOUND_STATUS ? "The requested page could not be found." : error.statusText || details;
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

export { ErrorBoundary };
