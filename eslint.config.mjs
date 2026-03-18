import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import tseslintPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

const coreWebVitalsRules =
  nextPlugin.configs?.["core-web-vitals"]?.rules ?? {};
const recommendedNextRules =
  nextPlugin.configs?.recommended?.rules ?? {};

export default [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "public/**",
      "dist/**",
      "out/**",
    ],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@next/next": nextPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
      "@typescript-eslint": tseslintPlugin,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...recommendedNextRules,
      ...coreWebVitalsRules,
      ...reactHooksPlugin.configs.recommended.rules,
    },
  },
];

