module.exports = {
  root: true,
  extends: [
    './config/eslint/javascript/.eslintrc.cjs',
    './config/eslint/typescript/.eslintrc.cjs',
    './config/eslint/prettier/.eslintrc.cjs',
    './config/eslint/react/.eslintrc.cjs',
    'next/core-web-vitals',
    'next/typescript',
    'plugin:storybook/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  globals: {
    _: 'readonly',
    NodeJS: 'readonly',
    NodeListOf: 'readonly',
  },
  ignorePatterns: [
    "node_modules/"
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    "react-hooks/exhaustive-deps": 'off'
  }
}