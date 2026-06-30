/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Migrates theme and component DTCG JSON files to reference color-palette.json
 * aliases instead of embedding raw color values.
 *
 * Transformation rules
 * ─────────────────────
 * Theme token $value shapes:
 *
 *   BEFORE (solid)  { colorSpace:"srgb", components:[r,g,b], hex:"#rrggbb" }
 *   AFTER           "{family.scale}"
 *
 *   BEFORE (alpha)  { colorSpace:"srgb", components:[r,g,b], alpha:0.x }
 *   AFTER           { colorSpace:"srgb", color:"{family.scale}", alpha:0.x }
 *
 *   NO MATCH        kept exactly as-is (one-off bespoke values)
 *
 * Component token $extensions.carbon.themes per-theme values:
 *
 *   BEFORE (solid hex)   "#rrggbb"
 *   AFTER                "{family.scale}"
 *
 *   BEFORE (rgba string) "rgb(141 141 141 / 30%)" | "rgba(r,g,b,a)"
 *   AFTER                { colorSpace:"srgb", color:"{family.scale}", alpha:a }
 *
 *   NO MATCH             kept exactly as-is
 */

const fs = require('fs-extra');
const path = require('path');

// ---------------------------------------------------------------------------
// Build reverse-lookup: hex string → DTCG alias reference string
// ---------------------------------------------------------------------------

/**
 * Load color-palette.json and return a Map<hex, aliasRef> where aliasRef is
 * e.g. "{blue.60}".  If a hex appears under multiple family/scale combos only
 * the first encountered is kept (duplicates are canonical aliases like
 * black100 === black which we already filtered in the generator).
 *
 * @returns {Map<string, string>}
 */
function buildHexToAliasMap() {
  const palettePath = path.resolve(
    __dirname,
    '../../src/dtcg/color-palette.json'
  );
  const palette = JSON.parse(fs.readFileSync(palettePath, 'utf8'));

  const map = new Map();

  for (const [family, scales] of Object.entries(palette)) {
    if (family.startsWith('$')) continue;
    for (const [scale, token] of Object.entries(scales)) {
      if (token.$value && token.$value.hex) {
        const hex = token.$value.hex.toLowerCase();
        if (!map.has(hex)) {
          map.set(hex, `{${family}.${scale}}`);
        }
      }
    }
  }

  return map;
}

// ---------------------------------------------------------------------------
// Component sRGB float → hex helpers (for alpha $value reverse-lookup)
// ---------------------------------------------------------------------------

/**
 * Convert sRGB float components [0–1] to a lowercase hex string "#rrggbb".
 * @param {number[]} components
 * @returns {string}
 */
function componentsToHex(components) {
  return (
    '#' +
    components
      .map((c) =>
        Math.round(c * 255)
          .toString(16)
          .padStart(2, '0')
      )
      .join('')
  );
}

/**
 * Parse a CSS rgba / "rgb(r g b / a%)" string into { r, g, b, alpha }.
 * Returns null if the string is not a recognised rgba pattern.
 *
 * Handles both legacy syntax: rgba(141, 141, 141, 0.3)
 * and modern syntax:          rgb(141 141 141 / 30%)
 *
 * @param {string} str
 * @returns {{ r:number, g:number, b:number, alpha:number } | null}
 */
function parseRgbaString(str) {
  if (typeof str !== 'string') return null;

  // Legacy: rgba(r, g, b, a)
  let m = str.match(
    /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)$/i
  );
  if (m) {
    return {
      r: parseInt(m[1], 10),
      g: parseInt(m[2], 10),
      b: parseInt(m[3], 10),
      alpha: m[4] !== undefined ? parseFloat(m[4]) : 1,
    };
  }

  // Modern: rgb(r g b / a%)  or  rgb(r g b / a)
  m = str.match(/^rgba?\(\s*(\d+)\s+(\d+)\s+(\d+)\s*\/\s*([\d.]+)(%?)\s*\)$/i);
  if (m) {
    const raw = parseFloat(m[4]);
    const alpha = m[5] === '%' ? raw / 100 : raw;
    return {
      r: parseInt(m[1], 10),
      g: parseInt(m[2], 10),
      b: parseInt(m[3], 10),
      alpha,
    };
  }

  return null;
}

// ---------------------------------------------------------------------------
// $value transformers
// ---------------------------------------------------------------------------

/**
 * Try to replace a theme token's $value with a palette alias.
 *
 * For alpha tokens the $value becomes the plain alias string (spec-compliant)
 * and we return the alpha separately so the walker can store it in $extensions.
 *
 * Returns one of:
 *   { $value: newValue }                         — solid alias or no-match
 *   { $value: aliasString, alpha: number }       — alpha with palette match
 *
 * @param {*}                  rawValue  - current $value object
 * @param {Map<string,string>} hexMap
 * @returns {{ $value: *, alpha?: number }}
 */
