/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

/**
 * JS GENERATED TOKEN PARITY TEST
 *
 * Two sets of assertions:
 *
 * 1. js/generated/ ↔ DTCG JSON source (convertDTCGToTheme / convertDTCGComponentTokens)
 *    The authoritative check: every token in the JSON must appear in the
 *    generated file with the correct value, and nothing extra must be generated.
 *
 * 2. js/generated/ ↔ lib/ (built bundle)
 *    Confirms the bundler faithfully re-exports what the generated files declare.
 *
 * Run `yarn build` in packages/themes before running these tests.
 */

const fs = require('fs');
const path = require('path');

const JS_GENERATED_DIR = path.resolve(__dirname, '../js/generated');
const LIB_DIR = path.resolve(__dirname, '../lib');
const DTCG_DIR = path.resolve(__dirname, '../src/dtcg');

const {
  convertDTCGToTheme,
  convertDTCGComponentTokens,
  normalizeComponentThemeName,
} = require('../tasks/builders/dtcg-converter');

const jsGeneratedExists = fs.existsSync(JS_GENERATED_DIR);
const libExists = fs.existsSync(LIB_DIR);

const testOrSkip = jsGeneratedExists && libExists ? test : test.skip;

if (!jsGeneratedExists || !libExists) {
  console.warn(
    '\n⚠️  js/generated or lib not found. Run `yarn build` in packages/themes first.\n'
  );
}

