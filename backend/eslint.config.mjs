import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import jsdoc from "eslint-plugin-jsdoc";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  jsdoc.configs["flat/recommended"],
  {
    plugins: {
      jsdoc: jsdoc,
    },
    rules: {

      "prefer-const": "error",
      curly: ["error", "multi"],
      "keyword-spacing": ["error", { before: true, after: true }],
      "space-before-blocks": ["error", "always"],
      "comma-spacing": ["error", { before: false, after: true }],
      "space-before-function-paren": [
        "error",
        { named: "never", anonymous: "never", asyncArrow: "ignore" },
      ],
      "arrow-spacing": ["error", { before: true, after: true }],
      "padded-blocks": ["error", "never"],
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-nested-ternary": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_"}],
      eqeqeq: ["error", "smart"],
      "space-in-parens": ["error", "never"],
      "quote-props": ["error", "as-needed"],
      semi: ["error", "always"],
      "key-spacing": ["error", { beforeColon: false, afterColon: true }],
      "comma-style": ["error", "last"],
      "operator-linebreak": "off",
      "space-unary-ops": ["error", { words: false, nonwords: false }],
      "semi-spacing": ["error", { before: false, after: true }],
      "space-infix-ops": "error",
      camelcase: ["error", { properties: "always" }],
      "no-with": "error",
      "no-multi-str": "error",
      "linebreak-style": ["error", "windows"],
      quotes: ["error", "double", { allowTemplateLiterals: true }],
      indent: ["error", 2, { SwitchCase: 1 }],
      "no-mixed-spaces-and-tabs": "error",
      "no-trailing-spaces": "error",
      "comma-dangle": ["error", "always-multiline"],
      "func-call-spacing": ["error", "never"],
      "brace-style": ["error", "1tbs", { allowSingleLine: true }],
      "max-len": ["warn", { code: 150 }],
      "consistent-this": ["error", "self"],
      yoda: ["error", "never"],
      "valid-jsdoc": "off",
      "jsdoc/require-jsdoc": [
        "warn",
        {
          require: {
            FunctionDeclaration: false,
            MethodDefinition: true,
            ClassDeclaration: false,
          },
        },
      ],
      "jsdoc/require-param": "off",
      "jsdoc/require-param-type": "off",
      "jsdoc/require-returns": "off",
      "jsdoc/require-returns-type": "off",
      "no-tabs": "error",
      "no-warning-comments": "warn",
    },
  },
];

