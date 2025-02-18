import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/xtscancodes.js"],
}, ...compat.extends("eslint:recommended"), {
    languageOptions: {
        globals: {
            ...globals.browser,
        },

        ecmaVersion: 5,
        sourceType: "module",
    },

    rules: {
        "no-unused-vars": ["error", {
            vars: "all",
            args: "none",
            ignoreRestSiblings: true,
        }],

        "no-constant-condition": ["error", {
            checkLoops: false,
        }],

        "no-var": "error",
        "no-useless-constructor": "error",

        "object-shorthand": ["error", "methods", {
            avoidQuotes: true,
        }],

        "prefer-arrow-callback": "error",

        "arrow-body-style": ["error", "as-needed", {
            requireReturnForObjectLiteral: false,
        }],

        "arrow-parens": ["error", "as-needed", {
            requireForBlockBody: true,
        }],

        "arrow-spacing": ["error"],

        "no-confusing-arrow": ["error", {
            allowParens: true,
        }],

        "brace-style": ["error", "1tbs", {
            allowSingleLine: true,
        }],

        indent: ["error", 4, {
            SwitchCase: 1,

            FunctionDeclaration: {
                parameters: "first",
            },

            CallExpression: {
                arguments: "first",
            },

            ArrayExpression: "first",
            ObjectExpression: "first",
            ignoreComments: true,
        }],

        "comma-spacing": ["error"],
        "comma-style": ["error"],
        curly: ["error", "multi-line"],
        "func-call-spacing": ["error"],
        "func-names": ["error"],

        "func-style": ["error", "declaration", {
            allowArrowFunctions: true,
        }],

        "key-spacing": ["error"],
        "keyword-spacing": ["error"],
        "no-trailing-spaces": ["error"],
        semi: ["error"],
        "space-before-blocks": ["error"],

        "space-before-function-paren": ["error", {
            anonymous: "always",
            named: "never",
            asyncArrow: "always",
        }],

        "switch-colon-spacing": ["error"],

        camelcase: ["error", {
            allow: ["^XK_", "^XF86XK_"],
        }],
    },
}];