// ---------------------------------------------------------------------------
// kebab-case → camelCase (mirrors dtcg-js-themes.js / dtcg-js-component-tokens.js)
// ---------------------------------------------------------------------------
function kebabToCamel(str) {
  return str.replace(/-([a-z0-9])/g, (_, ch) => ch.toUpperCase());
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Parse named exports from a generated JS file.
 * Handles:
 *   export const foo = 'value';
 *   export const foo = { key: 'value', ... };
 *
 * @param {string} filePath
 * @returns {Record<string, string | Record<string, string>>}
 */
function parseGeneratedJs(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const tokens = {};

  // Match single-line scalar exports: export const name = 'value';
  const scalarRe =
    /^export const (\w+) = ('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*");$/gm;
  let m;
  while ((m = scalarRe.exec(content)) !== null) {
    const [, name, rawValue] = m;
    tokens[name] = rawValue.slice(1, -1).replace(/\\'/g, "'");
  }

  // Match multi-line object exports: export const name = {\n  key: 'v',\n};
  const objectRe = /^export const (\w+) = \{([\s\S]*?)\n\};$/gm;
  while ((m = objectRe.exec(content)) !== null) {
    const [, name, body] = m;
    const obj = {};
    const propRe = /^\s+(\w+): ('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"),?$/gm;
    let pm;
    while ((pm = propRe.exec(body)) !== null) {
      const [, key, val] = pm;
      obj[key] = val.slice(1, -1).replace(/\\'/g, "'");
    }
    tokens[name] = obj;
  }

  return tokens;
}

/**
 * Load a CommonJS module from lib/ and return its named exports as a plain
 * object, keeping only string and plain-object (token map) values.
 */
function loadLibModule(relPath) {
  const mod = require(path.join(LIB_DIR, relPath));
  const result = {};
  for (const [key, value] of Object.entries(mod)) {
    if (typeof value === 'string') {
      result[key] = value;
    } else if (
      value !== null &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      Object.values(value).every((v) => typeof v === 'string')
    ) {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Deep-compare two token maps and return a structured diff.
 */
function diffTokenMaps(generated, lib) {
  const genKeys = new Set(Object.keys(generated));
  const libKeys = new Set(Object.keys(lib));

  const missingInGenerated = [...libKeys].filter((k) => !genKeys.has(k));
  const extraInGenerated = [...genKeys].filter((k) => !libKeys.has(k));
  const valueMismatches = [];

  for (const key of libKeys) {
    if (!genKeys.has(key)) continue;
    const genVal = generated[key];
    const libVal = lib[key];

    if (typeof libVal === 'string' && typeof genVal === 'string') {
      if (genVal !== libVal) {
        valueMismatches.push({ key, generated: genVal, lib: libVal });
      }
    } else if (typeof libVal === 'object' && typeof genVal === 'object') {
      // Compare inner theme maps
      for (const [theme, libThemeVal] of Object.entries(libVal)) {
        const genThemeVal = genVal[theme];
        if (genThemeVal === undefined) {
          valueMismatches.push({
            key,
            generated: `missing theme key '${theme}'`,
            lib: libThemeVal,
          });
        } else if (genThemeVal !== libThemeVal) {
          valueMismatches.push({
            key: `${key}.${theme}`,
            generated: genThemeVal,
            lib: libThemeVal,
          });
        }
      }
      // Extra theme keys in generated
      for (const theme of Object.keys(genVal)) {
        if (!(theme in libVal)) {
          valueMismatches.push({
            key,
            generated: `extra theme key '${theme}': ${genVal[theme]}`,
            lib: '(not present)',
          });
        }
      }
    } else {
      valueMismatches.push({
        key,
        generated: String(genVal),
        lib: String(libVal),
      });
    }
  }

  return { missingInGenerated, extraInGenerated, valueMismatches };
}

// ---------------------------------------------------------------------------
// Utilities to build a human-readable failure message
// ---------------------------------------------------------------------------

function formatDiff({ missingInGenerated, extraInGenerated, valueMismatches }) {
  const lines = [];
  if (missingInGenerated.length) {
    lines.push(
      `Missing in generated (${missingInGenerated.length}): ${missingInGenerated.join(', ')}`
    );
  }
  if (extraInGenerated.length) {
    lines.push(
      `Extra in generated (${extraInGenerated.length}): ${extraInGenerated.join(', ')}`
    );
  }
  if (valueMismatches.length) {
    lines.push(`Value mismatches (${valueMismatches.length}):`);
    valueMismatches.slice(0, 5).forEach(({ key, generated, lib }) => {
      lines.push(`  ${key}: generated="${generated}" lib="${lib}"`);
    });
    if (valueMismatches.length > 5) {
      lines.push(`  ... and ${valueMismatches.length - 5} more`);
    }
  }
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Themes
// ---------------------------------------------------------------------------

describe('JS generated theme files match lib output', () => {
  const themes = ['white', 'g10', 'g90', 'g100'];

  themes.forEach((themeName) => {
    describe(themeName, () => {
      let generated;
      let lib;

      beforeAll(() => {
        if (!jsGeneratedExists || !libExists) return;
        generated = parseGeneratedJs(
          path.join(JS_GENERATED_DIR, 'themes', `${themeName}.js`)
        );
        // lib exports the theme as a namespace object — load index and pick the theme
        const index = require(path.join(LIB_DIR, 'index.js'));
        lib =
          loadLibModule('index.js')[themeName] ??
          // index exports `white` etc. as namespace objects; grab directly
          (() => {
            throw new Error(`${themeName} not found in lib/index.js`);
          })();
        // The namespace object IS the theme map
        lib = index[themeName];
        // Filter to only string values (exclude type/layout tokens re-exported onto namespace)
        lib = Object.fromEntries(
          Object.entries(lib).filter(([, v]) => typeof v === 'string')
        );
      });

      testOrSkip('generated file exists', () => {
        expect(
          fs.existsSync(
            path.join(JS_GENERATED_DIR, 'themes', `${themeName}.js`)
          )
        ).toBe(true);
      });

      testOrSkip('has the same token names as lib', () => {
        const { missingInGenerated, extraInGenerated } = diffTokenMaps(
          generated,
          lib
        );
        expect(
          formatDiff({
            missingInGenerated,
            extraInGenerated,
            valueMismatches: [],
          })
        ).toBe('');
      });

      testOrSkip('all token values match lib exactly', () => {
        const { valueMismatches } = diffTokenMaps(generated, lib);
        expect(
          formatDiff({
            missingInGenerated: [],
            extraInGenerated: [],
            valueMismatches,
          })
        ).toBe('');
      });
    });
  });
});

// ---------------------------------------------------------------------------
// Component tokens
// ---------------------------------------------------------------------------

describe('JS generated component token files match lib output', () => {
  const components = [
    { name: 'button', libKey: 'buttonTokens' },
    { name: 'tag', libKey: 'tagTokens' },
    { name: 'notification', libKey: 'notificationTokens' },
    { name: 'status', libKey: 'statusTokens' },
    { name: 'content-switcher', libKey: 'contentSwitcherTokens' },
  ];

  components.forEach(({ name, libKey }) => {
    describe(name, () => {
      let generated;
      let lib;

      beforeAll(() => {
        if (!jsGeneratedExists || !libExists) return;
        generated = parseGeneratedJs(
          path.join(JS_GENERATED_DIR, 'component-tokens', `${name}.js`)
        );
        const index = require(path.join(LIB_DIR, 'index.js'));
        // index exports e.g. buttonTokens = { buttonDangerActive: { whiteTheme, g10, ... } }
        lib = index[libKey];
      });

      testOrSkip('generated file exists', () => {
        expect(
          fs.existsSync(
            path.join(JS_GENERATED_DIR, 'component-tokens', `${name}.js`)
          )
        ).toBe(true);
      });

      testOrSkip('has the same token names as lib', () => {
        const { missingInGenerated, extraInGenerated } = diffTokenMaps(
          generated,
          lib
        );
        expect(
          formatDiff({
            missingInGenerated,
            extraInGenerated,
            valueMismatches: [],
          })
        ).toBe('');
      });

      testOrSkip('all token values and theme entries match lib exactly', () => {
        const { valueMismatches } = diffTokenMaps(generated, lib);
        expect(
          formatDiff({
            missingInGenerated: [],
            extraInGenerated: [],
            valueMismatches,
          })
        ).toBe('');
      });
    });
  });
});

// ---------------------------------------------------------------------------
// DTCG JSON → js/generated/ parity
// ---------------------------------------------------------------------------

describe('JS generated theme files match DTCG JSON source', () => {
  const themes = ['white', 'g10', 'g90', 'g100'];

  themes.forEach((themeName) => {
    describe(themeName, () => {
      let generated;
      let expected;

      beforeAll(() => {
        if (!jsGeneratedExists) return;

        generated = parseGeneratedJs(
          path.join(JS_GENERATED_DIR, 'themes', `${themeName}.js`)
        );

        // Build the expected map the same way the builder does:
        // convertDTCGToTheme → kebab keys → camelCase
        const dtcgJson = JSON.parse(
          fs.readFileSync(path.join(DTCG_DIR, `${themeName}.json`), 'utf8')
        );
        const rawTheme = convertDTCGToTheme(dtcgJson);
        expected = {};
        for (const [kebabKey, value] of Object.entries(rawTheme)) {
          expected[kebabToCamel(kebabKey)] = value;
        }
      });

      testOrSkip('every DTCG token is present in the generated file', () => {
        const missing = Object.keys(expected).filter((k) => !(k in generated));
        expect(missing).toEqual([]);
      });

      testOrSkip('no extra tokens in generated file beyond DTCG source', () => {
        const extra = Object.keys(generated).filter((k) => !(k in expected));
        expect(extra).toEqual([]);
      });

      testOrSkip('all token values match DTCG source exactly', () => {
        const { valueMismatches } = diffTokenMaps(generated, expected);
        expect(
          formatDiff({
            missingInGenerated: [],
            extraInGenerated: [],
            valueMismatches,
          })
        ).toBe('');
      });
    });
  });
});

describe('JS generated component token files match DTCG JSON source', () => {
  const components = [
    { name: 'button' },
    { name: 'tag' },
    { name: 'notification' },
    { name: 'status' },
    { name: 'content-switcher' },
  ];

  components.forEach(({ name }) => {
    describe(name, () => {
      let generated;
      let expected;

      beforeAll(() => {
        if (!jsGeneratedExists) return;

        generated = parseGeneratedJs(
          path.join(JS_GENERATED_DIR, 'component-tokens', `${name}.js`)
        );

        // Build expected map the same way dtcg-js-component-tokens.js does:
        // convertDTCGComponentTokens → kebab token name → camelCase
        //                            → theme keys normalised → camelCase
        const dtcgJson = JSON.parse(
          fs.readFileSync(
            path.join(DTCG_DIR, 'components', `${name}.json`),
            'utf8'
          )
        );
        const rawTokens = convertDTCGComponentTokens(dtcgJson);
        expected = {};
        for (const [kebabName, themeValues] of Object.entries(rawTokens)) {
          const camelName = kebabToCamel(kebabName);
          const normalisedThemes = {};
          for (const [theme, value] of Object.entries(themeValues)) {
            normalisedThemes[kebabToCamel(normalizeComponentThemeName(theme))] =
              value;
          }
          expected[camelName] = normalisedThemes;
        }
      });

      testOrSkip('every DTCG token is present in the generated file', () => {
        const missing = Object.keys(expected).filter((k) => !(k in generated));
        expect(missing).toEqual([]);
      });

      testOrSkip('no extra tokens in generated file beyond DTCG source', () => {
        const extra = Object.keys(generated).filter((k) => !(k in expected));
        expect(extra).toEqual([]);
      });

      testOrSkip(
        'all token values and theme entries match DTCG source exactly',
        () => {
          const { valueMismatches } = diffTokenMaps(generated, expected);
          expect(
            formatDiff({
              missingInGenerated: [],
              extraInGenerated: [],
              valueMismatches,
            })
          ).toBe('');
        }
      );
    });
  });
});
