/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Preprocessor: carbon/theme-metadata
 *
 * Extracts the `$extensions["org.carbon"]["color-scheme"]` value that lives
 * at the top level of each theme JSON file (white.json, g10.json, etc.) and
 * injects it as a synthetic `color-scheme` token, so the SCSS format can
 * include it in the theme Sass map alongside the regular color tokens.
 *
 * Input (top-level of white.json):
 *
 *   {
 *     "$extensions": { "org.carbon": { "color-scheme": "light" } },
 *     "background": { "$type": "color", "$value": "{white.default}" },
 *     ...
 *   }
 *
 * Output (additional synthetic token injected):
 *
 *   {
 *     ...original tokens...,
 *     "color": {
 *       "scheme": {
 *         "$type": "other",
 *         "$value": "light"
 *       }
 *     }
 *   }
 *
 * The key path `color.scheme` mirrors the structure that dtcg-converter.js
 * already maps to the token name `color-scheme` (because the converter joins
 * path segments with dashes).  The format functions receive a flat resolved
 * map and simply look up `color-scheme`.
 *
 * @param {object} dictionary  Style Dictionary raw token tree
 * @returns {object}
 */
function carbonThemeMetadataPreprocessor(dictionary) {
  const colorScheme = dictionary.$extensions?.['org.carbon']?.['color-scheme'];

  if (!colorScheme) {
    return dictionary;
  }

  // Inject as color.scheme so the flattened token name becomes 'color-scheme',
  // matching what dtcg-converter.js produces today.
  return {
    ...dictionary,
    color: {
      ...(dictionary.color ?? {}),
      scheme: {
        $type: 'other',
        $value: colorScheme,
        $description: 'Color scheme of this theme (light or dark)',
      },
    },
  };
}

module.exports = {
  name: 'carbon/theme-metadata',
  preprocessor: carbonThemeMetadataPreprocessor,
};
