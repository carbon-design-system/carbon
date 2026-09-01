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
 * Input — one token node with no $value but a per-theme map in extensions.
 * Two equivalent forms are accepted:
 *
 *   Component-token form (legacy, bare strings + separate alphaModifiers):
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
 *   Unified theme-token form (value + alpha co-located per theme):
 *   "background": {
 *     "hover": {
 *       "$type": "color",
 *       "$extensions": {
 *         "carbon.themes": {
 *           "white": { "value": "{gray.50}", "alpha": 0.12 },
 *           "g10":   { "value": "{gray.50}", "alpha": 0.12 },
 *           "g90":   "{gray.50}",
 *           "g100":  "{gray.50}"
 *         }
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

        // Preserve original JSON key order (important for 'fallback' position).
        // Each entry in carbon.themes is either:
        //   - a bare string/alias  → { "white": "{red.80}" }   (legacy component form)
        //   - an object { value, alpha? } → unified theme form where value and
        //     alpha are co-located under the same theme key.
        // The legacy separate "org.carbon.alphaModifiers" map is still supported
        // for backwards-compat with existing component token files.
        for (const [theme, themeEntry] of Object.entries(carbonThemes)) {
          const isObject =
            themeEntry !== null &&
            typeof themeEntry === 'object' &&
            !Array.isArray(themeEntry);
          const themeValue = isObject ? themeEntry.value : themeEntry;
          // Per-theme alpha: prefer co-located entry.alpha, fall back to legacy
          // separate alphaModifiers map.
          const alpha = isObject ? themeEntry.alpha : alphaModifiers[theme];
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

        // Build the expanded node: preserve DTCG metadata, add _by_theme, and
        // recurse into any non-$ children (dual-role nodes in themes.json have
        // both a carbon.themes value AND group children like `active`, `hover`).
        const expandedNode = {
          ...(value.$type ? { $type: value.$type } : {}),
          ...(value.$description ? { $description: value.$description } : {}),
          // _by_theme is a DTCG group — each child is a leaf token with $value
          _by_theme: byTheme,
        };
        for (const [childKey, childValue] of Object.entries(value)) {
          if (childKey.startsWith('$') || childKey === '_by_theme') continue;
          if (!childValue || typeof childValue !== 'object') continue;
          // Wrap in a single-key object so walk() sees the key and can apply
          // the carbon.themes expansion logic to it (walk iterates the entries
          // of the object passed in, so childValue alone would skip expansion).
          expandedNode[childKey] = walk({ [childKey]: childValue })[childKey];
        }
        out[key] = expandedNode;
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
