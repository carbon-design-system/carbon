/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Palette alias resolution
// ---------------------------------------------------------------------------

/**
 * Lazily-loaded map of DTCG alias reference → hex string.
 * e.g. "{blue.60}" → "#0f62fe"
 * Built once from color-palette.json on first use.
 * @type {Map<string, string> | null}
 */
let _paletteAliasMap = null;

/**
 * Return the alias→hex map, building it from color-palette.json on first call.
 * @returns {Map<string, string>}
 */
function getPaletteAliasMap() {
  if (_paletteAliasMap) return _paletteAliasMap;

  const palettePath = path.resolve(
    __dirname,
    '../../src/dtcg/color-palette.json'
  );
  const palette = JSON.parse(fs.readFileSync(palettePath, 'utf8'));

  _paletteAliasMap = new Map();
  for (const [family, scales] of Object.entries(palette)) {
    if (family.startsWith('$')) continue;
    for (const [scale, token] of Object.entries(scales)) {
      if (token.$value && token.$value.hex) {
        _paletteAliasMap.set(`{${family}.${scale}}`, token.$value.hex);
      }
    }
  }

  return _paletteAliasMap;
}

/**
 * Resolve a DTCG alias reference string like "{blue.60}" to its hex value.
 * Returns null if the reference is not found in the palette.
 *
 * @param {string} ref - e.g. "{blue.60}"
 * @returns {string|null}
 */
function resolveAliasRef(ref) {
  return getPaletteAliasMap().get(ref) ?? null;
}

// ---------------------------------------------------------------------------
// $value resolver
// ---------------------------------------------------------------------------

/**
 * Resolve a DTCG color $value to a CSS color string.
 *
 * Handles all shapes produced by this codebase:
 *
 *   1. Alias string          "{blue.60}"
 *      → looked up in color-palette.json → "#0f62fe"
 *
 *   2. Alias + alpha object  { colorSpace:"srgb", color:"{gray.50}", alpha:0.5 }
 *      → alias resolved to hex, hex parsed to rgb channels → "rgba(r, g, b, a)"
 *
 *   3. Solid inline object   { colorSpace:"srgb", components:[…], hex:"#rrggbb" }
 *      → hex used directly (bespoke one-off values not in palette)
 *
 *   4. Alpha inline object   { colorSpace:"srgb", components:[…], alpha:0.x }
 *      → components converted to rgb channels → "rgba(r, g, b, a)"
 *
 *   5. Anything else         returned unchanged
 *
 * @param {*} dtcgValue - The raw $value from a DTCG token
 * @returns {string|*}
 */
function resolveDTCGColorValue(dtcgValue) {
  // ── Shape 1: plain alias string ──────────────────────────────────────────
  if (typeof dtcgValue === 'string') {
    if (dtcgValue.startsWith('{') && dtcgValue.endsWith('}')) {
      const hex = resolveAliasRef(dtcgValue);
      if (hex) return hex;
    }
    return dtcgValue;
  }

  // NOTE: alias+alpha is NOT handled here — it requires the sibling $extensions
  // context which the caller (convertDTCGToTheme / convertDTCGComponentTokens)
  // must supply. See resolveWithExtensions() below.

  if (dtcgValue === null || typeof dtcgValue !== 'object') {
    return dtcgValue;
  }

  if (dtcgValue.colorSpace !== 'srgb') {
    return dtcgValue;
  }

  // ── Shapes 2 & 3: inline components array ────────────────────────────────
  if (!Array.isArray(dtcgValue.components)) {
    return dtcgValue;
  }

  // Shape 2: solid — hex present
  if (typeof dtcgValue.hex === 'string') {
    return dtcgValue.hex;
  }

  // Shape 3: alpha — derive rgba from components
  const [r, g, b] = dtcgValue.components.map((c) => Math.round(c * 255));
  const alpha = dtcgValue.alpha !== undefined ? dtcgValue.alpha : 1;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Resolve a token node's $value together with its sibling $extensions.
 * When a plain alias $value is accompanied by an alphaModifier extension,
 * this produces the rgba() string that the inline baked-in form used to give.
 *
 * @param {*}      dtcgValue   - the token's $value
 * @param {object} extensions  - the token's $extensions (may be undefined)
 * @returns {string|*}
 */
function resolveWithExtensions(dtcgValue, extensions) {
  const alphaModifier =
    extensions &&
    extensions['com.ibm.carbon'] &&
    extensions['com.ibm.carbon'].alphaModifier;

  if (alphaModifier !== undefined) {
    // $value must be a palette alias string — resolve it then apply alpha
    const hex = resolveAliasRef(dtcgValue);
    if (hex) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alphaModifier})`;
    }
  }

  return resolveDTCGColorValue(dtcgValue);
}

/**
 * Resolve a component token's per-theme value together with its sibling
 * alphaModifiers extension entry for that theme.
 *
 * @param {*}      themeValue      - value from carbon.themes[theme]
 * @param {object} extensions      - the token node's $extensions
 * @param {string} theme           - theme key (e.g. "white", "g90")
 * @returns {string|*}
 */
function resolveComponentValueWithExtensions(themeValue, extensions, theme) {
  const alphaModifiers =
    extensions &&
    extensions['com.ibm.carbon'] &&
    extensions['com.ibm.carbon'].alphaModifiers;

  const alpha = alphaModifiers && alphaModifiers[theme];

  if (alpha !== undefined) {
    // themeValue is now a plain alias string
    const hex = resolveAliasRef(themeValue);
    if (hex) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  }

  return resolveDTCGColorValue(themeValue);
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

        // If this node has a $value, register it as a token.
        // Pass $extensions so alphaModifier is applied when present.
        if (value.$value !== undefined) {
          theme[tokenPath2.join('-')] = resolveWithExtensions(
            value.$value,
            value.$extensions
          );
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
        // Resolve alias strings, applying per-theme alphaModifiers when present.
        const rawThemes = value.$extensions['carbon.themes'];
        const resolvedThemes = {};
        for (const [themeName, themeValue] of Object.entries(rawThemes)) {
          resolvedThemes[themeName] = resolveComponentValueWithExtensions(
            themeValue,
            value.$extensions,
            themeName
          );
        }
        componentTokens[tokenName] = resolvedThemes;
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
  resolveWithExtensions,
  resolveComponentValueWithExtensions,
  convertDTCGToTheme,
  convertDTCGComponentTokens,
  camelToKebab,
  normalizeComponentThemeName,
};
