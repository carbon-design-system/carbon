/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

const fs = require('fs');
const path = require('path');

const dtcgTokens = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../src/dtcg/motion.json'), 'utf8')
);

// ---------------------------------------------------------------------------
// Shared helpers — derived entirely from motion.json, never hardcoded
// ---------------------------------------------------------------------------

/**
 * Walk the DTCG token tree and collect all leaf tokens that have a $value.
 * Returns a flat array of { name, type, value, description }.
 */
function collectTokens(obj, pathSegments = []) {
  const results = [];
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    const segments = [...pathSegments, key];
    if (value && typeof value === 'object' && value.$value !== undefined) {
      results.push({
        name: segments.join('-'),
        type: value.$type,
        value: value.$value,
        description: value.$description,
      });
    } else if (value && typeof value === 'object') {
      results.push(...collectTokens(value, segments));
    }
  }
  return results;
}

/** "duration-fast-01" → "durationFast01" */
function toCamelCase(name) {
  return name.replace(/-([a-z0-9])/gi, (_, ch) => ch.toUpperCase());
}

/**
 * Derive the V10 alias name from a V11 camelCase duration token name.
 * "durationFast01" → "fast01"
 */
function toV10Name(camel) {
  return (
    camel.charAt('duration'.length).toLowerCase() +
    camel.slice('duration'.length + 1)
  );
}

/** Resolve a DTCG duration $value { value, unit } to a CSS string e.g. "70ms" */
function resolveDuration(dtcgValue) {
  return `${dtcgValue.value}${dtcgValue.unit}`;
}

/** Resolve a DTCG cubicBezier $value array to a CSS string */
function resolveEasing(dtcgValue) {
  return `cubic-bezier(${dtcgValue.join(', ')})`;
}

// ---------------------------------------------------------------------------
// Derived token sets — single source of truth for all assertions below
// ---------------------------------------------------------------------------

const allTokens = collectTokens(dtcgTokens);
const durationTokens = allTokens.filter((t) => t.name.startsWith('duration-'));
const easingTokens = allTokens.filter((t) => t.name.startsWith('easing-'));

// V11 camelCase names derived from the JSON  e.g. ["durationFast01", ...]
const v11Names = durationTokens.map((t) => toCamelCase(t.name));

// V10 alias names derived from V11 names  e.g. ["fast01", ...]
const v10Names = v11Names.map(toV10Name);

// Sass V10 kebab names derived from V11 token names  e.g. ["fast-01", ...]
const sassV10Names = durationTokens.map((t) =>
  t.name.replace(/^duration-/, '')
);

// ---------------------------------------------------------------------------

describe('@carbon/motion — DTCG token file (src/dtcg/motion.json)', () => {
  test('has the correct $schema', () => {
    expect(dtcgTokens.$schema).toBe('https://tr.designtokens.org/format/');
  });

  test('has at least one duration token', () => {
    expect(durationTokens.length).toBeGreaterThan(0);
  });

  test('has at least one easing token', () => {
    expect(easingTokens.length).toBeGreaterThan(0);
  });

  test('all duration tokens have $type "duration"', () => {
    for (const token of durationTokens) {
      expect(token.type).toBe('duration');
    }
  });

  test('all easing tokens have $type "cubicBezier"', () => {
    for (const token of easingTokens) {
      expect(token.type).toBe('cubicBezier');
    }
  });

  test('all duration token $values are DTCG duration objects { value, unit }', () => {
    for (const token of durationTokens) {
      expect(token.value).toMatchObject({ unit: 'ms' });
      expect(typeof token.value.value).toBe('number');
      expect(token.value.value).toBeGreaterThan(0);
    }
  });

  test('all easing token $values are arrays of exactly 4 numbers', () => {
    for (const token of easingTokens) {
      expect(Array.isArray(token.value)).toBe(true);
      expect(token.value).toHaveLength(4);
      for (const n of token.value) {
        expect(typeof n).toBe('number');
      }
    }
  });

  test('all tokens have a non-empty $description', () => {
    for (const token of allTokens) {
      expect(typeof token.description).toBe('string');
      expect(token.description.length).toBeGreaterThan(0);
    }
  });
});

// ---------------------------------------------------------------------------

