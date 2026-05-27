/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { types: t } = require('@carbon/scss-generator');
const fs = require('fs-extra');
const path = require('path');
const { convertDTCGToTheme } = require('./dtcg-converter');
const { FILE_BANNER } = require('./shared');

/**
 * Build themes file from DTCG JSON files
 */
function buildDTCGThemesFile() {
  const dtcgDir = path.resolve(__dirname, '../../src/dtcg');
  const themeNames = ['white', 'g10', 'g90', 'g100'];

  const imports = [
    t.SassModule('sass:map'),
    t.SassModule('sass:string'),
    t.SassModule('@carbon/layout'),
    t.SassModule('@carbon/type'),
    t.SassModule('../utilities'),
  ];

  // Load white theme as base to get all token names
  const whiteJsonPath = path.join(dtcgDir, 'white.json');
  const whiteTokens = JSON.parse(fs.readFileSync(whiteJsonPath, 'utf8'));
  const whiteTheme = convertDTCGToTheme(whiteTokens);
  const allTokenNames = Object.keys(whiteTheme).sort();

  // Create shared base map with var() references for all tokens
  const baseMapVariable = [
    t.Newline(),
    t.Comment(
      ' Base map with CSS custom property references shared by all themes'
    ),
    t.Assignment({
      id: t.Identifier('-token-base'),
      init: t.SassMap({
        properties: allTokenNames.map((token) => {
          return t.SassMapProperty(
            t.Identifier(token),
            t.SassValue(`var(--cds-${token})`)
          );
        }),
      }),
      default: false,
    }),
  ];

  // Generate theme-specific variables
  const themeVariables = themeNames.flatMap((themeName) => {
    return [
      t.Newline(),
      t.Assignment({
        id: t.Identifier(themeName),
        init: t.Identifier('-token-base'),
        default: true,
      }),
      // Merge with layout and type tokens
      t.Assignment({
        id: t.Identifier(themeName),
        init: t.SassFunctionCall({
          id: t.Identifier('utilities.merge'),
          params: [
            t.Identifier(themeName),
            t.SassValue('layout.$spacing'),
            t.SassValue('layout.$fluid-spacing'),
            t.SassValue('type.$tokens'),
          ],
        }),
      }),
    ];
  });

  return t.StyleSheet([
    FILE_BANNER,
    t.Newline(),
    ...imports,
    ...baseMapVariable,
    ...themeVariables,
  ]);
}

module.exports = buildDTCGThemesFile;
