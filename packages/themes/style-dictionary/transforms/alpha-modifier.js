/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 *
 * Applies the `$extensions["org.carbon"].alphaModifier` field to theme tokens,
 * producing an `rgba()` string.
 *
 * Must run AFTER alias resolution (transitive: true) so that by the time this
 * transform fires, `token.value` is already the resolved hex string from the
 * palette (e.g. '#8d8d8d' for gray.50), not the raw alias '{gray.50}'.
 *
 * If no alphaModifier extension is present the token is passed through
 * unchanged (carbon/color-flatten will handle it next).
 *
 * Example in themes.json:
 *   "background-active": {
 *     "$type": "color",
 *     "$value": "{gray.50}",         ← resolved by SD to '#8d8d8d'
 *     "$extensions": {
 *       "org.carbon": { "alphaModifier": 0.5 }
 *     }
 *   }
 *   → 'rgba(141, 141, 141, 0.5)'
 */

module.exports = {
  name: 'carbon/alpha-modifier',
  type: 'value',
  transitive: true,
  filter(token) {
    const ext =
      token.$extensions?.['org.carbon'] ?? token.extensions?.['org.carbon'];
    return ext?.alphaModifier !== undefined;
  },
  transform(token) {
    const ext =
      token.$extensions?.['org.carbon'] ?? token.extensions?.['org.carbon'];
    const alpha = ext.alphaModifier;

    // SD v5: post-alias value is in token.$value (resolved object or hex string).
    // In the golden-master test, token.value holds the pre-resolved hex string.
    const resolved = token.value !== undefined ? token.value : token.$value;
    const hex =
      typeof resolved === 'string'
        ? resolved
        : typeof resolved === 'object' && resolved?.hex
          ? resolved.hex
          : null;

    if (!hex || !hex.startsWith('#') || hex.length < 7) {
      // Fallback: if resolution hasn't happened yet, return unchanged and let
      // the transitive pass retry.
      return token.value ?? token.$value;
    }

    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  },
};
