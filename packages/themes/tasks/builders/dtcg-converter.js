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

/**
 * Normalize theme names to match Carbon's SCSS naming convention for component tokens
 * This ensures compatibility with @carbon/styles which expects specific theme key names
 * @param {string} themeName - Theme name from DTCG (e.g., "white", "g10", "g90", "g100")
 * @returns {string} Normalized theme name (e.g., "white-theme", "g-10", "g-90", "g-100")
 */
function normalizeComponentThemeName(themeName) {
  // Convert "white" to "white-theme" to match existing convention
  if (themeName === 'white') {
    return 'white-theme';
  }

  // Convert "g10", "g90", "g100" to "g-10", "g-90", "g-100"
  // This matches the format expected by @carbon/styles component token lookups
  if (/^g\d+$/.test(themeName)) {
    return themeName.replace(/^g(\d+)$/, 'g-$1');
  }

  // For any other theme names, apply camelToKebab
  return camelToKebab(themeName);
}

module.exports = {
  convertDTCGToTheme,
  convertDTCGComponentTokens,
  camelToKebab,
  normalizeComponentThemeName,
};
