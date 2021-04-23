/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = {
  plugins: ['eslint-plugin-cypress'],
  overrides: [
    {
      files: ['*-test.e2e.js'],
      extends: ['plugin:cypress/recommended'],
    },
  ],
};
