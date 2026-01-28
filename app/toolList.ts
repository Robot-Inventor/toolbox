interface Tool {
    icon: string;
    link: `/${string}`;
    name: string;
    routeFile: `routes/${string}.tsx`;
}

const TOOL_LIST = [
    {
        icon: "text_fields",
        link: "/character-counter",
        name: "文字数カウンター",
        routeFile: "routes/CharacterCounter.tsx"
    },
    {
        icon: "shuffle",
        link: "/uuid-generator",
        name: "UUIDジェネレーター",
        routeFile: "routes/UuidGenerator.tsx"
    },
    {
        icon: "format_quote",
        link: "/silent-quote",
        name: "通知なしで引用ポスト",
        routeFile: "routes/SilentQuote.tsx"
    },
    {
        icon: "movie",
        link: "/video-quote",
        name: "動画のみ引用ポスト",
        routeFile: "routes/VideoQuote.tsx"
    },
    {
        icon: "qr_code",
        link: "/qr-code-generator",
        name: "QRコードジェネレーター",
        routeFile: "routes/QrCodeGenerator.tsx"
    },
    {
        icon: "image",
        link: "/exif-remover",
        name: "Exif削除ツール",
        routeFile: "routes/ExifRemover.tsx"
    }
] as const satisfies Tool[];

export { TOOL_LIST };
