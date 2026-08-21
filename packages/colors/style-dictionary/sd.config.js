/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Style Dictionary configuration for @carbon/colors.
 *
 * Reads:  src/dtcg/colors.json
 * Writes:
 *   - src/colors.ts        (TypeScript source, consumed by carbon-cli bundle)
 *   - index.scss           (generated Sass variables + $colors map)
 */

const path = require('path');
const { default: StyleDictionary } = require('style-dictionary');

const carbonScssColors = require('./formats/scss-colors');
const carbonJsColors = require('./formats/js-colors');

const ROOT = path.resolve(__dirname, '..');
const DTCG_SOURCE = path.join(ROOT, 'src', 'dtcg', 'colors.json');
const JS_GENERATED = path.join(ROOT, 'js', 'generated');

// ── Name transform ─────────────────────────────────────────────────────────────
// Keep the token path intact — our formats use token.path directly, so the
// name transform is a no-op (just joins segments so SD is happy).
const carbonNamePath = {
  name: 'carbon/name-path',
  type: 'name',
  transform(token) {
    return token.path.join('/');
  },
};

function createBase() {
  const base = new StyleDictionary({});
  base.registerTransform(carbonNamePath);
  // Use 'css' transform group transforms for value resolution (handles DTCG
  // $value → token.value), then override name with our path-preserving transform.
  base.registerTransformGroup({
    name: 'carbon/colors',
    transforms: [
      'attribute/cti',
      'carbon/name-path',
      'color/css', // resolves DTCG $value hex strings into token.value
    ],
  });
  base.registerFormat(carbonScssColors);
  base.registerFormat(carbonJsColors);
  return base;
}

const sdConfig = {
  source: [DTCG_SOURCE],
  platforms: {
    // Generates js/generated/colors.js + colors.d.ts
    // consumed by src/index.ts → carbon-cli bundle → es/ and lib/
    js: {
      transformGroup: 'carbon/colors',
      buildPath: JS_GENERATED + '/',
      files: [
        {
          destination: 'colors.js',
          format: 'carbon/js-colors',
          options: { output: 'js' },
        },
        {
          destination: 'colors.d.ts',
          format: 'carbon/js-colors',
          options: { output: 'dts' },
        },
      ],
    },
    // Generates index.scss at the package root
    scss: {
      transformGroup: 'carbon/colors',
      buildPath: ROOT + '/',
      files: [
        {
          destination: 'index.scss',
          format: 'carbon/scss-colors',
        },
      ],
    },
  },
};

async function run() {
  const base = createBase();
  const sd = await base.extend(sdConfig);
  await sd.buildAllPlatforms();
}

module.exports = { run, sdConfig };
