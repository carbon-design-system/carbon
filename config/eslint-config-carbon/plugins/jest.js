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

        // Disallow duplicate setup and teardown hooks
        'jest/no-duplicate-hooks': 'error',

        // Disallow using exports in files containing tests
        'jest/no-export': 'error',

        // Disallow focused tests
        'jest/no-focused-tests': 'error',

        // Disallow setup and teardown hooks
        'jest/no-hooks': 'off',

        // Disallow identical titles
        'jest/no-identical-title': 'error',

        // Disallow conditional logic
        'jest/no-if': 'error',

        // Disallow string interpolation inside snapshots
        'jest/no-interpolation-in-snapshots': 'error',

        // Disallow Jasmine globals
        'jest/no-jasmine-globals': 'error',

        // Disallow importing Jest
        'jest/no-jest-import': 'error',

        // Disallow large snapshots
        'jest/no-large-snapshots': 'off',

        // Disallow manually importing from __mocks__
        'jest/no-mocks-import': 'error',

        // Disallow specific matchers & modifiers
        'jest/no-restricted-matchers': 'off',

        // Disallow using expect outside of it or test blocks
        'jest/no-standalone-expect': 'error',

        // Use .only and .skip over f and x
        'jest/no-test-prefixes': 'off',

        // Disallow explicitly returning from tests
        'jest/no-test-return-statement': 'error',

        // Suggest using toBeCalledWith() or toHaveBeenCalledWith()
        'jest/prefer-called-with': 'off',

        // Suggest using expect.assertions() OR expect.hasAssertions()
        'jest/prefer-expect-assertions': 'off',

        // Suggest having hooks before any test cases
        'jest/prefer-hooks-on-top': 'error',

        // Suggest using jest.spyOn()
        'jest/prefer-spy-on': 'off',

        // Suggest using toStrictEqual()
        'jest/prefer-strict-equal': 'off',

        // Suggest using toBeNull()
        'jest/prefer-to-be-null': 'off',

        // Suggest using toBeUndefined()
        'jest/prefer-to-be-undefined': 'off',

        // Suggest using toContain()
        'jest/prefer-to-contain': 'off',

        // Suggest using toHaveLength()
        'jest/prefer-to-have-length': 'off',

        // Suggest using test.todo
        'jest/prefer-todo': 'off',

        // Require a message for toThrow()
        'jest/require-to-throw-message': 'off',

        // Require test cases and hooks to be inside a describe block
        'jest/require-top-level-describe': 'off',

        // Enforce valid describe() callback
        'jest/valid-describe': 'error',

        // Enforce valid expect() usage
        'jest/valid-expect': 'error',

        // Enforce having return statement when testing with promises
        'jest/valid-expect-in-promise': 'error',

        // Enforce valid titles
        'jest/valid-title': 'error',
      },
    },
  ],
};
