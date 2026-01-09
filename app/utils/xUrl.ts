interface XUrlValidationSuccess {
    ok: true;
    url: URL;
}

interface XUrlValidationError {
    ok: false;
    error: string;
}

type XUrlValidationResult = XUrlValidationSuccess | XUrlValidationError;

const X_HOSTS = new Set(["twitter.com", "mobile.twitter.com", "x.com", "mobile.x.com"]);

/**
 * Validates that the input string is an X (Twitter) status URL.
 * @param input URL string to validate.
 * @returns Validation result containing parsed URL or an error message.
 */
const validateXStatusUrl = (input: string): XUrlValidationResult => {
    const parsedUrl = URL.parse(input);
    if (!parsedUrl) return { error: "有効なURLを入力してください。", ok: false };

    if (!X_HOSTS.has(parsedUrl.hostname)) {
        return { error: "XのURLを入力してください。", ok: false };
    }
    if (!/\/[^/]+\/status\//u.exec(parsedUrl.pathname)) {
        return { error: "ポストのURLを入力してください。", ok: false };
    }

    return { ok: true, url: parsedUrl };
};

/**
 * Converts a status pathname to the `/i/web/status/` form used by X.
 * @param pathname Original status pathname (e.g. `/user/status/123`).
 * @returns Converted pathname in `/i/web/status/` form.
 */
const toXWebStatusPath = (pathname: string): string => pathname.replace(/\/[^/]+\/status\//u, "/i/web/status/");

export { validateXStatusUrl, toXWebStatusPath };
