import type { FlatESLintConfig } from "eslint-define-config";
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";

const config: FlatESLintConfig = {
  ...js.configs.recommended,
  files: ["src/**/*.{ts,tsx}"],
  plugins: {
    "@typescript-eslint": tsPlugin as any,
    import: importPlugin as any,
  },
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      project: "./tsconfig.json",
    },
    globals: {
      ...globals.browser,
      ...globals.nodeBuiltin,
    },
  },
  rules: {
    ...js.configs.recommended.rules,
    ...tsPlugin.configs?.recommended?.rules,
    "import/extensions": [
      "error",
      {
        ts: "always",
        js: "never",
        html: "ignorePackages",
        scsssheet: "ignorePackages",
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".html", ".scsssheet", ".ts"],
      },
    },
  },
};

export default config;