describe('@carbon/motion — every DTCG token generates a JS export', () => {
  const CarbonMotion = require('../src');

  test('every duration token in the JSON has a matching V11 JS export with the correct value', () => {
    for (const token of durationTokens) {
      const camel = toCamelCase(token.name);
      expect(CarbonMotion).toHaveProperty(camel);
      expect(CarbonMotion[camel]).toBe(resolveDuration(token.value));
    }
  });

  test('every duration token in the JSON has a matching V10 alias JS export with the correct value', () => {
    for (const token of durationTokens) {
      const v10 = toV10Name(toCamelCase(token.name));
      expect(CarbonMotion).toHaveProperty(v10);
      expect(CarbonMotion[v10]).toBe(resolveDuration(token.value));
    }
  });

  test('every easing token in the JSON appears in the JS easings map with the correct value', () => {
    for (const token of easingTokens) {
      // "easing-standard-productive" → name="standard", mode="productive"
      const [, easingName, mode] = token.name.split('-');
      expect(CarbonMotion.easings).toHaveProperty(easingName);
      expect(CarbonMotion.easings[easingName]).toHaveProperty(mode);
      expect(CarbonMotion.easings[easingName][mode]).toBe(
        resolveEasing(token.value)
      );
    }
  });

  test('every V11 duration name is in unstable_tokens', () => {
    const tokenList = [...CarbonMotion.unstable_tokens];
    for (const camel of v11Names) {
      expect(tokenList).toContain(camel);
    }
  });

  test('every V10 alias name is in unstable_tokens', () => {
    const tokenList = [...CarbonMotion.unstable_tokens];
    for (const v10 of v10Names) {
      expect(tokenList).toContain(v10);
    }
  });

  test('unstable_tokens has exactly one entry per V11 token and one per V10 alias', () => {
    const tokenList = [...CarbonMotion.unstable_tokens];
    expect(tokenList).toHaveLength(v11Names.length + v10Names.length);
  });

  test('V10 aliases point to their V11 canonical values', () => {
    for (let i = 0; i < v11Names.length; i++) {
      expect(CarbonMotion[v10Names[i]]).toBe(CarbonMotion[v11Names[i]]);
    }
  });

  test('V11 names appear before V10 names in unstable_tokens', () => {
    const tokenList = [...CarbonMotion.unstable_tokens];
    const lastV11Index = Math.max(...v11Names.map((n) => tokenList.indexOf(n)));
    const firstV10Index = Math.min(
      ...v10Names.map((n) => tokenList.indexOf(n))
    );
    expect(lastV11Index).toBeLessThan(firstV10Index);
  });
});

// ---------------------------------------------------------------------------

describe('@carbon/motion — every DTCG token generates a Sass variable', () => {
  const scssSource = fs.readFileSync(
    path.resolve(__dirname, '../scss/generated/_tokens.scss'),
    'utf8'
  );

  test('generated Scss file has the DO NOT EDIT banner', () => {
    expect(scssSource).toContain(
      'Code generated by @carbon/motion. DO NOT EDIT.'
    );
  });

  test('every duration token in the JSON appears in the Scss with the correct value', () => {
    for (const token of durationTokens) {
      expect(scssSource).toContain(
        `$${token.name}: ${resolveDuration(token.value)}`
      );
    }
  });

  test('every easing cubic-bezier value in the JSON appears in the Scss $easings map', () => {
    for (const token of easingTokens) {
      expect(scssSource).toContain(resolveEasing(token.value));
    }
  });

  test('every V10 Sass alias in the JSON appears in the Scss', () => {
    for (const sassV10 of sassV10Names) {
      expect(scssSource).toContain(`$${sassV10}:`);
    }
  });

  test('Scss has exactly one V11 duration variable per duration token in the JSON', () => {
    const matches = scssSource.match(/\$duration-[a-z]+-\d+:/g) || [];
    expect(matches).toHaveLength(durationTokens.length);
  });

  test('Scss has exactly one V10 alias per duration token in the JSON', () => {
    const matches = scssSource.match(/\$[a-z]+-\d+: \$duration-/g) || [];
    expect(matches).toHaveLength(durationTokens.length);
  });
});
