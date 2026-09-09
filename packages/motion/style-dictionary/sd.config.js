/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Style Dictionary configuration for @carbon/motion.
 *
 * Wires together the custom plugins in this directory and drives two separate
 * builds:
 *
 *   runJs()   → js/generated/tokens.{js,d.ts}
 *               js/generated/surfaces.{js,d.ts}
 *
 *   runScss() → scss/generated/_tokens.scss
 *               scss/generated/_surfaces.scss
 */

const path = require('path');
const fs = require('fs');
const { default: StyleDictionary } = require('style-dictionary');

// ── Custom plugins ─────────────────────────────────────────────────────────
const carbonMotionDuration = require('./transforms/duration');
const carbonMotionCubicBezier = require('./transforms/cubic-bezier');
const carbonJsMotionTokens = require('./formats/js-tokens');
const carbonJsMotionSurfaces = require('./formats/js-surfaces');
const carbonScssMotionTokens = require('./formats/scss-tokens');
const carbonScssMotionSurfaces = require('./formats/scss-surfaces');

// ── Paths ──────────────────────────────────────────────────────────────────
const ROOT = path.resolve(__dirname, '..');
const DTCG_DIR = path.join(ROOT, 'src', 'dtcg');
const SCSS_GENERATED = path.join(ROOT, 'scss', 'generated');
const JS_GENERATED = path.join(ROOT, 'js', 'generated');

// ── Custom name transform ──────────────────────────────────────────────────
//
// Builds a kebab-case name from the token path segments.
// e.g. ['duration', 'fast', '01'] → 'duration-fast-01'
//      ['easing', 'standard', 'productive'] → 'easing-standard-productive'
const carbonMotionNameKebab = {
  name: 'carbon/motion-name-kebab',
  type: 'name',
  transform(token) {
    return token.path.join('-');
  },
};

// ── Transform group ────────────────────────────────────────────────────────
const CARBON_MOTION_TRANSFORMS = [
  'attribute/cti',
  'carbon/motion-name-kebab',
  'carbon/motion-duration',
  'carbon/motion-cubic-bezier',
];

// ── SD configs ────────────────────────────────────────────────────────────
//
// Separate configs are used for JS and SCSS so that `runJs()` and `runScss()`
// only invoke their respective platforms, matching the themes pattern where
// each build step is independently callable.

// motion.json — JS output
const jsTokensConfig = {
  source: [path.join(DTCG_DIR, 'motion.json')],
  platforms: {
    'js/tokens': {
      transformGroup: 'carbon/motion',
      buildPath: JS_GENERATED + '/',
      files: [
        {
          destination: 'tokens.js',
          format: 'carbon/motion-js-tokens',
          options: { output: 'js' },
        },
        {
          destination: 'tokens.d.ts',
          format: 'carbon/motion-js-tokens',
          options: { output: 'dts' },
        },
      ],
    },
  },
};

// motion.json — SCSS output
const scssTokensConfig = {
  source: [path.join(DTCG_DIR, 'motion.json')],
  platforms: {
    'scss/tokens': {
      transformGroup: 'carbon/motion',
      buildPath: SCSS_GENERATED + '/',
      files: [
        {
          destination: '_tokens.scss',
          format: 'carbon/motion-scss-tokens',
        },
      ],
    },
  },
};

// surfaces.json — JS output
//
// Surfaces are processed by their formats reading surfaces.json directly;
// SD still manages the build lifecycle and output directory creation.
// motion.json is included so SD can resolve the alias references in
// surfaces.json $value fields (even though the format reads $extensions
// directly and does not consume the resolved values).
const jsSurfacesConfig = {
  source: [
    path.join(DTCG_DIR, 'motion.json'),
    path.join(DTCG_DIR, 'surfaces.json'),
  ],
  // The two source files both have a top-level $description; SD reports this
  // as a collision even though it is DTCG metadata, not a real token conflict.
  log: { warnings: 'disabled' },
  platforms: {
    'js/surfaces': {
      transformGroup: 'carbon/motion',
      buildPath: JS_GENERATED + '/',
      files: [
        {
          destination: 'surfaces.js',
          format: 'carbon/motion-js-surfaces',
          options: { output: 'js' },
        },
        {
          destination: 'surfaces.d.ts',
          format: 'carbon/motion-js-surfaces',
          options: { output: 'dts' },
        },
      ],
    },
  },
};

// surfaces.json — SCSS output
const scssSurfacesConfig = {
  source: [
    path.join(DTCG_DIR, 'motion.json'),
    path.join(DTCG_DIR, 'surfaces.json'),
  ],
  log: { warnings: 'disabled' },
  platforms: {
    'scss/surfaces': {
      transformGroup: 'carbon/motion',
      buildPath: SCSS_GENERATED + '/',
      files: [
        {
          destination: '_surfaces.scss',
          format: 'carbon/motion-scss-surfaces',
        },
      ],
    },
  },
};

// ── Build a registered SD instance ────────────────────────────────────────
// In SD v5, register* methods live on the instance, not the class.
// We create one base instance with all plugins registered, then extend it
// per-config so each build inherits the registrations.
function createBase() {
  const base = new StyleDictionary({});
  base.registerTransform(carbonMotionNameKebab);
  base.registerTransform(carbonMotionDuration);
  base.registerTransform(carbonMotionCubicBezier);
  base.registerTransformGroup({
    name: 'carbon/motion',
    transforms: CARBON_MOTION_TRANSFORMS,
  });
  base.registerFormat(carbonJsMotionTokens);
  base.registerFormat(carbonJsMotionSurfaces);
  base.registerFormat(carbonScssMotionTokens);
  base.registerFormat(carbonScssMotionSurfaces);
  return base;
}

// ── JS build ──────────────────────────────────────────────────────────────
// Generates:
//   js/generated/tokens.{js,d.ts}
//   js/generated/surfaces.{js,d.ts}
async function runJs() {
  fs.mkdirSync(JS_GENERATED, { recursive: true });
  const base = createBase();
  await (await base.extend(jsTokensConfig)).buildAllPlatforms();
  await (await base.extend(jsSurfacesConfig)).buildAllPlatforms();
}

// ── SCSS build ────────────────────────────────────────────────────────────
// Generates:
//   scss/generated/_tokens.scss
//   scss/generated/_surfaces.scss
async function runScss() {
  fs.mkdirSync(SCSS_GENERATED, { recursive: true });
  const base = createBase();
  await (await base.extend(scssTokensConfig)).buildAllPlatforms();
  await (await base.extend(scssSurfacesConfig)).buildAllPlatforms();
}

// ── Full build (JS + SCSS) ─────────────────────────────────────────────────
async function run() {
  await runJs();
  await runScss();
}

module.exports = {
  run,
  runJs,
  runScss,
  jsTokensConfig,
  scssTokensConfig,
  jsSurfacesConfig,
  scssSurfacesConfig,
};
