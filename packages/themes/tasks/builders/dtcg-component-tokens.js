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
const { convertDTCGComponentTokens } = require('./dtcg-converter');
const { FILE_BANNER } = require('./shared');

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

  const imports = [
    t.SassModule('sass:map'),
    t.SassModule('sass:string'),
    t.SassModule('../config'),
  ];

  // Generate Sass variables (maps) that reference custom properties
  // This makes custom properties the single source of truth
  const variables = Object.entries(componentTokens)
    .sort(([a], [b]) => a.localeCompare(b))
    .flatMap(([tokenName]) => {
      // Create map with custom property references for each theme
      const themeNames = ['white-theme', 'g-10', 'g-90', 'g-100'];
      const sassThemeValues = {};

      for (const themeName of themeNames) {
        // Reference the custom property instead of hardcoded value
        sassThemeValues[themeName] = `var(--#{config.$prefix}-${tokenName})`;
      }

      return [
        t.Newline(),
        t.Assignment({
          id: t.Identifier(tokenName),
          init: t.SassMap({
            properties: Object.entries(sassThemeValues).map(
              ([theme, value]) => {
                // Use SassValue to output the var() reference
                return t.SassMapProperty(
                  t.Identifier(theme),
                  t.SassValue(value)
                );
              }
            ),
          }),
          default: true,
        }),
      ];
    });

  // Generate CSS custom properties for each theme
  // These will be scoped to theme-specific selectors
  const themeNames = ['white-theme', 'g-10', 'g-90', 'g-100'];
  const customPropertiesByTheme = themeNames.flatMap((themeName) => {
    const themeSelector =
      themeName === 'white-theme' ? ':root' : `.${themeName}`;
    const originalThemeName =
      themeName === 'white-theme' ? 'white' : themeName.replace('g-', 'g');

    // Get all token values for this theme
    const themeTokens = Object.entries(componentTokens)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([tokenName, themeValues]) => {
        const value = themeValues[originalThemeName];
        if (value !== undefined) {
          // Format the value properly for CSS
          let formattedValue = value;
          if (typeof value === 'string') {
            // Handle colors, strings, etc.
            formattedValue = value;
          }
          return t.SassValue(
            `  --#{config.$prefix}-${tokenName}: ${formattedValue};`
          );
        }
        return null;
      })
      .filter(Boolean);

    if (themeTokens.length === 0) {
      return [];
    }

    return [
      t.Newline(),
      t.Comment(`/ CSS Custom Properties for ${themeName}`),
      t.SassValue(`${themeSelector} {`),
      ...themeTokens,
      t.SassValue('}'),
    ];
  });

  return t.StyleSheet([
    FILE_BANNER,
    t.Newline(),
    ...imports,
    t.Newline(),

    // CSS Custom Properties
    t.Comment('/ CSS Custom Properties for component tokens'),
    t.Comment('/ These are scoped to theme-specific selectors'),
    ...customPropertiesByTheme,
    t.Newline(),

    // Sass Variables
    t.Comment('/ Sass variables (maps) for component tokens'),
    t.Comment('/ These contain theme-specific values'),
    ...variables,
  ]);
}

module.exports = buildDTCGComponentTokensFile;
