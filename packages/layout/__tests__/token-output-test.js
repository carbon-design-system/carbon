/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

/**
 * Token round-trip tests.
 *
 * Verifies that every token in tokens/layout.tokens.json is present in both
 * the JS and Sass generated outputs with the expected CSS value:
 *   - dimension: `{ value, unit }` → "<value><unit>"
 *   - number:    the number, followed by the `com.ibm.carbon` layout unit
 *                when one is set
 */

import { SassRenderer } from '@carbon/test-utils/scss';
import tokens from '../tokens/layout.tokens.json';

const { render } = SassRenderer.create(__dirname);

/**
 * Derive the expected value directly from the JSON so the test is
 * independent of the Style Dictionary formats.
 */
function resolveExpected(token) {
  const { $value } = token;
  if (typeof $value === 'object') {
    return `${$value.value}${$value.unit}`;
  }
  const unit = token.$extensions?.['com.ibm.carbon']?.layout?.unit;
  // Unitless zero is preserved as the number 0 in JS exports.
  return unit ? `${$value}${unit}` : $value;
}

// Build test cases from the grouped token JSON — one entry per leaf token.
// Structure: { groupName: { $description, tokenName: { $type, $value, ... } } }
const testCases = [];
for (const [groupKey, groupVal] of Object.entries(tokens)) {
  if (groupKey.startsWith('$')) continue; // skip $schema, $description
  for (const [tokenKey, tokenDef] of Object.entries(groupVal)) {
    if (tokenKey.startsWith('$')) continue; // skip $description on group
    testCases.push([tokenKey, resolveExpected(tokenDef)]);
  }
}

// ── JS round-trip ─────────────────────────────────────────────────────────────

describe('tokens → JS round-trip', () => {
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

describe('tokens → Sass round-trip', () => {
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
