module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'jest', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-use-before-define': 'off',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
