/**
 * Copyright IBM Corp. 2015, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { types: t } = require('@carbon/scss-generator');
const { group } = require('../../src/next');
const { FILE_BANNER } = require('./shared');

function buildThemeTokens() {
  const tokens = group.getTokens();
  const variables = tokens.flatMap((token) => {
    const id = token.name;
    return [
      t.Newline(),
      t.Comment(`/ The CSS Custom Property for the \`${id}\` token`),
      t.Assignment({
        id: t.Identifier(id),
        init: t.SassFunctionCall({
          id: t.Identifier('_get'),
          params: [t.SassString(id)],
        }),
        default: true,
      }),
    ];
  });

  return t.StyleSheet([
    // Preamble
    FILE_BANNER,
    t.Newline(),

    // Modules
    t.SassModule('sass:map'),
    t.SassModule('../config'),
    t.SassModule('../theme'),
    t.Newline(),

    t.Comment('/ Internal helper for generating CSS Custom Properties'),
    t.SassFunction({
      id: t.Identifier('_get'),
      params: [t.Identifier('token')],
      body: t.BlockStatement([
        t.IfStatement({
          test: t.LogicalExpression({
            left: t.SassValue('config.$use-fallback-value'),
            operator: '==',
            right: t.SassBoolean(false),
          }),
          consequent: t.BlockStatement([
            t.AtReturn(t.SassValue('var(--#{config.$prefix}-#{$token})')),
          ]),
          alternate: t.BlockStatement([
            t.AtReturn(
              t.SassValue(
                'var(--#{config.$prefix}-#{$token}, #{theme.get($token)})'
              )
            ),
          ]),
        }),
      ]),
    }),

    // Variables
    ...variables,
  ]);
}

module.exports = buildThemeTokens;
