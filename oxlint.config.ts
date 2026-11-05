import { defineConfig } from "oxlint";
import { oxlintReactConfig } from "@robot-inventor/oxlint-config";

export default defineConfig({
    ...oxlintReactConfig,
    settings: {
        ...oxlintReactConfig.settings,
        jsdoc: {
            tagNamePreference: {
                jsxImportSource: "jsxImportSource"
            }
        }
    }
});
