import { defineConfig } from "oxlint";
import { oxlintReactConfigNoJSDoc } from "@robot-inventor/oxlint-config";

export default defineConfig({
    ...oxlintReactConfigNoJSDoc,
    settings: {
        ...oxlintReactConfigNoJSDoc.settings,
        jsdoc: {
            tagNamePreference: {
                jsxImportSource: "jsxImportSource"
            }
        }
    }
});
