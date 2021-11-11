/* eslint-env node */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "2021",
    project: "./tsconfig.json",
  },
  ignorePatterns: "*.js",
  rules: {
    // Use Array<> and ReadonlyArray<> syntax.
    "@typescript-eslint/array-type": ["error", { default: "generic" }],

    // Require types on public things.
    "@typescript-eslint/explicit-module-boundary-types": "error",

    // Allow casting to any, since this is used in the tests.
    "@typescript-eslint/no-explicit-any": "off",

    // Only allow unused variables that are prefixed with an underscore.
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "all",
        argsIgnorePattern: "^_",
        vars: "all",
        varsIgnorePattern: "^_",
      },
    ],

    // Do not allow unnecessary checks.
    "@typescript-eslint/no-unnecessary-condition": "error",

    // Require explicit boolean expressions to avoid the ambiguities that JavaScript has, https://dorey.github.io/JavaScript-Equality-Table/#if-statement.
    "@typescript-eslint/strict-boolean-expressions": [
      "error",
      {
        allowString: false,
        allowNumber: false,
        allowNullableObject: false,
        allowNullableBoolean: false,
        allowNullableString: false,
        allowNullableNumber: false,
        allowAny: false,
      },
    ],

    // Always use strict comparisons.
    eqeqeq: "error",

    // Do not allow shorthands like !!foo and +foo to convert between types.
    "no-implicit-coercion": "error",

    // Forbid reassigning parameters.
    "no-param-reassign": "error",

    // Prefer const over let.
    "prefer-const": "error",

    // Prefer template strings over concatenating with plus.
    "prefer-template": "error",

    // Do not require that react components have a name.
    "react/display-name": "off",

    // Turn off prop types validation, since we're using TypeScript to validate this.
    "react/prop-types": "off",
  },
};
