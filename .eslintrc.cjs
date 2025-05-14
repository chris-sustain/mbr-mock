module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true,
    jest: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'prettier', 'plugin:storybook/recommended', 'plugin:storybook/recommended'],
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  ignorePatterns: ['**/src/stories/**', '**/src/**/*.stories.**'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', 'i18next', '@typescript-eslint'],
  rules: {
    'no-unused-vars': 'warn', // warning, not error
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    'no-prototype-builtins': 'off',
    'react/prop-types': 'off',
    'no-empty-pattern': 'off',
    'no-loss-of-precision': 'off',
    'prettier/prettier': 0,
    'no-debugger': 'warn',
    'i18n-json/valid-message-syntax': 'off',
    'i18next/no-literal-string': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-warning-comments': ['warn', { terms: ['TODO', 'FIXME', 'XXX', 'BUG'], location: 'start' }],
    complexity: ['warn', 15],
    'max-depth': ['warn', 4],
    'max-nested-callbacks': ['warn', 3],
    'max-statements': ['warn', 50],
    'no-duplicate-imports': 'error'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