function transformThemeValue(rawValue, hexMap) {
  if (
    !rawValue ||
    typeof rawValue !== 'object' ||
    rawValue.colorSpace !== 'srgb'
  ) {
    return { $value: rawValue };
  }

  // Solid color — has hex property
  if (typeof rawValue.hex === 'string') {
    const alias = hexMap.get(rawValue.hex.toLowerCase());
    return { $value: alias || rawValue };
  }

  // Alpha color — components encode the base color
  if (rawValue.alpha !== undefined && Array.isArray(rawValue.components)) {
    const baseHex = componentsToHex(rawValue.components);
    const alias = hexMap.get(baseHex);
    if (alias) {
      // $value becomes the plain alias string; alpha goes to $extensions
      return { $value: alias, alpha: rawValue.alpha };
    }
    // No palette match — keep baked-in form unchanged
    return { $value: rawValue };
  }

  return { $value: rawValue };
}

/**
 * Try to replace a component token's per-theme extension value.
 *
 * For rgba strings where the base color is in the palette, returns
 *   { value: aliasString, alpha: number }
 * so the walker can promote alpha into a separate alpha-modifier extension.
 *
 * For solid hex, returns { value: aliasString } or { value: original }.
 *
 * @param {*}                  raw
 * @param {Map<string,string>} hexMap
 * @returns {{ value: *, alpha?: number }}
 */
function transformComponentValue(raw, hexMap) {
  if (typeof raw !== 'string') return { value: raw };

  // Solid hex
  if (raw.startsWith('#')) {
    const alias = hexMap.get(raw.toLowerCase());
    return { value: alias || raw };
  }

  // rgba / rgb string
  const parsed = parseRgbaString(raw);
  if (parsed) {
    const baseHex =
      '#' +
      [parsed.r, parsed.g, parsed.b]
        .map((c) => c.toString(16).padStart(2, '0'))
        .join('');
    const alias = hexMap.get(baseHex);
    if (alias) {
      return { value: alias, alpha: parsed.alpha };
    }
  }

  return { value: raw };
}

// ---------------------------------------------------------------------------
// File walkers
// ---------------------------------------------------------------------------

/**
 * Recursively walk a theme token object and transform every $value in-place.
 * For alpha+alias tokens also writes the alpha into
 * $extensions["com.ibm.carbon"]["alphaModifier"] so the $value stays
 * spec-compliant (a plain alias string) and the alpha is still machine-readable.
 *
 * @param {object}             obj
 * @param {Map<string,string>} hexMap
 */
function walkTheme(obj, hexMap) {
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    if (value && typeof value === 'object') {
      if (value.$value !== undefined) {
        const result = transformThemeValue(value.$value, hexMap);
        value.$value = result.$value;
        if (result.alpha !== undefined) {
          // Store alpha modifier in extensions — keeps $value spec-compliant
          if (!value.$extensions) value.$extensions = {};
          if (!value.$extensions['com.ibm.carbon'])
            value.$extensions['com.ibm.carbon'] = {};
          value.$extensions['com.ibm.carbon'].alphaModifier = result.alpha;
        }
      }
      // Recurse — a node may be both a token and a group
      walkTheme(value, hexMap);
    }
  }
}

/**
 * Recursively walk a component token object and transform every
 * $extensions.carbon.themes value in-place.
 * For rgba values whose base color is in the palette, stores the alpha in a
 * parallel $extensions["com.ibm.carbon"]["alphaModifiers"][theme] map.
 *
 * @param {object}             obj
 * @param {Map<string,string>} hexMap
 */
function walkComponent(obj, hexMap) {
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    if (value && typeof value === 'object') {
      if (value.$extensions && value.$extensions['carbon.themes']) {
        const themes = value.$extensions['carbon.themes'];
        for (const [theme, themeValue] of Object.entries(themes)) {
          const result = transformComponentValue(themeValue, hexMap);
          themes[theme] = result.value;
          if (result.alpha !== undefined) {
            // Store per-theme alpha modifiers in $extensions["com.ibm.carbon"]["alphaModifiers"]
            if (!value.$extensions['com.ibm.carbon'])
              value.$extensions['com.ibm.carbon'] = {};
            if (!value.$extensions['com.ibm.carbon'].alphaModifiers)
              value.$extensions['com.ibm.carbon'].alphaModifiers = {};
            value.$extensions['com.ibm.carbon'].alphaModifiers[theme] =
              result.alpha;
          }
        }
      }
      // Recurse
      walkComponent(value, hexMap);
    }
  }
}

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

/**
 * Migrate all theme and component DTCG JSON files to use color-palette.json
 * aliases.  Rewrites files in-place and returns an array of written paths.
 *
 * @returns {string[]}
 */
function migrateToColorAliases() {
  const hexMap = buildHexToAliasMap();

  const dtcgDir = path.resolve(__dirname, '../../src/dtcg');
  const written = [];

  // Theme files
  for (const themeName of ['white', 'g10', 'g90', 'g100']) {
    const filePath = path.join(dtcgDir, `${themeName}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    walkTheme(data, hexMap);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    written.push(filePath);
  }

  // Component token files
  for (const componentName of [
    'button',
    'tag',
    'notification',
    'status',
    'content-switcher',
  ]) {
    const filePath = path.join(dtcgDir, 'components', `${componentName}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    walkComponent(data, hexMap);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    written.push(filePath);
  }

  return written;
}

module.exports = migrateToColorAliases;
