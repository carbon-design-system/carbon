/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['react', 'react-hooks'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // react
    'react/jsx-uses-vars': 1,
    'react/jsx-uses-react': 1,
    'react/no-find-dom-node': 1,
    'react/no-typos': 2,

    // react-hooks
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 2,

    // jsx-a11y
    'jsx-a11y/no-static-element-interactions': 1,
    'jsx-a11y/no-noninteractive-element-interactions': 1,
    'jsx-a11y/click-events-have-key-events': 1,
    'jsx-a11y/anchor-is-valid': 1,
    'jsx-a11y/interactive-supports-focus': 1,
    'jsx-a11y/label-has-for': [
      1,
      {
        components: ['Label'],
        required: {
          some: ['nesting', 'id'],
        },
        allowChildren: true,
      },
    ],
  },
};
