/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Preprocessor: carbon/component-tokens
 *
 * Expands the `$extensions["carbon.themes"]` multi-theme shape that component
 * token files (button.json, tag.json, …) use into flat per-theme tokens that
 * Style Dictionary can process natively.
 *
 * Input — one token node with no $value but a per-theme map in extensions:
 *
 *   "button": {
 *     "danger-active": {
 *       "$type": "color",
 *       "$extensions": {
 *         "carbon.themes": { "white": "{red.80}", "g10": "{red.80}", ... },
 *         "org.carbon": { "alphaModifiers": { "g90": 0.3, "g100": 0.3 } }
 *       }
 *     }
 *   }
 *
 * Output — one flat sibling token per theme, keyed as
 * `<tokenPath>-_by_theme-<themeName>` so the format functions can reconstruct
 * the original token name and theme:
 *
 *   "button": {
 *     "danger-active": {
 *       "_by_theme": {
 *         "white":  { "$type": "color", "$value": "{red.80}" },
 *         "g10":    { "$type": "color", "$value": "{red.80}" },
 *         "g90":    { "$type": "color", "$value": "{red.80}",
 *                     "$extensions": { "org.carbon": { "alphaModifier": 0.3 } } },
 *         "g100":   { "$type": "color", "$value": "{red.80}",
 *                     "$extensions": { "org.carbon": { "alphaModifier": 0.3 } } }
 *       }
 *     }
 *   }
 *
 * SD v5 walks DTCG token trees and treats any node with a `$value` as a leaf
 * token. The `_by_theme.<themeName>` nodes each have `$value`, so SD resolves
 * aliases and applies transforms on them individually.
 *
 * The format functions identify these tokens by the `-_by_theme-` infix in
 * their flattened name (using the `name/kebab` transform).
 *
 * Tokens that already carry a top-level $value are left untouched.
 *
 * @param {object} dictionary  Raw DTCG token tree passed by SD
 * @returns {object}           Expanded token tree
 */
function carbonComponentTokensPreprocessor(dictionary) {
  function walk(node) {
    if (!node || typeof node !== 'object') return node;

    const out = {};

    for (const [key, value] of Object.entries(node)) {
      if (key.startsWith('$')) {
        out[key] = value;
        continue;
      }

      if (!value || typeof value !== 'object') {
        out[key] = value;
        continue;
      }

      const carbonThemes = value.$extensions?.['carbon.themes'];
      const alphaModifiers =
        value.$extensions?.['org.carbon']?.alphaModifiers ?? {};

      // Only expand nodes that have carbon.themes and NO existing $value.
      if (carbonThemes && value.$value === undefined) {
        const byTheme = {};

        // Preserve original JSON key order (important for 'fallback' position)
        for (const [theme, themeValue] of Object.entries(carbonThemes)) {
          const alpha = alphaModifiers[theme];
          const syntheticNode = {
            $type: value.$type ?? 'color',
            $value: themeValue,
          };
          if (alpha !== undefined) {
            syntheticNode.$extensions = {
              'org.carbon': { alphaModifier: alpha },
            };
          }
          byTheme[theme] = syntheticNode;
        }

        out[key] = {
          ...(value.$type ? { $type: value.$type } : {}),
          ...(value.$description ? { $description: value.$description } : {}),
          // _by_theme is a DTCG group — each child is a leaf token with $value
          _by_theme: byTheme,
        };
      } else {
        // Recurse into nested groups
        out[key] = walk(value);
      }
    }

    return out;
  }

  return walk(dictionary);
}

module.exports = {
  name: 'carbon/component-tokens',
  preprocessor: carbonComponentTokensPreprocessor,
};
