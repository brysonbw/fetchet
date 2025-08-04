import eslint from "@eslint/js";
import pluginSecurity from "eslint-plugin-security";
import jsdoc from "eslint-plugin-jsdoc";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";

const securityRulesAsErrors = Object.fromEntries(
  Object.entries(pluginSecurity.configs.recommended.rules).map(([rule]) => [
    rule,
    "error"
  ])
);

export default [
  eslint.configs.recommended,
  jsdoc.configs["flat/recommended-error"],
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  pluginSecurity.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    ignores: ["dist/**"]
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        __dirname: true
      }
    },
    plugins: { jsdoc },
    rules: {
      ...securityRulesAsErrors,
      // Prettier
      "prettier/prettier": "error",
      // JSDoc
      "jsdoc/require-description": "off",
      "jsdoc/require-property-description": "off",
      "jsdoc/require-param-description": "off",
      "jsdoc/require-returns-description": "off",
      "jsdoc/require-returns": "error",
      "jsdoc/require-param-type": "error",
      // Typescript
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/prefer-for-of": "warn"
    }
  },
  // Override rules for specific files
  {
    files: ["**/*.test.ts", "**/*.config.ts"],
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "jsdoc/require-jsdoc": "off",
      "@typescript-eslint/no-empty-function": "off"
    }
  }
];
