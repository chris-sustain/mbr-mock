const { defineConfig, globalIgnores } = require('eslint/config');

const globals = require('globals');
const tsParser = require('@typescript-eslint/parser');
const react = require('eslint-plugin-react');
const i18Next = require('eslint-plugin-i18next');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const tanstackQuery = require('@tanstack/eslint-plugin-query');
const reactRefresh = require('eslint-plugin-react-refresh');
const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

module.exports = defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.jest
      },

      parser: tsParser,
      ecmaVersion: 12,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },

    extends: compat.extends(
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'prettier',
      'plugin:storybook/recommended',
      'plugin:storybook/recommended'
    ),

    plugins: {
      react,
      i18next: i18Next,
      '@typescript-eslint': typescriptEslint,
      '@tanstack/query': tanstackQuery,
      'react-refresh': reactRefresh
    },

    rules: {
      'no-unused-vars': 'warn',
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

      'no-console': [
        'warn',
        {
          allow: ['warn', 'error']
        }
      ],

      'no-warning-comments': [
        'warn',
        {
          terms: ['TODO', 'FIXME', 'XXX', 'BUG'],
          location: 'start'
        }
      ],

      complexity: ['warn', 15],
      'max-depth': ['warn', 4],
      'max-nested-callbacks': ['warn', 3],
      'max-statements': ['warn', 50],
      'no-duplicate-imports': 'error',
      '@tanstack/query/exhaustive-deps': 'error',
      'react-refresh/only-export-components': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
    },

    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    languageOptions: {
      globals: {
        ...globals.node
      },

      sourceType: 'script',
      parserOptions: {}
    },

    files: ['**/.eslintrc.{js,cjs}']
  },
  globalIgnores(['**/src/stories/**/*', '**/src/**/*.stories.**'])
]);
