import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import oxlint from "eslint-plugin-oxlint";

const eslintConfig = defineConfig([
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  // Context / theme files mix providers + hooks in the same file by design.
  // They are never hot-replaced as component trees, so the react-refresh
  // warning is not actionable. Suppress it for those files.
  {
    files: ["**/i18n/**", "**/theme/**"],
    rules: {
      "react-refresh/only-export-components": "off",
    },
  },
  // Disable ESLint rules already covered by oxlint
  oxlint.configs["flat/recommended"],
  globalIgnores(["dist/**"]),
]);

export default eslintConfig;
