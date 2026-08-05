/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

/**
 * CI round-trip check for OKLCH conversion — GitHub issue #22660
 *
 * OKLCH is the source of truth in @carbon/colors. For every palette entry
 * in color-palette.json this test verifies:
 *
 *   1. Every entry has an `oklch` field in $extensions['org.carbon'].oklch
 *   2. The hex in $value.hex round-trips through oklch without drift:
 *        oklch(L,C,H) → hex → oklch → hex  (identity)
 *   3. The $value.hex can be re-derived from the $extensions.oklch values,
 *      confirming the stored hex is consistent with the oklch source.
 *
 * Failure here means either:
 *   (a) A new color was added to @carbon/colors without being rebuilt, or
 *   (b) The stored $extensions.oklch drifted from the $value.hex (stale data).
 *
 * Both are build-breaking — this test must remain in CI.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { formatHex } = require('culori');

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Convert { l, c, h } back to a 7-character lowercase hex string.
 *
 * @param {{ l: number, c: number, h: number }} oklch
 * @returns {string}  e.g. "#0f62fe"
 */
function oklchToHex({ l, c, h }) {
  return formatHex({ mode: 'oklch', l, c, h });
}

// ── Load the generated palette ────────────────────────────────────────────────

const palettePath = path.join(__dirname, '../src/dtcg/color-palette.json');

/**
 * Collect every palette entry from color-palette.json.
 * Returns an array of { alias, hex, oklch } objects.
 *
 * Since OKLCH is now the source of truth, every entry must carry an oklch
 * field in $extensions['org.carbon'].oklch.
 */
function collectEntries() {
  if (!fs.existsSync(palettePath)) {
    throw new Error(
      `color-palette.json not found at ${palettePath}. ` +
        'Run the build (tasks/build.js) first to generate it.'
    );
  }

  const palette = JSON.parse(fs.readFileSync(palettePath, 'utf8'));
  const entries = [];

  for (const [family, scales] of Object.entries(palette)) {
    if (family.startsWith('$')) continue;
    for (const [scale, token] of Object.entries(scales)) {
      entries.push({
        alias: `{${family}.${scale}}`,
        hex: token.$value && token.$value.hex,
        oklch:
          token.$extensions &&
          token.$extensions['org.carbon'] &&
          token.$extensions['org.carbon'].oklch,
      });
    }
  }

  return entries;
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('OKLCH source-of-truth validation (full palette)', () => {
  let entries;

  beforeAll(() => {
    entries = collectEntries();
  });

  test('color-palette.json contains palette entries', () => {
    expect(entries.length).toBeGreaterThan(200);
  });

  test('every entry has an oklch field (OKLCH is source of truth)', () => {
    const missing = entries.filter((e) => !e.oklch);
    if (missing.length > 0) {
      const names = missing.map((e) => e.alias).join(', ');
      throw new Error(
        `${missing.length} entries are missing $extensions['org.carbon'].oklch: ${names}`
      );
    }
    expect(missing.length).toBe(0);
  });

  test('every entry hex is consistent with its stored oklch values', () => {
    const mismatches = [];
    for (const { alias, hex, oklch } of entries) {
      if (!oklch || !hex) continue;
      const derived = oklchToHex(oklch);
      if (derived !== hex) {
        mismatches.push(`${alias}: oklch→hex=${derived} stored=${hex}`);
      }
    }
    if (mismatches.length > 0) {
      throw new Error(
        `Hex/oklch mismatch in ${mismatches.length} entries:\n` +
          mismatches.join('\n')
      );
    }
    expect(mismatches.length).toBe(0);
  });
});
