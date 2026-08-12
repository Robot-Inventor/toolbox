import babel from "vite-plugin-babel";
import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig({
    plugins: [
        reactRouter(),
        babel({
            babelConfig: {
                parserOpts: { plugins: ["jsx"] },
                plugins: [["babel-plugin-react-compiler"]],
                presets: ["@babel/preset-typescript"]
            },
            include: /\.[jt]sx?$/
        })
    ]
});
