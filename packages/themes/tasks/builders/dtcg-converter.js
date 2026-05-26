/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Convert DTCG format tokens to flat theme object
 * @param {Object} dtcgTokens - DTCG format token object
 * @returns {Object} Flat token map
 */
function convertDTCGToTheme(dtcgTokens) {
  const theme = {};

  function traverse(obj, path = []) {
    for (const [key, value] of Object.entries(obj)) {
      // Skip DTCG metadata keys
      if (key.startsWith('$')) {
        continue;
      }

      // If this is a token (has $value)
      if (value && typeof value === 'object' && value.$value !== undefined) {
        // Build token name from path
        // Skip 'color' prefix EXCEPT for 'scheme' which should be 'color-scheme'
        let tokenPath = path;
        if (path[0] === 'color' && key !== 'scheme') {
          tokenPath = path.slice(1);
        }
        // Normalize key: add dash before numbers (e.g., "heading1" -> "heading-1")
        const normalizedKey = key.replace(/([a-z])(\d)/g, '$1-$2');
        const tokenName = [...tokenPath, normalizedKey].join('-');
        theme[tokenName] = value.$value;
      } else if (value && typeof value === 'object') {
        // Recurse into nested groups
        traverse(value, [...path, key]);
      }
    }
  }

  traverse(dtcgTokens);
  return theme;
}

/**
 * Convert DTCG component tokens to theme-specific format
 * @param {Object} dtcgTokens - DTCG component tokens
 * @returns {Object} Component tokens by theme
 */
function convertDTCGComponentTokens(dtcgTokens) {
  const componentTokens = {};

  function traverse(obj, path = []) {
    for (const [key, value] of Object.entries(obj)) {
      // Skip DTCG metadata keys except $extensions
      if (key.startsWith('$') && key !== '$extensions') {
        continue;
      }

      // If this has theme-specific values in extensions
      if (
        value &&
        typeof value === 'object' &&
        value.$extensions &&
        value.$extensions['carbon.themes']
      ) {
        const tokenName = [...path, key].join('-');
        componentTokens[tokenName] = value.$extensions['carbon.themes'];
      } else if (value && typeof value === 'object' && !key.startsWith('$')) {
        // Recurse into nested groups
        traverse(value, [...path, key]);
      }
    }
  }

  traverse(dtcgTokens);
  return componentTokens;
}

/**
 * Convert camelCase to kebab-case
 * @param {string} str
 * @returns {string}
 */
function camelToKebab(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

module.exports = {
  convertDTCGToTheme,
  convertDTCGComponentTokens,
  camelToKebab,
};
