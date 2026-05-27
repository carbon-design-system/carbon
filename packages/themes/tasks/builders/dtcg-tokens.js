/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { types: t } = require('@carbon/scss-generator');
const { group } = require('../../src/tokens');
const { FILE_BANNER } = require('./shared');
const fs = require('fs-extra');
const path = require('path');
const { convertDTCGToTheme } = require('./dtcg-converter');

/**
 * Build token variables from DTCG + JS metadata
 * This generates SCSS variables that wrap CSS custom properties
 * Token structure comes from JS metadata, values come from DTCG themes
 */
function buildDTCGTokens() {
  // Get token structure from JS metadata
  const tokens = group.getTokens();

  // Load the default theme (white) from DTCG JSON to get actual color values
  const dtcgDir = path.resolve(__dirname, '../../src/dtcg');
  const whiteJsonPath = path.join(dtcgDir, 'white.json');
  const dtcgTokens = JSON.parse(fs.readFileSync(whiteJsonPath, 'utf8'));
  const defaultTheme = convertDTCGToTheme(dtcgTokens);

  // Generate Sass variables that reference the custom properties
  // These maintain backward compatibility with existing Sass code
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

    // CSS Custom Properties in :root
    // This makes all tokens available as CSS variables globally
    // Values come directly from DTCG JSON (actual color values)
    t.Comment('/ CSS Custom Properties for all tokens'),
    t.Comment(
      '/ These are defined in :root with actual values from the default theme'
    ),
    t.SassValue(':root {'),
    ...tokens.map((token) => {
      const id = token.name;
      // Get actual value from DTCG theme, fallback to theme.get() for non-DTCG tokens
      const value =
        defaultTheme[id] !== undefined
          ? `${defaultTheme[id]}`
          : `#{theme.get('${id}')}`;
      return t.SassValue(`  --#{config.$prefix}-${id}: ${value};`);
    }),
    t.SassValue('}'),
    t.Newline(),

    // Helper function for generating CSS Custom Properties
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
    t.Newline(),

    // Sass Variables
    t.Comment('/ Sass variables that reference CSS Custom Properties'),
    t.Comment('/ Use these in Sass code for backward compatibility'),
    ...variables,
  ]);
}

module.exports = buildDTCGTokens;
