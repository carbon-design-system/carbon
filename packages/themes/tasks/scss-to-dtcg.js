/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Parse SCSS theme map to extract tokens
 * @param {string} scssContent - SCSS file content
 * @param {string} themeName - Name of the theme (e.g., 'g10')
 * @returns {Object} Token map
 */
function parseScssTheme(scssContent, themeName) {
  const tokens = {};

  // Find the theme map - it ends with ") !default;"
  const themeRegex = new RegExp(
    `\\$${themeName}:\\s*\\([\\s\\S]+?\\)\\s*!default;`,
    'm'
  );
  const match = scssContent.match(themeRegex);

  if (!match) {
    throw new Error(`Could not find theme $${themeName} in SCSS`);
  }

  const themeContent = match[0];

  // Extract token: value pairs
  // Match: token-name: value, where value can contain parentheses (for rgba/rgb)
  const lines = themeContent.split('\n');

  for (const line of lines) {
    // Match pattern: "  token-name: value,"
    const match = line.match(/^\s*([a-z0-9-]+):\s*(.+?),?\s*$/);
    if (!match) continue;

    const [, key, value] = match;
    let cleanValue = value.trim().replace(/,$/, ''); // Remove trailing comma

    // Handle string.unquote() calls
    if (cleanValue.includes('string.unquote')) {
      const unquoteMatch = cleanValue.match(/string\.unquote\('([^']+)'\)/);
      if (unquoteMatch) {
        cleanValue = unquoteMatch[1];
      }
    }

    // Skip if it's a reference to another variable or utilities
    if (!cleanValue.startsWith('$') && !cleanValue.includes('utilities.')) {
      tokens[key] = cleanValue;
    }
  }

  return tokens;
}

/**
 * Convert token map to DTCG JSON structure
 * @param {Object} tokens - Flat token map
 * @param {string} themeName - Theme name
 * @param {string} colorScheme - 'light' or 'dark'
 * @returns {Object} DTCG JSON
 */
function tokensToDTCG(tokens, themeName, colorScheme) {
  const dtcg = {
    $schema: 'https://tr.designtokens.org/format/',
    $description: `${themeName} theme - ${colorScheme === 'light' ? 'Light' : 'Dark'} theme`,
    color: {},
  };

  for (const [key, value] of Object.entries(tokens)) {
    const parts = key.split('-');
    let current = dtcg.color;

    // Navigate/create nested structure
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }

    // Add the token
    const tokenName = parts[parts.length - 1];
    current[tokenName] = {
      $type: 'color',
      $value: value,
      $description: `${key} token`,
    };
  }

  return dtcg;
}

// Read the generated SCSS file
const scssPath = path.join(
  __dirname,
  '..',
  'scss',
  'generated',
  '_themes.scss'
);
const scssContent = fs.readFileSync(scssPath, 'utf8');

// Convert each theme
const themes = [
  { name: 'g10', scheme: 'light' },
  { name: 'g90', scheme: 'dark' },
  { name: 'g100', scheme: 'dark' },
];

for (const { name, scheme } of themes) {
  try {
    const tokens = parseScssTheme(scssContent, name);
    const dtcg = tokensToDTCG(tokens, name, scheme);

    const outputPath = path.join(
      __dirname,
      '..',
      'src',
      'dtcg',
      `${name}.json`
    );
    fs.writeFileSync(outputPath, JSON.stringify(dtcg, null, 2) + '\n');

    console.log(
      `✓ Generated ${name}.json (${Object.keys(tokens).length} tokens)`
    );
  } catch (error) {
    console.error(`✗ Failed to generate ${name}.json:`, error.message);
  }
}

console.log('\n✅ Theme files generated successfully!');
