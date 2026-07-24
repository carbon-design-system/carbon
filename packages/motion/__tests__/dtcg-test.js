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

// ---------------------------------------------------------------------------
// Load DTCG source files
// ---------------------------------------------------------------------------

const dtcgTokens = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../src/dtcg/motion.json'), 'utf8')
);

const dtcgSurfaces = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../src/dtcg/surfaces.json'), 'utf8')
);

// ---------------------------------------------------------------------------
// Helpers — tokens (motion.json)
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

/** "durationFast01" → "fast01" */
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
// Helpers — surfaces (surfaces.json)
// ---------------------------------------------------------------------------

/**
 * Walk the DTCG surface tree and collect all leaf nodes that carry a
 * carbon.motion extension. Returns a flat array of:
 *   { name, description, $value, recipe }
 * where `recipe` is the full carbon.motion extension object.
 */
function collectSurfaces(obj, pathSegments = []) {
  const results = [];
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    const segments = [...pathSegments, key];
    if (
      value &&
      typeof value === 'object' &&
      value.$extensions &&
      value.$extensions['carbon.motion']
    ) {
      results.push({
        pathName: segments.join('-'),
        name: key,
        description: value.$description || '',
        $value: value.$value,
        recipe: value.$extensions['carbon.motion'],
      });
    } else if (value && typeof value === 'object') {
      results.push(...collectSurfaces(value, segments));
    }
  }
  return results;
}

// ---------------------------------------------------------------------------
// Derived token sets
// ---------------------------------------------------------------------------

const allTokens = collectTokens(dtcgTokens);
const durationTokens = allTokens.filter((t) => t.name.startsWith('duration-'));
const easingTokens = allTokens.filter((t) => t.name.startsWith('easing-'));

const v11Names = durationTokens.map((t) => toCamelCase(t.name));
const v10Names = v11Names.map(toV10Name);
const sassV10Names = durationTokens.map((t) =>
  t.name.replace(/^duration-/, '')
);

const allSurfaces = collectSurfaces(dtcgSurfaces);
const surfaceNames = allSurfaces.map((s) => s.name);
const revealSurfaces = allSurfaces.filter((s) => s.recipe.kind === 'reveal');
const sharedElementSurfaces = allSurfaces.filter(
  (s) => s.recipe.kind === 'shared-element'
);

// ---------------------------------------------------------------------------
// Token file — src/dtcg/motion.json
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
// Surface file — src/dtcg/surfaces.json
// ---------------------------------------------------------------------------

describe('@carbon/motion — DTCG surface file (src/dtcg/surfaces.json)', () => {
  test('has the correct $schema', () => {
    expect(dtcgSurfaces.$schema).toBe('https://tr.designtokens.org/format/');
  });

  test('has at least one surface definition', () => {
    expect(allSurfaces.length).toBeGreaterThan(0);
  });

  test('all surfaces have $type "transition"', () => {
    function checkTypes(obj) {
      for (const [key, value] of Object.entries(obj)) {
        if (key.startsWith('$')) continue;
        if (value && typeof value === 'object') {
          if (value.$extensions && value.$extensions['carbon.motion']) {
            expect(value.$type).toBe('transition');
          } else {
            checkTypes(value);
          }
        }
      }
    }
    checkTypes(dtcgSurfaces);
  });

  test('all surfaces have a non-empty $description', () => {
    for (const surface of allSurfaces) {
      expect(typeof surface.description).toBe('string');
      expect(surface.description.length).toBeGreaterThan(0);
    }
  });

  test('all surfaces have a spec-valid $value with duration, delay, and timingFunction', () => {
    for (const surface of allSurfaces) {
      expect(surface.$value).toMatchObject({
        delay: { value: 0, unit: 'ms' },
      });
      expect(typeof surface.$value.duration).toBe('string');
      expect(typeof surface.$value.timingFunction).toBe('string');
    }
  });

  test('all $value.duration fields are DTCG alias references', () => {
    for (const surface of allSurfaces) {
      expect(surface.$value.duration).toMatch(/^\{duration\..+\}$/);
    }
  });

  test('all $value.timingFunction fields are DTCG alias references', () => {
    for (const surface of allSurfaces) {
      expect(surface.$value.timingFunction).toMatch(/^\{easing\..+\}$/);
    }
  });

  test('all recipes have a valid kind ("reveal" or "shared-element")', () => {
    for (const surface of allSurfaces) {
      expect(['reveal', 'shared-element']).toContain(surface.recipe.kind);
    }
  });

  test('all recipes have a duration string', () => {
    for (const surface of allSurfaces) {
      expect(typeof surface.recipe.duration).toBe('string');
      expect(surface.recipe.duration.length).toBeGreaterThan(0);
    }
  });

  test('all recipes have enterEasing and exitEasing as [name, mode] pairs', () => {
    const validNames = ['standard', 'entrance', 'exit'];
    const validModes = ['productive', 'expressive'];
    for (const surface of allSurfaces) {
      for (const field of ['enterEasing', 'exitEasing']) {
        const easing = surface.recipe[field];
        expect(Array.isArray(easing)).toBe(true);
        expect(easing).toHaveLength(2);
        expect(validNames).toContain(easing[0]);
        expect(validModes).toContain(easing[1]);
      }
    }
  });

  test('reveal surfaces have enter and exit keyframe objects', () => {
    for (const surface of revealSurfaces) {
      expect(typeof surface.recipe.enter).toBe('object');
      expect(typeof surface.recipe.exit).toBe('object');
      expect(surface.recipe.enter).not.toBeNull();
      expect(surface.recipe.exit).not.toBeNull();
    }
  });

  test('reveal surface keyframes have at least one property each', () => {
    for (const surface of revealSurfaces) {
      expect(Object.keys(surface.recipe.enter).length).toBeGreaterThan(0);
      expect(Object.keys(surface.recipe.exit).length).toBeGreaterThan(0);
    }
  });

  test('shared-element surfaces do not require enter/exit keyframes', () => {
    for (const surface of sharedElementSurfaces) {
      expect(surface.recipe.kind).toBe('shared-element');
    }
  });
});

