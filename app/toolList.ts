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
    }
] as const satisfies Tool[];

export { TOOL_LIST };
