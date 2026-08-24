/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const fs = require('fs');
const path = require('path');

const DTCG_DIR = path.resolve(__dirname, '../src/dtcg');
const THEME_FILES = ['white.json', 'g10.json', 'g90.json', 'g100.json'];

/**
 * Recursively flatten a DTCG token tree into a map of dot-separated token
 * paths to their leaf token objects (objects that have a $type key).
 * Non-token keys (prefixed with $) are skipped when building the path.
 */
function flattenTokens(obj, prefix = '') {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    // Skip all DTCG metadata keys — $type, $value, $description, $extensions,
    // $schema, etc. This also means composite color objects (which appear as
    // $value: { colorSpace, components, hex }) are never visited as nodes.
    if (key.startsWith('$')) {
      continue;
    }
    const tokenPath = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      if ('$type' in value) {
        result[tokenPath] = value;
      }
      Object.assign(result, flattenTokens(value, tokenPath));
    }
  }
  return result;
}

const themes = THEME_FILES.map((file) => ({
  name: file.replace('.json', ''),
  tokens: flattenTokens(
    JSON.parse(fs.readFileSync(path.join(DTCG_DIR, file), 'utf8'))
  ),
}));

const allTokenPaths = [
  ...new Set(themes.flatMap(({ tokens }) => Object.keys(tokens))),
].sort();

describe('DTCG cross-theme token parity', () => {
  describe('structural conventions — theme JSON follows DTCG nesting rules', () => {
    test.each(themes)(
      '$name theme keys are strictly nested without hyphens',
      ({ tokens }) => {
        // In DTCG theme files, token segments must be nested objects rather than
        // hyphenated strings (e.g. `layer.accent.active.03`, not `layer-accent-active-03`).
        for (const tokenPath of Object.keys(tokens)) {
          const segments = tokenPath.split('.');
          for (const segment of segments) {
            expect(segment).not.toMatch(/-/);
            expect(segment).toMatch(/^[a-z0-9]+$/);
          }
        }
      }
    );

    test.each(themes)(
      '$name theme has valid $description on every token',
      ({ tokens }) => {
        for (const [tokenPath, token] of Object.entries(tokens)) {
          expect(token['$description']).toBeDefined();
          expect(typeof token['$description']).toBe('string');
          expect(token['$description'].trim().length).toBeGreaterThan(0);
        }
      }
    );
  });

  describe('token presence — every token exists in all four themes', () => {
    test.each(allTokenPaths)('%s', (tokenPath) => {
      for (const { name, tokens } of themes) {
        expect(Object.keys(tokens)).toContain(tokenPath);
      }
    });
  });

  describe('$type consistency — every token has the same $type across themes', () => {
    test.each(allTokenPaths)('%s', (tokenPath) => {
      const types = themes
        .filter(({ tokens }) => tokenPath in tokens)
        .map(({ name, tokens }) => `${name}: ${tokens[tokenPath]['$type']}`);

      const uniqueTypes = [
        ...new Set(
          themes
            .filter(({ tokens }) => tokenPath in tokens)
            .map(({ tokens }) => tokens[tokenPath]['$type'])
        ),
      ];
      expect(uniqueTypes).toHaveLength(1);
    });
  });

  describe('$description consistency — every token has the same $description across themes', () => {
    test.each(allTokenPaths)('%s', (tokenPath) => {
      const descriptions = themes
        .filter(({ tokens }) => tokenPath in tokens)
        .map(({ name, tokens }) => ({
          name,
          description: tokens[tokenPath]['$description'],
        }));

      const uniqueDescriptions = [
        ...new Set(descriptions.map((d) => d.description)),
      ];

      if (uniqueDescriptions.length > 1) {
        const detail = descriptions
          .map((d) => `  ${d.name}: ${JSON.stringify(d.description)}`)
          .join('\n');
        throw new Error(
          `Token "${tokenPath}" has mismatched $description across themes:\n${detail}`
        );
      }
    });
  });
});
