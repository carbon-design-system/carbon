/**
 * Copyright IBM Corp. 2015, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { types: t } = require('@carbon/scss-generator');
const { FILE_BANNER } = require('./shared');

/**
 * Convert a DTCG token value to SCSS format
 * @param {*} value - The token value
 * @param {string} type - The token type
 * @returns {string} SCSS-formatted value
 */
function formatScssValue(value, type) {
  if (type === 'color') {
    // Return color values as-is (hex, rgb, rgba)
    return value;
  }

  if (type === 'dimension') {
    // Return dimension values as-is (rem, px, etc.)
    return value;
  }

  // Default: return as string
  return value;
}

/**
 * Convert camelCase to kebab-case, handling numbers properly
 * @param {string} str - camelCase string
 * @returns {string} kebab-case string
 */
function camelToKebab(str) {
  return (
    str
      // Insert dash before capital letters
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      // Insert dash before numbers that follow letters
      .replace(/([a-z])([0-9])/g, '$1-$2')
      .toLowerCase()
  );
}

/**
 * Flatten nested DTCG token structure into flat key-value pairs
 * Uses the original Carbon token naming (from JS exports)
 * @param {object} tokens - DTCG token object
 * @param {string} prefix - Current prefix for nested tokens
 * @returns {object} Flat token object
 */
function flattenTokens(tokens, prefix = '') {
  const flat = {};

  for (const [key, value] of Object.entries(tokens)) {
    // Skip DTCG metadata fields
    if (key.startsWith('$')) {
      continue;
    }

    // For nested structures, we need to extract the actual token name
    // The DTCG structure groups tokens by category, but the actual token
    // names in Carbon are the leaf node names

    // Check if this is a token definition (has $value)
    if (value && typeof value === 'object' && '$value' in value) {
      // Use the key as-is, which should be the original token name
      // Convert camelCase to kebab-case to match Carbon convention
      const tokenName = camelToKebab(key);
      flat[tokenName] = {
        value: value.$value,
        type: value.$type,
        description: value.$description,
      };
    } else if (value && typeof value === 'object') {
      // Recursively flatten nested tokens without adding prefix
      // This preserves the original token names
      Object.assign(flat, flattenTokens(value, prefix));
    }
  }

  return flat;
}

/**
 * Build SCSS file from DTCG tokens
 * @param {object} dtcgTokens - DTCG token structure
 * @param {string} themeName - Name of the theme
 * @returns {object} SCSS AST
 */
function buildScssFromDTCG(dtcgTokens, themeName) {
  const flatTokens = flattenTokens(dtcgTokens);

  const variables = [];

  // Sort tokens alphabetically for consistency
  const sortedTokens = Object.entries(flatTokens).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  sortedTokens.forEach(([tokenName, tokenData]) => {
    variables.push(
      t.Newline(),
      t.Comment(`/ ${tokenData.description || tokenName}`),
      t.Assignment({
        id: t.Identifier(tokenName),
        init: t.SassValue(formatScssValue(tokenData.value, tokenData.type)),
        default: false,
      })
    );
  });

  return t.StyleSheet([
    // Preamble
    FILE_BANNER,
    t.Newline(),
    t.Comment(`/ DTCG-generated tokens for ${themeName} theme`),
    t.Comment(`/ Generated from: tokens/${themeName}.json`),
    t.Newline(),

    // Variables
    ...variables,
  ]);
}

/**
 * Build SCSS files from all DTCG token files
 * @param {string} tokensDir - Directory containing DTCG token JSON files
 * @returns {object} Object with theme names as keys and SCSS AST as values
 */
function buildAllScssFromDTCG(tokensDir) {
  const fs = require('fs-extra');
  const path = require('path');
  const allScss = {};

  const themes = ['white', 'g10', 'g90', 'g100'];

  themes.forEach((themeName) => {
    const tokenFile = path.join(tokensDir, `${themeName}.json`);

    if (fs.existsSync(tokenFile)) {
      const dtcgTokens = fs.readJsonSync(tokenFile);
      allScss[themeName] = buildScssFromDTCG(dtcgTokens, themeName);
    } else {
      console.error(`DTCG token file not found: ${tokenFile}`);
    }
  });

  return allScss;
}

module.exports = {
  buildScssFromDTCG,
  buildAllScssFromDTCG,
  flattenTokens,
};

// Made with Bob
