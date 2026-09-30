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
const THEMES_FILE = path.join(DTCG_DIR, 'themes.json');
const THEME_NAMES = ['white', 'g10', 'g90', 'g100'];

/**
 * Recursively collect every leaf token path in the unified themes.json.
 * A leaf is any node that has a $type key (regardless of whether it also
 * has non-$ children — i.e. dual-role nodes count as leaves).
 * Paths are dot-separated, skipping $ keys.
 *
 * For the unified file each leaf carries $extensions["carbon.themes"] instead
 * of a $value, so we look for $type as the leaf indicator.
 */
function flattenTokenPaths(obj, prefix = '') {
  const result = [];
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    const tokenPath = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      if ('$type' in value) {
        result.push(tokenPath);
      }
      result.push(...flattenTokenPaths(value, tokenPath));
    }
  }
  return result;
}

/**
 * Return the token node at the given dot-separated path inside obj.
 */
function getAt(obj, tokenPath) {
  return tokenPath
    .split('.')
    .reduce((node, key) => (node ? node[key] : undefined), obj);
}

const themes = JSON.parse(fs.readFileSync(THEMES_FILE, 'utf8'));

// Collect every token path that has a $type
const allTokenPaths = [...new Set(flattenTokenPaths(themes))].sort();

describe('DTCG unified themes.json structural conventions', () => {
  test('file exists and has expected top-level structure', () => {
    expect(themes.$schema).toBeDefined();
    expect(themes.$description).toBeDefined();
    // spot-check a few top-level groups
    expect(themes.background).toBeDefined();
    expect(themes.layer).toBeDefined();
    expect(themes.text).toBeDefined();
  });

  test('keys are strictly nested without hyphens (DTCG nesting rules)', () => {
    for (const tokenPath of allTokenPaths) {
      const segments = tokenPath.split('.');
      for (const segment of segments) {
        expect(segment).not.toMatch(/-/);
      }
    }
  });

  test('every token has a valid $description', () => {
    for (const tokenPath of allTokenPaths) {
      const token = getAt(themes, tokenPath);
      expect(token['$description']).toBeDefined();
      expect(typeof token['$description']).toBe('string');
      expect(token['$description'].trim().length).toBeGreaterThan(0);
    }
  });

  test('every token has a $type', () => {
    for (const tokenPath of allTokenPaths) {
      const token = getAt(themes, tokenPath);
      expect(token['$type']).toBeDefined();
    }
  });
});

describe('DTCG unified themes.json — per-theme value coverage', () => {
  test.each(allTokenPaths)(
    '%s has a carbon.themes entry for all four themes',
    (tokenPath) => {
      const token = getAt(themes, tokenPath);
      const carbonThemes = token.$extensions?.['carbon.themes'];
      expect(carbonThemes).toBeDefined();
      for (const themeName of THEME_NAMES) {
        expect(Object.keys(carbonThemes)).toContain(themeName);
      }
    }
  );

  test.each(allTokenPaths)(
    '%s carbon.themes entries have valid value fields',
    (tokenPath) => {
      const token = getAt(themes, tokenPath);
      const carbonThemes = token.$extensions?.['carbon.themes'];
      for (const [themeName, entry] of Object.entries(carbonThemes)) {
        if (themeName === 'fallback') continue; // some component tokens have a fallback key
        if (entry === null || entry === undefined) {
          throw new Error(
            `Token "${tokenPath}" theme "${themeName}" has null/undefined entry`
          );
        }
        // Entry is either:
        //   - a bare string alias/hex
        //   - a composite color object { colorSpace, components, hex } (bare, no alpha)
        //   - a { value, alpha? } wrapper object
        const isBareComposite =
          typeof entry === 'object' && entry !== null && 'hex' in entry;
        const value = isBareComposite
          ? entry
          : typeof entry === 'object' && !Array.isArray(entry)
            ? entry.value
            : entry;
        // Value must be a non-empty string (alias or hex) or a composite color object
        const valid =
          !!(typeof value === 'string' && value.trim().length > 0) ||
          !!(typeof value === 'object' && value !== null && value.hex);
        expect(valid).toBe(true);
      }
    }
  );

  test.each(allTokenPaths)(
    '%s alpha entries are numbers when present',
    (tokenPath) => {
      const token = getAt(themes, tokenPath);
      const carbonThemes = token.$extensions?.['carbon.themes'];
      for (const [, entry] of Object.entries(carbonThemes)) {
        if (typeof entry === 'object' && entry !== null && 'alpha' in entry) {
          expect(typeof entry.alpha).toBe('number');
        }
      }
    }
  );
});
