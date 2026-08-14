/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-no-unsupported-browser-features',
    'stylelint-config-idiomatic-order',
    'stylelint-config-standard-scss',
    './rules/possible-errors.js',
    './rules/limit-language-features.js',
    './rules/stylistic-issues.js',
    './plugins/a11y.js',
    './plugins/scss.js',
  ],
};
