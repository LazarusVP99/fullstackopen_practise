import js from "@eslint/js";
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginNode from 'eslint-plugin-node';
import eslintPluginSecurity from 'eslint-plugin-security';
import globals from "globals";



/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  {
    files: ["src/**/*.js"],
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/*.config.js",
    ],
    plugins: {
      js,
      eslintPluginNode,
      import: eslintPluginImport,
      eslintPluginSecurity,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.node,
        // myCustomGlobal: "readonly"
      }
    },
    rules: {
      "no-console": "off",
      "no-debugger": "warn",
      "no-unused-vars": "warn",
      "no-process-exit": "off",
      "no-throw-literal": "warn",
      "prefer-const": "warn",
      "import/no-unresolved": "error",
      "import/named": "error",
      "import/default": "error",
      "import/namespace": "error",
      "import/no-absolute-path": "error",
      "import/no-dynamic-require": "warn",
      "import/no-self-import": "error",
      "import/no-cycle": "error",
      "import/no-useless-path-segments": "warn",
      "import/first": "warn",
      "import/no-duplicates": "warn",
      "import/order": ["warn", { "newlines-between": "always" }],
    },
  }
];