// ---------------------------------------------------------------------------
// JS output — tokens
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
// JS output — surfaces
// ---------------------------------------------------------------------------

describe('@carbon/motion — every DTCG surface generates a JS export', () => {
  const CarbonMotion = require('../src');

  test('surfaces export exists on the package', () => {
    expect(CarbonMotion).toHaveProperty('surfaces');
    expect(typeof CarbonMotion.surfaces).toBe('object');
  });

  test('getMotionSurface export exists on the package', () => {
    expect(CarbonMotion).toHaveProperty('getMotionSurface');
    expect(typeof CarbonMotion.getMotionSurface).toBe('function');
  });

  test('every surface in surfaces.json exists as a key in the JS surfaces map', () => {
    for (const { name } of allSurfaces) {
      expect(CarbonMotion.surfaces).toHaveProperty(name);
    }
  });

  test('JS surfaces map has exactly the same keys as surfaces.json', () => {
    const jsKeys = Object.keys(CarbonMotion.surfaces).sort();
    const jsonKeys = [...surfaceNames].sort();
    expect(jsKeys).toEqual(jsonKeys);
  });

  test('every surface recipe in JS matches the carbon.motion extension in surfaces.json', () => {
    for (const { name, recipe } of allSurfaces) {
      expect(CarbonMotion.surfaces[name]).toEqual(recipe);
    }
  });

  test('getMotionSurface returns the correct recipe for each surface', () => {
    for (const { name, recipe } of allSurfaces) {
      expect(CarbonMotion.getMotionSurface(name)).toEqual(recipe);
    }
  });

  test('getMotionSurface throws a clear error for an unknown surface name', () => {
    const expectedNames = surfaceNames.join(', ');
    expect(() => CarbonMotion.getMotionSurface('nope')).toThrow(
      `Unable to find motion surface \`nope\`. Expected one of: ${expectedNames}`
    );
  });

  test('every reveal surface has enter and exit keyframes in JS', () => {
    for (const surface of revealSurfaces) {
      const jsSurface = CarbonMotion.surfaces[surface.name];
      expect(jsSurface).toHaveProperty('enter');
      expect(jsSurface).toHaveProperty('exit');
    }
  });

  test('every surface enterEasing and exitEasing in JS match surfaces.json', () => {
    for (const { name, recipe } of allSurfaces) {
      const jsSurface = CarbonMotion.surfaces[name];
      expect(jsSurface.enterEasing).toEqual(recipe.enterEasing);
      expect(jsSurface.exitEasing).toEqual(recipe.exitEasing);
    }
  });

  test('every surface duration in JS matches surfaces.json', () => {
    for (const { name, recipe } of allSurfaces) {
      expect(CarbonMotion.surfaces[name].duration).toBe(recipe.duration);
    }
  });
});

// ---------------------------------------------------------------------------
// Sass output — tokens
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

// ---------------------------------------------------------------------------
// Sass output — surfaces
// ---------------------------------------------------------------------------

describe('@carbon/motion — every DTCG surface generates a Sass variable', () => {
  const scssSource = fs.readFileSync(
    path.resolve(__dirname, '../scss/generated/_surfaces.scss'),
    'utf8'
  );

  test('generated Sass file has the DO NOT EDIT banner', () => {
    expect(scssSource).toContain(
      'Code generated by @carbon/motion. DO NOT EDIT.'
    );
  });

  test('generated Sass file declares the $surfaces map', () => {
    expect(scssSource).toContain('$surfaces: (');
  });

  test('every surface name appears as a key in the $surfaces Sass map', () => {
    for (const { name } of allSurfaces) {
      expect(scssSource).toContain(`  ${name}: (`);
    }
  });

  test('every surface kind appears in the Sass output', () => {
    for (const { recipe } of allSurfaces) {
      expect(scssSource).toContain(`kind: '${recipe.kind}'`);
    }
  });

  test('every surface duration appears in the Sass output', () => {
    for (const { recipe } of allSurfaces) {
      expect(scssSource).toContain(`duration: '${recipe.duration}'`);
    }
  });

  test('every surface enterEasing pair appears in the Sass output', () => {
    for (const { recipe } of allSurfaces) {
      const [name, mode] = recipe.enterEasing;
      expect(scssSource).toContain(`enter-easing: ('${name}', '${mode}')`);
    }
  });

  test('every surface exitEasing pair appears in the Sass output', () => {
    for (const { recipe } of allSurfaces) {
      const [name, mode] = recipe.exitEasing;
      expect(scssSource).toContain(`exit-easing: ('${name}', '${mode}')`);
    }
  });

  test('reveal surface enter/exit keyframe maps appear in the Sass output', () => {
    for (const surface of revealSurfaces) {
      expect(scssSource).toContain('enter: (');
      expect(scssSource).toContain('exit: (');
    }
  });
});
