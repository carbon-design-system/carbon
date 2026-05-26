/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const path = require('path');

// Import the theme files
const white = require('../src/white.js');
const g10 = require('../src/g10.js');
const g90 = require('../src/g90.js');
const g100 = require('../src/g100.js');

/**
 * Convert a JS theme object to DTCG JSON format
 * @param {Object} theme - Theme object from JS file
 * @param {string} themeName - Name of the theme
 * @param {string} colorScheme - 'light' or 'dark'
 * @returns {Object} DTCG format JSON
 */
function convertThemeToDTCG(theme, themeName, colorScheme) {
  const dtcg = {
    $schema: 'https://tr.designtokens.org/format/',
    $description: `${themeName} theme - ${colorScheme === 'light' ? 'Light' : 'Dark'} theme`,
    color: {
      scheme: {
        $type: 'string',
        $value: colorScheme,
        $description: 'Color scheme identifier for the theme',
      },
    },
  };

  // Group tokens by category
  const categories = {
    background: [],
    layer: [],
    field: [],
    border: [],
    text: [],
    link: [],
    icon: [],
    support: [],
    focus: [],
    interactive: [],
    highlight: [],
    overlay: [],
    'toggle-off': [],
    shadow: [],
    skeleton: [],
    syntax: [],
    ai: [],
    chat: [],
  };

  // Categorize all tokens
  for (const [key, value] of Object.entries(theme)) {
    // Skip non-color tokens (type and layout are imported from other packages)
    if (
      key.startsWith('caption') ||
      key.startsWith('label') ||
      key.startsWith('helper') ||
      key.startsWith('body') ||
      key.startsWith('code') ||
      key.startsWith('heading') ||
      key.startsWith('productive') ||
      key.startsWith('expressive') ||
      key.startsWith('quotation') ||
      key.startsWith('display') ||
      key.startsWith('spacing') ||
      key.startsWith('fluid') ||
      key.startsWith('container') ||
      key.startsWith('size') ||
      (key.startsWith('icon') && key.includes('Size')) ||
      key.startsWith('layout')
    ) {
      continue;
    }

    // Determine category
    let category = null;
    if (key.startsWith('background')) category = 'background';
    else if (key.startsWith('layer')) category = 'layer';
    else if (key.startsWith('field')) category = 'field';
    else if (key.startsWith('border')) category = 'border';
    else if (key.startsWith('text')) category = 'text';
    else if (key.startsWith('link')) category = 'link';
    else if (key.startsWith('icon')) category = 'icon';
    else if (key.startsWith('support')) category = 'support';
    else if (key.startsWith('focus')) category = 'focus';
    else if (key === 'interactive') category = 'interactive';
    else if (key === 'highlight') category = 'highlight';
    else if (key === 'overlay') category = 'overlay';
    else if (key === 'toggleOff') category = 'toggle-off';
    else if (key === 'shadow') category = 'shadow';
    else if (key.startsWith('skeleton')) category = 'skeleton';
    else if (key.startsWith('syntax')) category = 'syntax';
    else if (key.startsWith('ai')) category = 'ai';
    else if (key.startsWith('chat')) category = 'chat';

    if (category && typeof value === 'string') {
      categories[category].push({ key, value });
    }
  }

  // Build DTCG structure
  for (const [, tokens] of Object.entries(categories)) {
    if (tokens.length === 0) continue;

    // Convert camelCase to kebab-case and build nested structure
    for (const { key, value } of tokens) {
      const parts = key
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .split('-')
        .filter(Boolean);

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
  }

  return dtcg;
}

// Convert all themes
const themes = [
  { name: 'white', data: white, scheme: 'light' },
  { name: 'g10', data: g10, scheme: 'light' },
  { name: 'g90', data: g90, scheme: 'dark' },
  { name: 'g100', data: g100, scheme: 'dark' },
];

for (const { name, data, scheme } of themes) {
  const dtcg = convertThemeToDTCG(data, name, scheme);
  const outputPath = path.join(__dirname, '..', 'src', 'dtcg', `${name}.json`);

  fs.writeFileSync(outputPath, JSON.stringify(dtcg, null, 2) + '\n');
  console.log(`✓ Generated ${name}.json`);
}

console.log('\n✅ All theme files generated successfully!');
