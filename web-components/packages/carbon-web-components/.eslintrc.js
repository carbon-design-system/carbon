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
  extends: ['../eslint-config-ibmdotcom'],
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
        '@typescript-eslint/no-unused-vars': 0,
        'jsdoc/require-param-type': 0,
        'jsdoc/require-returns-type': 0,
      },
    },
    {
      files: ['**/*.tsx', '**/components-react/**/*-container.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'react'],
      rules: {
        'no-unused-vars': 0,
        // TODO: See why the ESLint plugin does not work with `.tsx`
        '@carbon/react-prop-type-comments/require-proptype-comment': 0,
        '@typescript-eslint/no-unused-vars': 2,
        // 'import/no-unresolved': [
        //   2,
        //   {
        //     ignore: ['^./'],
        //   },
        // ],
        'jsdoc/require-param-type': 0,
        'jsdoc/require-returns-type': 0,
        'react/jsx-uses-react': 2,
        'react/jsx-uses-vars': 2,
      },
    },
    {
      files: ['**/defs.ts'],
      rules: {
        'import/prefer-default-export': 0,
      },
    },
    {
      files: ['**/*.stories.react.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'react'],
      rules: {
        'no-unused-vars': 0,
        '@typescript-eslint/no-unused-vars': 2,
        // 'import/no-extraneous-dependencies': 0,
        // 'import/no-unresolved': [
        //   2,
        //   {
        //     ignore: [
        //       '^carbon-web-components/es/(components-react|icons)/',
        //       '^@carbon/ibmdotcom-web-components/es/(components-react|icons)/',
        //       '/components-react/',
        //     ],
        //   },
        // ],
        'react/jsx-uses-react': 2,
        'react/jsx-uses-vars': 2,
        'react/prop-types': 0,
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
      files: ['tests/e2e/cypress/**/*.js', 'tests/e2e-storybook/cypress/**/*.js'],
      parserOptions: {
        sourceType: 'module',
      },
      rules: {
        // 'import/no-unresolved': 0,
      },
    },
    {
      files: ['examples/codesandbox/{react,form/redux-form}/**/*.js'],
      plugins: ['react'],
      rules: {
        'react/jsx-uses-react': 2,
        'react/jsx-uses-vars': 2,
      },
    },
    {
      files: ['examples/codesandbox/**/*.config.js', 'examples/codesandbox/**/app.js'],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: ['tests/e2e/**/*.e2e.js', 'tests/e2e/**/*.cdn.e2e.js', 'src/components/**/*.e2e.js', 'tests/cdn-build/**/*.js'],
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
