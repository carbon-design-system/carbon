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

  // Load all themes from DTCG JSON
  const dtcgDir = path.resolve(__dirname, '../../src/dtcg');
  const themeNames = ['white', 'g10', 'g90', 'g100'];
  const themes = {};

  themeNames.forEach((themeName) => {
    const jsonPath = path.join(dtcgDir, `${themeName}.json`);
    if (fs.existsSync(jsonPath)) {
      const dtcgTokens = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      themes[themeName] = convertDTCGToTheme(dtcgTokens);
    }
  });

  const defaultTheme = themes.white;

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

    // CSS Custom Properties for white theme (default)
    t.Comment('/ CSS Custom Properties for all tokens'),
    t.Comment(
      '/ White theme is the default, applied to :root and [data-carbon-theme="white"]'
    ),
    t.SassValue(':root,'),
    t.SassValue("[data-carbon-theme='white'] {"),
    ...tokens.map((token) => {
      const id = token.name;
      const value =
        defaultTheme[id] !== undefined
          ? `${defaultTheme[id]}`
          : `#{theme.get('${id}')}`;
      return t.SassValue(`  --#{config.$prefix}-${id}: ${value};`);
    }),
    t.SassValue('}'),
    t.Newline(),

    // CSS Custom Properties for other themes
    t.Comment('/ Theme-specific CSS Custom Property overrides'),
    t.Comment(
      '/ These selectors enable theme switching via data-carbon-theme attribute'
    ),
    ...themeNames
      .filter((name) => name !== 'white')
      .flatMap((themeName) => {
        const theme = themes[themeName];
        if (!theme) return [];

        return [
          t.Newline(),
          t.Comment(`/ ${themeName} theme overrides`),
          t.SassValue(`[data-carbon-theme='${themeName}'] {`),
          ...tokens
            .map((token) => {
              const id = token.name;
              const value = theme[id];
              // Only emit if value exists and is different from white theme
              if (value !== undefined && value !== defaultTheme[id]) {
                return t.SassValue(`  --#{config.$prefix}-${id}: ${value};`);
              }
              return null;
            })
            .filter(Boolean),
          t.SassValue('}'),
        ];
      }),
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
