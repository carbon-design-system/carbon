/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = {
  extends: [
    require.resolve('stylelint-config-standard'),
    require.resolve('stylelint-no-unsupported-browser-features'),
    require.resolve('stylelint-config-idiomatic-order'),
    require.resolve('./rules/possible-errors'),
    require.resolve('./rules/limit-language-features'),
    require.resolve('./rules/stylistic-issues'),
    require.resolve('./plugins/prettier'),
    require.resolve('./plugins/scss'),
  ],
};
