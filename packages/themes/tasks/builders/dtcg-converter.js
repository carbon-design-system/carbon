/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Resolve a DTCG color $value object to a CSS string.
 *
 * DTCG color values follow one of two shapes:
 *   • { colorSpace, components, hex }   → solid color  → use hex directly
 *   • { colorSpace, components, alpha } → alpha color  → rgba(r, g, b, alpha)
 *
 * @param {*} dtcgValue - The raw $value from a DTCG token
 * @returns {string|*} A CSS color string when the value is a DTCG color object,
 *                     or the original value unchanged for all other types.
 */
function resolveDTCGColorValue(dtcgValue) {
  if (
    dtcgValue === null ||
    typeof dtcgValue !== 'object' ||
    dtcgValue.colorSpace !== 'srgb' ||
    !Array.isArray(dtcgValue.components)
  ) {
    return dtcgValue;
  }

  // Solid color — hex fallback is present; use it directly.
  if (typeof dtcgValue.hex === 'string') {
    return dtcgValue.hex;
  }

  // Alpha color — convert sRGB components (0–1) to rgba().
  const [r, g, b] = dtcgValue.components.map((c) => Math.round(c * 255));
  const alpha = dtcgValue.alpha !== undefined ? dtcgValue.alpha : 1;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Convert DTCG format tokens to flat theme object
 * @param {Object} dtcgTokens - DTCG format token object
 * @returns {Object} Flat token map
 */
function convertDTCGToTheme(dtcgTokens) {
  const theme = {};

  // Extract color-scheme from top-level $extensions (DTCG metadata)
  const extensions = dtcgTokens.$extensions;
  if (extensions && extensions['com.ibm.carbon']) {
    const carbonExt = extensions['com.ibm.carbon'];
    if (carbonExt['color-scheme']) {
      theme['color-scheme'] = carbonExt['color-scheme'];
    }
  }

  function traverse(obj, path = []) {
    for (const [key, value] of Object.entries(obj)) {
      // Skip DTCG metadata keys
      if (key.startsWith('$')) {
        continue;
      }

      if (value && typeof value === 'object') {
        // Build token name from path.
        // Skip 'color' prefix EXCEPT for 'scheme' which should be 'color-scheme'
        let tokenPath = path;
        if (path[0] === 'color' && key !== 'scheme') {
          tokenPath = path.slice(1);
        }

        // Join all path segments and the current key with dashes.
        // The JS token metadata (v11TokenGroup.ts) is the naming authority:
        // it uses dashes before numbers, e.g. "layer-01", "field-hover-01",
        // "layer-accent-active-01". Pure-number keys ("01") in the JSON
        // become segments in the path and are joined the same way.
        const tokenPath2 = [...tokenPath, key];

        // If this node has a $value, register it as a token
        if (value.$value !== undefined) {
          theme[tokenPath2.join('-')] = resolveDTCGColorValue(value.$value);
        }

        // Also recurse into any non-$ children (a node can be both a token
        // and a group when nested themes use parent keys as token names too)
        const hasChildren = Object.keys(value).some((k) => !k.startsWith('$'));
        if (hasChildren) {
          traverse(value, tokenPath2);
        }
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
  resolveDTCGColorValue,
  convertDTCGToTheme,
  convertDTCGComponentTokens,
  camelToKebab,
  normalizeComponentThemeName,
};
