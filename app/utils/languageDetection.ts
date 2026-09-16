import type { ModelOperations } from "@vscode/vscode-languagedetection";
import languageDetectionBackendChunk from "@vscode/vscode-languagedetection/dist/lib/979.js";
import modelJsonUrl from "@vscode/vscode-languagedetection/model/model.json?url";
import weightsUrl from "@vscode/vscode-languagedetection/model/group1-shard1of1.bin?url";

interface DetectedLanguage {
    confidence: number;
    languageId: string;
}

const AUTO_LANGUAGE_VALUE = "auto";
const UNKNOWN_LANGUAGE = "text";

const LANGUAGE_ID_MAP: Record<string, string> = {
    bat: "batch",
    coffee: "coffeescript",
    cs: "csharp",
    csv: "csv",
    dart: "dart",
    dockerfile: "docker",
    erl: "erlang",
    groovy: "groovy",
    hs: "haskell",
    ini: "ini",
    ipynb: "json",
    js: "javascript",
    json: "json",
    kt: "kotlin",
    lua: "lua",
    matlab: "matlab",
    md: "markdown",
    mm: "objective-cpp",
    objectivec: "objc",
    php: "php",
    pl: "perl",
    ps1: "powershell",
    py: "python",
    rb: "ruby",
    rs: "rust",
    scala: "scala",
    sh: "shellscript",
    shell: "shellscript",
    tex: "latex",
    toml: "toml",
    ts: "typescript"
} as const;

const KNOWN_LANGUAGE_IDS = new Set([
    "bash",
    "c",
    "cpp",
    "csharp",
    "css",
    "go",
    "html",
    "java",
    "javascript",
    "json",
    "kotlin",
    "markdown",
    "php",
    "python",
    "ruby",
    "rust",
    "sql",
    "swift",
    "typescript",
    "xml",
    "yaml"
]);

const LANGUAGE_OPTIONS = [
    {
        label: "自動検出",
        value: AUTO_LANGUAGE_VALUE
    },
    {
        label: "TypeScript",
        value: "typescript"
    },
    {
        label: "JavaScript",
        value: "javascript"
    },
    {
        label: "Python",
        value: "python"
    },
    {
        label: "Go",
        value: "go"
    },
    {
        label: "Rust",
        value: "rust"
    },
    {
        label: "Java",
        value: "java"
    },
    {
        label: "C++",
        value: "cpp"
    },
    {
        label: "C#",
        value: "csharp"
    },
    {
        label: "Ruby",
        value: "ruby"
    },
    {
        label: "PHP",
        value: "php"
    },
    {
        label: "Swift",
        value: "swift"
    },
    {
        label: "Kotlin",
        value: "kotlin"
    },
    {
        label: "HTML",
        value: "html"
    },
    {
        label: "CSS",
        value: "css"
    },
    {
        label: "JSON",
        value: "json"
    },
    {
        label: "YAML",
        value: "yaml"
    },
    {
        label: "Markdown",
        value: "markdown"
    },
    {
        label: "SQL",
        value: "sql"
    },
    {
        label: "Bash",
        value: "bash"
    }
] as const satisfies Array<{ label: string; value: string }>;

const EXTENSION_MAP: Record<string, string> = {
    bash: "sh",
    batch: "bat",
    coffeescript: "coffee",
    csharp: "cs",
    erlang: "erl",
    haskell: "hs",
    javascript: "js",
    kotlin: "kt",
    latex: "tex",
    markdown: "md",
    matlab: "m",
    objc: "m",
    "objective-cpp": "mm",
    perl: "pl",
    powershell: "ps1",
    python: "py",
    ruby: "rb",
    rust: "rs",
    shellscript: "sh",
    typescript: "ts"
} as const;

const toShikiLanguage = (languageId: string): string => {
    if (languageId === "r") return "r";
    const mapped = LANGUAGE_ID_MAP[languageId];
    if (mapped) return mapped;
    if (KNOWN_LANGUAGE_IDS.has(languageId)) return languageId;
    return UNKNOWN_LANGUAGE;
};

const toExtension = (lang: string): string => EXTENSION_MAP[lang] ?? lang;

const loadModelJson = async (): Promise<Record<string, unknown>> => {
    const response = await fetch(modelJsonUrl);
    if (!response.ok) throw new Error("モデルの読み込みに失敗しました");
    return response.json() as Promise<Record<string, unknown>>;
};

const loadWeights = async (): Promise<ArrayBuffer> => {
    const response = await fetch(weightsUrl);
    if (!response.ok) throw new Error("モデルの読み込みに失敗しました");
    return response.arrayBuffer();
};

let modelOperationsPromise: Promise<ModelOperations> | null = null;
let modelRunQueue: Promise<void> = Promise.resolve();

const installBrowserRequireShim = (): (() => void) => {
    const previousRequire = Object.getOwnPropertyDescriptor(globalThis, "require");
    const browserRequireShim = (moduleId: string): unknown => {
        if (moduleId === "./979.js") return languageDetectionBackendChunk;
        throw new Error(`Unsupported module: ${moduleId}`);
    };
    Object.defineProperty(globalThis, "require", {
        configurable: true,
        value: browserRequireShim,
        writable: true
    });
    return (): void => {
        if (previousRequire) {
            Object.defineProperty(globalThis, "require", previousRequire);
        } else {
            Reflect.deleteProperty(globalThis, "require");
        }
    };
};

const loadModelOperations = (): Promise<ModelOperations> => {
    modelOperationsPromise ??= import("@vscode/vscode-languagedetection").then(
        ({ ModelOperations }) =>
            new ModelOperations({ modelJsonLoaderFunc: loadModelJson, weightsLoaderFunc: loadWeights })
    );
    return modelOperationsPromise;
};

const resetModelOperations = (operations: ModelOperations | null): void => {
    operations?.dispose();
    modelOperationsPromise = null;
};

interface ModelRunSlot {
    finish: () => void;
    previous: Promise<void>;
}

const enqueueModelRun = (): ModelRunSlot => {
    const previousRun = modelRunQueue;
    const { promise: currentRun, resolve } = Promise.withResolvers<null>();
    modelRunQueue = previousRun.then(async () => {
        await currentRun;
    });
    return {
        finish: () => {
            resolve(null);
        },
        previous: previousRun
    };
};

const runModelWithShim = async (code: string): Promise<DetectedLanguage[]> => {
    let operations: ModelOperations | null = null;
    try {
        operations = await loadModelOperations();
        const restoreRequire = installBrowserRequireShim();
        try {
            return await operations.runModel(code);
        } finally {
            restoreRequire();
        }
    } catch (error) {
        resetModelOperations(operations);
        throw error;
    }
};

const runModel = async (code: string): Promise<DetectedLanguage[]> => {
    const { finish, previous } = enqueueModelRun();
    await previous;
    try {
        return await runModelWithShim(code);
    } finally {
        finish();
    }
};

const detectLanguage = async (code: string): Promise<string | null> => {
    if (code.trim() === "") return null;

    try {
        const [best] = await runModel(code);
        return best ? toShikiLanguage(best.languageId) : null;
    } catch {
        return null;
    }
};

export { AUTO_LANGUAGE_VALUE, LANGUAGE_OPTIONS, detectLanguage, toExtension };
