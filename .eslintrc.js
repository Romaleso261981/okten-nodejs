module.exports = {
  env: {
    browser: true,
    es2023: true
  },
  extends: [
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname
  },
  plugins: ["@typescript-eslint/eslint-plugin", "simple-import-sort", "import"],
  rules: {
    indent: ["error", 2],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "req|res|next" }
    ],
    "@typescript-eslint/return-await": ["error", "always"],
    "simple-import-sort/imports": "error",
    "import/first": "error",
    "import/newline-after-import": ["error", { count: 1 }],
    "import/no-duplicates": "error",
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "no-console": "warn",
    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        allowSeparatedGroups: false
      }
    ]
  },
  ignorePatterns: [".eslintrc.js", "/dist", "/data"]
};
