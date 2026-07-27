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
 * All tokens in @carbon/colors are fully opaque oklch values — there are no
 * alpha variants in the palette itself (alpha mixing happens at the theme
 * level). Those alpha-mixed theme tokens are NOT part of the palette and are
 * not generated here.
 *
 * OKLCH is the source of truth (GitHub #22660).
 * Every palette entry carries:
 *   - $value.hex      — derived from oklch via culori (for downstream consumers)
 *   - $value.components — sRGB components derived from oklch
 *   - $extensions['org.carbon'].oklch — { l, c, h } stored at full precision
 *
 * dtcg-converter.js reads $value.hex for CSS output.  When Phase 4/5 ships
 * oklch() to browsers, dtcg-converter will switch to reading $extensions['org.carbon'].oklch
 * instead — zero change required to this file.
 */

const fs = require('fs-extra');
const path = require('path');
const { converter, formatHex } = require('culori');

// culori converters — instantiated once at module load.
//const toOklch = converter('oklch');
const toRgb = converter('rgb');

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

// Regex for parsing oklch() strings produced by @carbon/colors.
// Matches: oklch(L C H)  — three space-separated floats, no alpha.
const OKLCH_RE = /^oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)$/;

/**
 * Parse an oklch() string from @carbon/colors into { l, c, h }.
 * Returns null for anything that isn't an oklch string (plain hex, objects…).
 *
 * @param {string} value  e.g. "oklch(0.5692 0.2174 25.93)"
 * @returns {{ l: number, c: number, h: number } | null}
 */
function parseOklchString(value) {
  if (typeof value !== 'string') return null;
  const m = value.match(OKLCH_RE);
  if (!m) return null;
  return { l: +m[1], c: +m[2], h: +m[3] };
}

/**
 * Convert an oklch { l, c, h } object to a 7-character lowercase hex string.
 *
 * @param {{ l: number, c: number, h: number }} oklch
 * @returns {string}  e.g. "#0f62fe"
 */
function oklchToHex({ l, c, h }) {
  return formatHex({ mode: 'oklch', l, c, h });
}

/**
 * Convert an oklch { l, c, h } object to sRGB component array (0–1, 6 d.p.).
 *
 * @param {{ l: number, c: number, h: number }} oklch
 * @returns {[number, number, number]}
 */
function oklchToComponents({ l, c, h }) {
  const rgb = toRgb({ mode: 'oklch', l, c, h });
  const round = (n) => Math.round(Math.max(0, Math.min(1, n)) * 1e6) / 1e6;
  return [round(rgb.r), round(rgb.g), round(rgb.b)];
}

/**
 * Build the DTCG $value object for a solid (fully opaque) color.
 * Both hex and sRGB components are derived from the oklch source values.
 *
 * @param {{ l: number, c: number, h: number }} oklch
 * @returns {{ colorSpace: string, components: number[], hex: string }}
 */
function solidColorValue(oklch) {
  return {
    colorSpace: 'srgb',
    components: oklchToComponents(oklch),
    hex: oklchToHex(oklch),
  };
}

/**
 * Parse a flat camelCase export name from @carbon/colors into
 * { family, scale } so we can nest it in the output JSON.
 *
 * Returns null for anything that isn't a scalar oklch color string (group
 * objects, duplicate aliases like black100 / white0, etc.).
 *
 * @param {string} name   - export name, e.g. "blue60", "blue60Hover", "black"
 * @param {string} value  - resolved value (must be an oklch() string)
 * @returns {{ family: string, scale: string } | null}
 */
function parseToken(name, value) {
  if (!parseOklchString(value)) {
    // Not an oklch scalar — skip group objects, non-color exports, etc.
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

    const oklch = parseOklchString(value);

    output[family][scale] = {
      $type: 'color',
      $value: solidColorValue(oklch),
      $description: `${family} ${scale}`,
      $extensions: {
        'org.carbon': {
          // Full-precision oklch values — the source of truth.
          // dtcg-converter currently reads $value.hex for CSS output.
          // Phase 4/5: switch dtcg-converter to emit oklch() here instead.
          oklch,
        },
      },
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
