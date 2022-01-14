module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    commonjs: true,
    es6: true,
  },
  parser: "@typescript-eslint/parser",
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  plugins: ["import"],
  rules: {
    quotes: "off",

    "no-unused-vars": "off",

    semi: ["error", "always"],

    indent: "off",

    "no-multi-spaces": ["error"],
  },
  settings: {
    react: {
      createClass: "createReactClass",

      pragma: "React",
      fragment: "Fragment",
      version: "detect",

      flowVersion: "0.53",
    },

    propWrapperFunctions: [
      "forbidExtraProps",
      { property: "freeze", object: "Object" },
      { property: "myFavoriteWrapper" },

      { property: "forbidExtraProps", exact: true },
    ],
    componentWrapperFunctions: [
      "observer",
      { property: "styled" },
      { property: "observer", object: "Mobx" },
      { property: "observer", object: "<pragma>" },
    ],
    formComponents: ["CustomForm", { name: "Form", formAttribute: "endpoint" }],
    linkComponents: ["Hyperlink", { name: "Link", linkAttribute: "to" }],
  },
};
