/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["vue", "prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        semi: true,
        singleQuote: true,
        printWidth: 80,
        tabWidth: 2,
      },
    ],
    "vue/multi-word-component-names": false, // 이름 멀티플 안되도 되게 설정
  },
};
