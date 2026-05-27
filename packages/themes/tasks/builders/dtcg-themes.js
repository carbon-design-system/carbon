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

  const variables = themeNames.flatMap((themeName) => {
    // Load DTCG JSON file
    const jsonPath = path.join(dtcgDir, `${themeName}.json`);

    if (!fs.existsSync(jsonPath)) {
      console.warn(`Warning: ${themeName}.json not found, skipping`);
      return [];
    }

    const dtcgTokens = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const theme = convertDTCGToTheme(dtcgTokens);

    return [
      t.Newline(),
      t.Assignment({
        id: t.Identifier(themeName),
        init: t.SassMap({
          properties: Object.entries(theme)
            .sort(([a], [b]) => a.localeCompare(b)) // Sort alphabetically
            .map(([token]) => {
              // Reference custom property instead of hardcoded value
              return t.SassMapProperty(
                t.Identifier(token),
                t.SassValue(`var(--cds-${token})`)
              );
            }),
        }),
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

  return t.StyleSheet([FILE_BANNER, t.Newline(), ...imports, ...variables]);
}

module.exports = buildDTCGThemesFile;
