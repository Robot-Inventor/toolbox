import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactRouter } from "@react-router/dev/vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

// React Router provides the Fast Refresh wrapper for route modules.
// Keep the Rust Compiler and JSX transforms, but avoid installing a second HMR wrapper.
const reactCompilerPlugins = react({ compiler: true }).filter(
    ({ name }) =>
        ![
            "vite:react:refresh-wrapper",
            "vite:react-refresh",
            "vite:react-virtual-preamble",
            "vite:react-refresh-fbm"
        ].includes(name ?? "")
);

export default defineConfig({
    plugins: [...reactCompilerPlugins, vanillaExtractPlugin(), reactRouter()]
});
