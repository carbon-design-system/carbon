/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = {
  plugins: ['testing-library'],
  overrides: [
    {
      // extends: ['plugin:testing-library/react'],
      files: ['**/components/**/Link-test.js'],
      rules: {
        // Enforce promises from async queries to be handled
        'testing-library/await-async-query': 'error',

        // Enforce async utils to be awaited properly
        'testing-library/await-async-utils': 'error',

        // Enforce promises from fire event methods to be handled
        'testing-library/await-fire-event': 'error',

        // Ensure `data-testid` values match a provided regex.
        'testing-library/consistent-data-testid': 'off',

        // Disallow unnecessary `await` for sync events
        'testing-library/no-await-sync-events': 'error',

        // Disallow unnecessary `await` for sync queries
        'testing-library/no-await-sync-query': 'error',

        // Disallow the use of `container` methods
        'testing-library/no-container': 'error',

        // Disallow the use of debugging utilities like `debug`
        'testing-library/no-debug': 'error',

        // Disallow importing from DOM Testing Library
        'testing-library/no-dom-import': 'error',

        // Disallow the use of `cleanup`
        'testing-library/no-manual-cleanup': 'error',

        // Disallow direct Node access
        'testing-library/no-node-access': 'error',

        // Disallow the use of promises passed to a `fireEvent` method
        'testing-library/no-promise-in-fire-event': 'error',

        // Disallow the use of `render` in setup functions
        'testing-library/no-render-in-setup': 'error',

        // Disallow wrapping Testing Library utils or empty callbacks in `act`
        'testing-library/no-unnecessary-act': 'error',

        // Disallow empty callbacks for `waitFor` and `waitForElementToBeRemoved`
        'testing-library/no-wait-for-empty-callback': 'error',

        // Disallow the use of multiple expect inside `waitFor`
        'testing-library/no-wait-for-multiple-assertions': 'error',

        // Disallow the use of side effects inside `waitFor`
        'testing-library/no-wait-for-side-effects': 'error',

        // Ensures no snapshot is generated inside of a `waitFor` call
        'testing-library/no-wait-for-snapshot': 'error',

        // Suggest using explicit assertions rather than just `getBy*` queries
        'testing-library/prefer-explicit-assert': 'error',

        // Suggest using `findBy*` methods instead of the `waitFor` + `getBy` queries
        'testing-library/prefer-find-by': 'error',

        // Enforce specific queries when checking element is present or not
        'testing-library/prefer-presence-queries': 'error',

        // Suggest using screen while using queries
        'testing-library/prefer-screen-queries': 'error',

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
