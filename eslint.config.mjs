// eslint.config.js
import js from "@eslint/js";
import react from "eslint-plugin-react";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import globals from "globals";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    ignores: ["eslint.config.mjs"],

    ...js.configs.recommended,

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2022,
        sourceType: "module",
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
      },
    },

    plugins: {
      react: react,
      "@typescript-eslint": tsPlugin,
    },

    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...tsPlugin.configs.recommended.rules,

      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",

      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
    },

    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // 🚨 NEW CONFIGURATION FOR TEST FILES 🚨
  {
    files: ["**/*.test.{js,jsx,ts,tsx}"], // Target your test files
    languageOptions: {
      globals: {
        ...globals.jest, // Enable Jest globals ('test', 'expect', etc.)
        // Add other test environment globals if necessary, e.g.,
        // ...globals.jestDom, // For @testing-library/jest-dom matchers
      },
    },
    rules: {
      // You might want to override some rules specifically for tests
      // For example, allowing console logs in tests:
      // 'no-console': 'off',
      // If you use React Testing Library, you might want these:
      // 'testing-library/no-node-access': 'off', // Example: If you need to access DOM nodes directly in tests
    },
    // Make sure this config doesn't accidentally override essential parsers/plugins if you need them for TS test files.
    // If your test files are also TypeScript, you'd merge some of the main config's languageOptions/plugins.
    // Example for TS test files:
    // languageOptions: {
    //   parser: tsParser,
    //   parserOptions: { /* ... same as above ... */ },
    //   globals: {
    //     ...globals.jest,
    //     ...globals.jestDom, // if using jest-dom
    //   }
    // },
    // plugins: {
    //   '@typescript-eslint': tsPlugin,
    //   // If your tests use React components and JSX directly, you'd also need react plugin here
    //   react: react,
    // },
  },

  // Ignore patterns
  {
    ignores: ["node_modules/", "dist/", ".pnpm-store/", "build/"],
  },
];
