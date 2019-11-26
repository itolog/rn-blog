module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: ['@react-native-community', 'airbnb-typescript', 'prettier', 'prettier/@typescript-eslint', 'prettier/react'],
  plugins: [
    'react',
    "react-hooks",
    "@typescript-eslint"
  ],
  parserOptions: {
    "project": "tsconfig.json",
    "tsconfigRootDir": ".",
  },
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "no-param-reassign": 0,
    "import/prefer-default-export": "off",
    "react-hooks/exhaustive-deps": "warn",
    "jsx-quotes": ["error", "prefer-single"],
    "import/no-unresolved": [
      2,
      {
        "ignore": [
          "react-native"
        ]
      }
    ]
  }
};
