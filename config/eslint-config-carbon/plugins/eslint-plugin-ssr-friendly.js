/**
 * Copyright IBM Corp. 2018, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = {
  plugins: ['ssr-friendly'],
  ignorePatterns: ['*.stories.js', '*-test.js'],
  overrides: [
    {
      extends: ['plugin:ssr-friendly/recommended'],
      files: ['*.js', '*.ts', '*.tsx'],
    },
  ],
};
