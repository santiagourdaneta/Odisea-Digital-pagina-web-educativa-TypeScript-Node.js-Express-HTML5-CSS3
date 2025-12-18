import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // Esto le dice al robot qué archivos debe vigilar
    files: ["src/**/*.ts", "server/**/*.ts"],
    rules: {
      "no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": "off"
    },
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
  }
);