/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const OFF = null;

module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-prettier'],
  rules: {
    'prettier/prettier': true,

    // Overrides for stylelint-config-standard that are expecting CSS, not SCSS
    'annotation-no-unknown': OFF,
    'alpha-value-notation': OFF,
    'value-keyword-case': OFF,
    'color-function-notation': OFF,
    'at-rule-empty-line-before': OFF,
    'function-no-unknown': OFF,
    'at-rule-no-unknown': OFF,
    'media-query-no-invalid': OFF,
    'color-hex-length': 'long',
  },
};
