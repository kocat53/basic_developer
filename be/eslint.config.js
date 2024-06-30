export default [
  {
    root: true,
    env: {
      node: true,
      browser: false,
    },
    extends: ["eslint:recommended", "plugin:prettier/recommended"],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: "module",
    },
    plugins: ["prettier"],
    rules: {
      "no-console": "off",
      "no-debugger": "warn",
      "prettier/prettier": [
        "error",
        {
          singleQuote: true,
          semi: false,
          useTaps: true,
          tabWidth: 2,
          trailingComma: "all",
          printWidth: 80,
          bracketSpacing: true,
          arrowParens: "avoid",
        },
      ],
    },
  },
];
