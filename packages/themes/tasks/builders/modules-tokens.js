/**
 * Copyright IBM Corp. 2015, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { types: t } = require('@carbon/scss-generator');
const { formatTokenName } = require('../../lib');
const { FILE_BANNER } = require('./shared');

function buildThemeTokens(tokens) {
  const names = Object.values(tokens).flatMap((values) => {
    return values.map(formatTokenName);
  });

  return t.StyleSheet([
    FILE_BANNER,
    t.Newline(),
    ...names.map((name) => {
      return t.Assignment({
        id: t.Identifier(name),
        init: t.SassValue(`var(--cds-${name})`),
      });
    }),
  ]);
}

module.exports = buildThemeTokens;
