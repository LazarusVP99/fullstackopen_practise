import eslint from '@eslint/js';
import tanstackQuery from '@tanstack/eslint-plugin-query';
import prettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
  eslint.configs.recommended,
  prettier,
  { ignores: ['dist', 'node_modules', 'e2e'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      '@tanstack/query': tanstackQuery
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...tanstackQuery.configs.recommended.rules,
      'react/jsx-no-target-blank': 'error',
      'arrow-spacing': ['error', {
        'before': true,
        'after': true
      }],
      'object-property-newline': ['error', {
        'allowMultiplePropertiesPerLine': true,
        'allowAllPropertiesOnSameLine': true
      }],
      'object-curly-newline': ['error', {
        'ObjectExpression': {
          'minProperties': 5,
          'multiline': true
        }
      }],
      'object-curly-spacing': [
        'error', 'always'
      ],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'quotes': [
        'error',
        'single'
      ],
      'eqeqeq': 'error',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'warn',
      'no-trailing-spaces': 'error',
      'no-console': 'off',
    },
  },
];