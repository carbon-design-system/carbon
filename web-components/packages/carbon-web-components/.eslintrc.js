/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const restrictedGlobals = require('eslint-restricted-globals');

module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'script',
  },
  extends: ['../eslint-config-ibmdotcom', 'plugin:storybook/recommended'],
  env: {
    node: true,
    es6: true,
  },
  rules: {
    'no-restricted-globals': ['error', 'isFinite'].concat(restrictedGlobals),
    // 'no-unused-expressions': 0,
    // 'babel/no-unused-expressions': 2,
    'import/extensions': 0,
    // 'import/no-extraneous-dependencies': [
    //   2,
    //   {
    //     devDependencies: true,
    //     optionalDependencies: true,
    //     peerDependencies: false,
    //   },
    // ],
    // 'import/no-unresolved': [2, { ignore: ['^carbon-web-components/es/icons/'] }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.tsx', '.d.ts'],
      },
    },
  },
  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      rules: {
        'no-unused-vars': 0,
        '@typescript-eslint/no-unused-vars': 1,
        'jsdoc/require-param-type': 0,
        'jsdoc/require-returns-type': 0,
        'no-undef': 0,
      },
    },
    {
      files: ['**/defs.ts'],
      rules: {
        'import/prefer-default-export': 0,
      },
    },
    {
      files: ['examples/codesandbox/**/*.js', 'examples/codesandbox/**/*.ts'],
      parserOptions: {
        sourceType: 'module',
      },
      rules: {
        // 'import/no-unresolved': 0,
      },
    },
    {
      files: [
        'tests/e2e/cypress/**/*.js',
        'tests/e2e-storybook/cypress/**/*.js',
      ],
      parserOptions: {
        sourceType: 'module',
      },
      rules: {
        // 'import/no-unresolved': 0,
      },
    },
    {
      files: [
        'examples/codesandbox/**/*.config.js',
        'examples/codesandbox/**/app.js',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: [
        'tests/e2e/**/*.e2e.js',
        'tests/e2e/**/*.cdn.e2e.js',
        'src/components/**/*.e2e.js',
        'tests/cdn-build/**/*.js',
      ],
      extends: ['plugin:cypress/recommended'],
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      files: ['tests/a11y/**/*.js', 'tests/utils/**/*.js'],
      parserOptions: {
        sourceType: 'module',
      },
      rules: {
        // 'import/no-unresolved': 0,
      },
      globals: {
        aChecker: true,
      },
    },
  ],
};
