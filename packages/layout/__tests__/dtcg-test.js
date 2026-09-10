/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

/**
 * DTCG round-trip tests.
 *
 * Verifies that every token in src/dtcg/layout.json is correctly resolved
 * by the Style Dictionary pipeline and present in both the JS and Sass
 * generated outputs with the expected resolved value.
 *
 * The converter logic under test:
 *   - "miniUnits": $value (grid steps) × 8 ÷ 16 → rem string
 *   - "rem":       $value (px) ÷ 16 → rem string
 *   - (none):      $value passed through as-is
 */

import { SassRenderer } from '@carbon/test-utils/scss';
import dtcg from '../src/dtcg/layout.json';

const { render } = SassRenderer.create(__dirname);

const BASE_FONT_SIZE = 16;
const MINI_UNIT = 8;

/**
 * Apply the same converter logic as the SD formats so the test is
 * independent of the generated files — it derives expected values
 * directly from the JSON.
 */
function resolveExpected(value, carbonLayout) {
  const converter = carbonLayout?.converter;
  if (converter === 'miniUnits') {
    return `${(Number(value) * MINI_UNIT) / BASE_FONT_SIZE}rem`;
  }
  if (converter === 'rem') {
    return `${Number(value) / BASE_FONT_SIZE}rem`;
  }
  // Unitless zero is preserved as the number 0 in JS exports.
  if (value === '0' || value === 0) return 0;
  return String(value);
}

// Build test cases from the grouped DTCG JSON — one entry per leaf token.
// Structure: { groupName: { $description, tokenName: { $type, $value, ... } } }
const testCases = [];
for (const [groupKey, groupVal] of Object.entries(dtcg)) {
  if (groupKey.startsWith('$')) continue; // skip $schema, $description
  for (const [tokenKey, tokenDef] of Object.entries(groupVal)) {
    if (tokenKey.startsWith('$')) continue; // skip $description on group
    const carbonLayout = tokenDef.$extensions?.['carbon.layout'];
    const expected = resolveExpected(tokenDef.$value, carbonLayout);
    testCases.push([tokenKey, expected]);
  }
}

// ── JS round-trip ─────────────────────────────────────────────────────────────

describe('DTCG → JS round-trip', () => {
  it.each(testCases)(
    'token `%s` resolves to correct JS value',
    async (tokenName, expected) => {
      // Import dynamically from the compiled lib so we get the real runtime value.
      const mod = await import('../lib/index.js');

      // Convert kebab-case token name to camelCase to look up the JS export.
      const camelName = tokenName.replace(/-([a-z0-9])/g, (_, ch) =>
        ch.toUpperCase()
      );

      expect(mod[camelName]).toBe(expected);
    }
  );
});

// ── Sass round-trip ───────────────────────────────────────────────────────────

describe('DTCG → Sass round-trip', () => {
  it.each(testCases)(
    'token `%s` resolves to correct Sass variable value',
    async (tokenName, expected) => {
      // Sass represents 0 as the number 0, not the string "0".
      const sassExpected = expected === 0 ? 0 : expected;

      const { get } = await render(`
        @use 'sass:map';
        @use 'sass:meta';
        @use '../index.scss' as layout;

        $variables: meta.module-variables('layout');
        $key: get('key', map.has-key($variables, '${tokenName}'));
        $value: get('value', map.get($variables, '${tokenName}'));
      `);

      expect(get('key').value).toBe(true);
      expect(get('value').value).toBe(sassExpected);
    }
  );
});
