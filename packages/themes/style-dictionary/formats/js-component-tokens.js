/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Emits the ES module for one component, with one export per token holding
 * its value in every theme, or its companion TypeScript declarations.
 */

const { FILE_BANNER, kebabToCamel, toSource } = require('./js');

/**
 * Normalize a theme name to the JS API convention.
 * 'white' → 'whiteTheme', 'g10' → 'g10' (no dash, unlike SCSS convention)
 * @param {string} theme
 * @returns {string}
 */
function normalizeThemeKey(theme) {
  if (theme === 'white') return 'whiteTheme';
  return theme;
}

/**
 * @param {Array<{ name: string, values: Record<string, string> }>} tokens
 * @param {'js' | 'dts'} output
 * @returns {string}
 */
function jsComponentTokens(tokens, output) {
  const lines = tokens.map(({ name, values }) => {
    const camelName = kebabToCamel(name);
    const themes = Object.keys(values);

    if (output === 'dts') {
      const props = themes
        .map((theme) => `  ${normalizeThemeKey(theme)}: string`)
        .join(';\n');
      return `export declare const ${camelName}: {\n${props};\n};`;
    }

    const props = themes
      .map(
        (theme) => `  ${normalizeThemeKey(theme)}: ${toSource(values[theme])}`
      )
      .join(',\n');
    return `export const ${camelName} = {\n${props},\n};`;
  });

  return [FILE_BANNER, ...lines].join('\n') + '\n';
}

module.exports = jsComponentTokens;
