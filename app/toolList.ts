import { Diff, Film, Image, type LucideIcon, QrCode, Quote, Shuffle, Type } from "lucide-react";

interface Tool {
    icon: LucideIcon;
    link: `/${string}`;
    name: string;
    routeFile: `routes/${string}.tsx`;
}

const TOOL_LIST = [
    {
        icon: Type,
        link: "/character-counter",
        name: "文字数カウンター",
        routeFile: "routes/CharacterCounter.tsx"
    },
    {
        icon: Shuffle,
        link: "/uuid-generator",
        name: "UUIDジェネレーター",
        routeFile: "routes/UuidGenerator.tsx"
    },
    {
        icon: Quote,
        link: "/silent-quote",
        name: "通知なしで引用ポスト",
        routeFile: "routes/SilentQuote.tsx"
    },
    {
        icon: Film,
        link: "/video-quote",
        name: "動画のみ引用ポスト",
        routeFile: "routes/VideoQuote.tsx"
    },
    {
        icon: QrCode,
        link: "/qr-code-generator",
        name: "QRコードジェネレーター",
        routeFile: "routes/QrCodeGenerator.tsx"
    },
    {
        icon: Image,
        link: "/exif-remover",
        name: "Exif削除ツール",
        routeFile: "routes/ExifRemover.tsx"
    },
    {
        icon: Diff,
        link: "/text-diff",
        name: "テキスト差分比較",
        routeFile: "routes/TextDiff.tsx"
    }
] as const satisfies Tool[];

export { TOOL_LIST };
