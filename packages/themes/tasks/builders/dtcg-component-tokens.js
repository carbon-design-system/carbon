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
const {
  convertDTCGComponentTokens,
  camelToKebab,
} = require('./dtcg-converter');
const { FILE_BANNER, primitive } = require('./shared');

/**
 * Build component tokens file from DTCG JSON
 * @param {string} componentName - Name of the component (e.g., 'button', 'tag')
 */
function buildDTCGComponentTokensFile(componentName) {
  const dtcgPath = path.resolve(
    __dirname,
    `../../src/dtcg/components/${componentName}.json`
  );

  if (!fs.existsSync(dtcgPath)) {
    console.warn(`Warning: ${componentName}.json not found, skipping`);
    return t.StyleSheet([FILE_BANNER]);
  }

  const dtcgTokens = JSON.parse(fs.readFileSync(dtcgPath, 'utf8'));
  const componentTokens = convertDTCGComponentTokens(dtcgTokens);

  const imports = [t.SassModule('sass:map'), t.SassModule('sass:string')];

  const variables = Object.entries(componentTokens)
    .sort(([a], [b]) => a.localeCompare(b))
    .flatMap(([tokenName, themeValues]) => {
      // Convert theme keys to kebab-case for Sass
      const sassThemeValues = {};
      for (const [theme, value] of Object.entries(themeValues)) {
        const kebabTheme = camelToKebab(theme);
        sassThemeValues[kebabTheme] = value;
      }

      return [
        t.Newline(),
        t.Assignment({
          id: t.Identifier(tokenName),
          init: t.SassMap({
            properties: Object.entries(sassThemeValues).map(
              ([theme, value]) => {
                return t.SassMapProperty(t.Identifier(theme), primitive(value));
              }
            ),
          }),
          default: true,
        }),
      ];
    });

  return t.StyleSheet([FILE_BANNER, t.Newline(), ...imports, ...variables]);
}

module.exports = buildDTCGComponentTokensFile;
