module.exports = {
  root: true,
  extends: "@react-native-community",
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    semi: [2, "always"],
    quotes: [2, "double"],
    "no-console": 2,
    "@typescript-eslint/explicit-function-return-type": 0,
    "react-hooks/rules-of-hooks": 2,
    "react-hooks/exhaustive-deps": 1,
    "react-native/no-inline-styles": 1,
    "react-native/no-unused-styles": 1,
    "react-native/no-color-literals": 1,
    "no-mixed-spaces-and-tabs": 2,
  }
};

// 0 - "off", 1 - "warn", 2 - "error"
