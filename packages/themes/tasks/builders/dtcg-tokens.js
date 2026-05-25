/**
 * Copyright IBM Corp. 2015, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Build DTCG-compliant token structure for a theme
 * This function takes a theme object and converts it to DTCG format
 * @param {object} theme - Theme object with token values
 * @param {string} themeName - Name of the theme (e.g., 'white', 'g10')
 * @returns {object} DTCG-formatted token structure
 */
function buildDTCGTokens(theme, themeName) {
  const dtcgTokens = {
    // DTCG metadata
    $schema:
      'https://design-tokens.github.io/community-group/format/schema.json',
    $description: `Carbon Design System ${themeName} theme tokens`,
    $version: '11.0.0',
  };

  // Token categories based on Carbon's token naming conventions
  const tokenCategories = {
    background: /^background/,
    layer: /^layer/,
    field: /^field/,
    border: /^border/,
    text: /^text/,
    link: /^link/,
    icon: /^icon/,
    support: /^support/,
    focus: /^focus/,
    skeleton: /^skeleton/,
    interactive: /^interactive/,
    highlight: /^highlight/,
    overlay: /^overlay/,
    toggle: /^toggle/,
    shadow: /^shadow/,
    ai: /^ai/,
    chat: /^chat/,
    syntax: /^syntax/,
    button: /^button/,
    tag: /^tag/,
    notification: /^notification/,
  };

  // Organize tokens by category
  const categorizedTokens = {};

  Object.entries(theme).forEach(([tokenName, tokenValue]) => {
    // Skip non-token exports (functions, objects that aren't simple values)
    if (typeof tokenValue === 'function' || tokenName === 'default') {
      return;
    }

    // Skip complex objects (like typography tokens for now)
    if (
      typeof tokenValue === 'object' &&
      tokenValue !== null &&
      !Array.isArray(tokenValue)
    ) {
      return;
    }

    // Find the category for this token
    let category = 'other';
    for (const [cat, pattern] of Object.entries(tokenCategories)) {
      if (pattern.test(tokenName)) {
        category = cat;
        break;
      }
    }

    // Initialize category if needed
    if (!categorizedTokens[category]) {
      categorizedTokens[category] = {};
    }

    // Determine token type based on value
    let tokenType = 'color';
    if (typeof tokenValue === 'string') {
      if (
        tokenValue.includes('rem') ||
        tokenValue.includes('px') ||
        tokenValue.includes('em')
      ) {
        tokenType = 'dimension';
      } else if (
        tokenName.includes('spacing') ||
        tokenName.includes('size') ||
        tokenName.includes('container')
      ) {
        tokenType = 'dimension';
      }
    }

    // Add token in DTCG format
    categorizedTokens[category][tokenName] = {
      $value: tokenValue,
      $type: tokenType,
      $description: `${tokenName} token from ${themeName} theme`,
    };
  });

  // Add categorized tokens to the output
  Object.entries(categorizedTokens).forEach(([category, tokens]) => {
    if (Object.keys(tokens).length > 0) {
      dtcgTokens[category] = tokens;
    }
  });

  return dtcgTokens;
}

/**
 * Build DTCG tokens for all themes including component tokens
 * @returns {object} Object with theme names as keys and DTCG tokens as values
 */
function buildAllDTCGTokens() {
  const allTokens = {};

  try {
    // Load the bundled lib file which contains all themes
    const themesLib = require('../../lib/index');

    // The lib exports white, g10, g90, g100 as named exports
    const themeNames = ['white', 'g10', 'g90', 'g100'];

    // Component token exports - buttonTokens is nested inside buttonTokens object
    const buttonComponentTokens = themesLib.buttonTokens?.buttonTokens || {};

    themeNames.forEach((themeName) => {
      if (themesLib[themeName]) {
        // Build base theme tokens
        const themeTokens = buildDTCGTokens(themesLib[themeName], themeName);

        // Add component tokens for this theme
        // Component tokens are organized by theme name (whiteTheme, g10, g90, g100)
        const themeKey = themeName === 'white' ? 'whiteTheme' : themeName;

        // Add button component tokens
        Object.entries(buttonComponentTokens).forEach(
          ([tokenName, tokenValues]) => {
            if (
              tokenValues &&
              typeof tokenValues === 'object' &&
              tokenValues[themeKey]
            ) {
              // Add to button category
              if (!themeTokens.button) {
                themeTokens.button = {};
              }
              themeTokens.button[tokenName] = {
                $value: tokenValues[themeKey],
                $type: 'color',
                $description: `${tokenName} component token from ${themeName} theme`,
              };
            }
          }
        );

        allTokens[themeName] = themeTokens;
      } else {
        console.error(`Theme ${themeName} not found in lib exports`);
      }
    });
  } catch (error) {
    console.error('Error loading themes from lib:', error.message);
  }

  return allTokens;
}

module.exports = {
  buildDTCGTokens,
  buildAllDTCGTokens,
};

// Made with Bob
