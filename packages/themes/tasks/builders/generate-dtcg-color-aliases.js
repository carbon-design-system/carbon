/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Generates src/dtcg/color-palette.json from @carbon/colors.
 *
 * The output is a DTCG-compliant token file where every color swatch from the
 * Carbon palette is nested inside its color family group, e.g.:
 *
 *   {
 *     "$schema": "https://tr.designtokens.org/format/",
 *     "blue": {
 *       "60":      { "$type": "color", "$value": { "colorSpace": "srgb", "components": [...], "hex": "#0f62fe" } },
 *       "60Hover": { "$type": "color", "$value": { "colorSpace": "srgb", "components": [...], "hex": "#0050e6" } },
 *       ...
 *     }
 *   }
 *
 * The $value shape matches what white.json / g10.json use:
 *   - Solid colors:  { colorSpace, components (0–1 floats), hex }
 *
 * All tokens in @carbon/colors are fully opaque hex values — there are no
 * alpha variants in the palette itself (alpha mixing happens at the theme
 * level, e.g. backgroundActive = adjustAlpha(gray50, 0.5)). Those alpha-mixed
 * theme tokens are NOT part of the palette and are not generated here.
 *
 * Theme and component token files can reference palette entries as DTCG
 * aliases, e.g.:  "$value": "{blue.60}"
 *
 * This script is self-contained and only depends on @carbon/colors, which is
 * a listed runtime dependency of @carbon/themes.
 */

const fs = require('fs-extra');
const path = require('path');

// Color families exported from @carbon/colors. Order matches the source file.
const COLOR_FAMILIES = [
  'black',
  'white',
  'yellow',
  'orange',
  'red',
  'magenta',
  'purple',
  'blue',
  'cyan',
  'teal',
  'green',
  'coolGray',
  'gray',
  'warmGray',
];

/**
 * Convert a hex color string to sRGB component array (values 0–1, 6 d.p.).
 * @param {string} hex  e.g. "#0f62fe"
 * @returns {[number, number, number]}
 */
function hexToComponents(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const round = (n) => Math.round((n / 255) * 1e6) / 1e6;
  return [round(r), round(g), round(b)];
}

/**
 * Build the DTCG $value object for a solid (fully opaque) color, matching the
 * shape used throughout white.json / g10.json etc.
 *
 * @param {string} hex
 * @returns {{ colorSpace: string, components: number[], hex: string }}
 */
function solidColorValue(hex) {
  return {
    colorSpace: 'srgb',
    components: hexToComponents(hex),
    hex,
  };
}

/**
 * Parse a flat camelCase export name from @carbon/colors into
 * { family, scale } so we can nest it in the output JSON.
 *
 * Returns null for anything that isn't a scalar hex color (group objects,
 * duplicate aliases like black100 / white0, etc.).
 *
 * @param {string} name   - export name, e.g. "blue60", "blue60Hover", "black"
 * @param {string} value  - resolved value (must start with "#" to be included)
 * @returns {{ family: string, scale: string } | null}
 */
function parseToken(name, value) {
  if (typeof value !== 'string' || !value.startsWith('#')) {
    return null;
  }

  for (const family of COLOR_FAMILIES) {
    if (!name.startsWith(family)) {
      continue;
    }

    const rest = name.slice(family.length); // e.g. "60", "60Hover", "", "Hover"

    // Skip group-object exports (bare family name) and duplicate aliases:
    //   black100 === black, white0 === white — keep only the canonical entry.
    if (rest === '100' && family === 'black') continue; // black100 duplicate
    if (rest === '0' && family === 'white') continue; // white0 duplicate

    // Scale key used as the JSON property name under the family group.
    // bare "black" / "white" get the key "default"; others keep their suffix
    // as-is (e.g. "60", "60Hover", "Hover").
    const scale = rest === '' ? 'default' : rest;

    return { family, scale };
  }

  return null;
}

/**
 * Generate src/dtcg/color-palette.json from @carbon/colors exports.
 * Returns the absolute path of the written file.
 *
 * @returns {string}
 */
function generateDTCGColorAliases() {
  // Require the CJS build — works at build time without a transpiler step.
  const colors = require('@carbon/colors');  

  const output = {
    $schema: 'https://tr.designtokens.org/format/',
    $description:
      'Carbon color palette in DTCG format. Generated from @carbon/colors — do not edit by hand.',
  };

  for (const [name, value] of Object.entries(colors)) {
    const parsed = parseToken(name, value);
    if (!parsed) {
      continue;
    }

    const { family, scale } = parsed;

    if (!output[family]) {
      output[family] = {};
    }

    output[family][scale] = {
      $type: 'color',
      $value: solidColorValue(value),
      $description: `${family} ${scale}`,
    };
  }

  const outputPath = path.resolve(
    __dirname,
    '../../src/dtcg/color-palette.json'
  );

  fs.ensureDirSync(path.dirname(outputPath));
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + '\n', 'utf8');

  return outputPath;
}

module.exports = generateDTCGColorAliases;
