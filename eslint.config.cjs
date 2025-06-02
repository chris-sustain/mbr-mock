const { defineConfig, globalIgnores } = require('eslint/config');

const globals = require('globals');
const tsParser = require('@typescript-eslint/parser');
const react = require('eslint-plugin-react');
const i18Next = require('eslint-plugin-i18next');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const tanstackQuery = require('@tanstack/eslint-plugin-query');
const reactRefresh = require('eslint-plugin-react-refresh');
const js = require('@eslint/js');
const importPlugin = require('eslint-plugin-import');
const simpleImportSort = require('eslint-plugin-simple-import-sort');

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
      'plugin:import/recommended',
      'plugin:import/typescript',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/strict',
      'plugin:@typescript-eslint/stylistic',
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
      'react-refresh': reactRefresh,
      import: importPlugin,
      'simple-import-sort': simpleImportSort
    },

    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'import/no-default-export': 'error',
      'import/prefer-default-export': 'off',
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
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 1. Side effect imports (e.g. global styles)
            ['^\\u0000'],

            // 2. Node.js builtins
            ['^node:'],

            // 3. External packages
            ['^@?\\w'],

            // 4. Internal aliases (like @/components or similar)
            ['^@src', '^@components'],

            // 5. Relative imports (parent/sibling/index)
            ['^\\.\\.(?!/?$)', '^\\./(?=.*/)', '^\\.(?!/?$)', '^\\./?$'],

            // 6. CSS/SCSS modules
            ['^.+\\.module\\.(css|scss)$']
          ]
        }
      ],

      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' }
      ]
    },

    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        typescript: true,
        node: true
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
