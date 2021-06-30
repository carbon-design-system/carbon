/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = {
  plugins: ['eslint-plugin-jest'],
  overrides: [
    {
      files: ['*-test.js', '*.test.js'],
      env: {
        'jest/globals': true,
      },
      // extends: ['plugin:jest/recommended', 'plugin:jest/style'],
      rules: {
        // Have control over test and it usages
        'jest/consistent-test-it': 'off',

        // Have control over test and it usages
        'jest/expect-expect': [
          'error',
          {
            assertFunctionNames: ['expect', 'assert*'],
          },
        ],
      },
    },
  ],
};
