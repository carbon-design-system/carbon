/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = {
  plugins: ['testing-library'],
  overrides: [
    {
      extends: ['plugin:testing-library/react'],
      files: ['packages/react/**/*-test.js'],
      rules: {
        'testing-library/no-node-access': [
          'error',
          { allowContainerFirstChild: true },
        ],
      },
    },
  ],
};
