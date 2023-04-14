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
      files: ['**/components/**/**-test.js'],
      rules: {
        // Enforce promises from fire event methods to be handled
        'testing-library/await-fire-event': 'error',

        // Disallow the use of `cleanup`
        'testing-library/no-manual-cleanup': 'error',

        // Suggest using explicit assertions rather than just `getBy*` queries
        'testing-library/prefer-explicit-assert': 'error',

        // Suggest using `userEvent` library instead of `fireEvent` for simulating user interaction
        'testing-library/prefer-user-event': 'error',

        // Use `waitFor` instead of deprecated wait methods
        'testing-library/prefer-wait-for': 'error',

        // Enforce a valid naming for return value from `render`
        'testing-library/render-result-naming-convention': 'off',
      },
    },
  ],
};
