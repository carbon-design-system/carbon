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
      files: ['*-test.js', '*.test.js', '*-spec.js', '*.spec.js'],
      env: {
        'jest/globals': true,
      },
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

        // Enforce lowercase test names
        'jest/lowercase-name': 'off',

        // Disallow alias methods
        'jest/no-alias-methods': 'error',

        // Disallow commented out tests
        'jest/no-commented-out-tests': 'error',

        // Prevent calling expect conditionally
        'jest/no-conditional-expect': 'error',

        // Disallow use of deprecated functions
        'jest/no-deprecated-functions': 'error',

        // Disallow disabled tests
        'jest/no-disabled-tests': 'off',

        // Avoid using a callback in asynchronous tests and hooks
        'jest/no-done-callback': 'error',
      },
    },
  ],
};
