/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Style Dictionary configuration for @carbon/layout.
 *
 * Reads tokens/layout.tokens.json and generates:
 *   scss/generated/*.scss                — Sass variables + maps (one file per token group)
 *   js/generated/layout-tokens.js        — ES module named exports
 *   js/generated/layout-tokens.d.ts      — TypeScript declarations
 */

const path = require('path');
const { default: StyleDictionary } = require('style-dictionary');

const scssFormats = require('./formats/scss-layout');
const carbonJsLayout = require('./formats/js-layout');

// ── Paths ─────────────────────────────────────────────────────────────────────
const ROOT = path.resolve(__dirname, '..');
const TOKENS_SOURCE = path.join(ROOT, 'tokens', 'layout.tokens.json');
const SCSS_GENERATED = path.join(ROOT, 'scss', 'generated');
const JS_GENERATED = path.join(ROOT, 'js', 'generated');

// ── Custom name transform ─────────────────────────────────────────────────────
// Uses only the token's own key (last path segment) as the name, discarding
// the group prefix. With DTCG groups, path is ["spacing", "spacing-01"] so
// joining would produce "spacing-spacing-01" — we want just "spacing-01".
const carbonNameKebab = {
  name: 'carbon/name-kebab',
  type: 'name',
  transform(token) {
    return token.path[token.path.length - 1];
  },
};

// ── Custom value transform ────────────────────────────────────────────────────
// Converts a token's $value to a CSS value string.
//   dimension: { value, unit } → "0.125rem"
//   number:    the number, followed by the `com.ibm.carbon` layout unit when
//              one is set ("2vw"); DTCG dimensions only allow `px` and `rem`
const carbonCssValue = {
  name: 'carbon/css-value',
  type: 'value',
  transform(token) {
    const value = token.$value;
    if (typeof value === 'object') {
      return `${value.value}${value.unit}`;
    }
    const unit = token.$extensions?.['com.ibm.carbon']?.layout?.unit ?? '';
    return `${value}${unit}`;
  },
};

// ── Transform group ───────────────────────────────────────────────────────────
const CARBON_TRANSFORMS = [
  'attribute/cti',
  'carbon/name-kebab',
  'carbon/css-value',
];

// ── SD config ─────────────────────────────────────────────────────────────────
const config = {
  source: [TOKENS_SOURCE],
  platforms: {
    scss: {
      transformGroup: 'carbon',
      buildPath: SCSS_GENERATED + '/',
      files: [
        { destination: '_spacing.scss', format: 'carbon/scss-spacing' },
        {
          destination: '_fluid-spacing.scss',
          format: 'carbon/scss-fluid-spacing',
        },
        { destination: '_container.scss', format: 'carbon/scss-container' },
        { destination: '_icon-size.scss', format: 'carbon/scss-icon-size' },
        {
          destination: '_border-radius.scss',
          format: 'carbon/scss-border-radius',
        },
        { destination: '_layout.scss', format: 'carbon/scss-layout' },
        { destination: '_size.scss', format: 'carbon/scss-size' },
      ],
    },
    js: {
      transformGroup: 'carbon',
      buildPath: JS_GENERATED + '/',
      files: [
        {
          destination: 'layout-tokens.js',
          format: 'carbon/js-layout',
          options: { output: 'js' },
        },
        {
          destination: 'layout-tokens.d.ts',
          format: 'carbon/js-layout',
          options: { output: 'dts' },
        },
      ],
    },
  },
};

// ── Build a registered SD instance ────────────────────────────────────────────
function createInstance() {
  const sd = new StyleDictionary({});
  sd.registerTransform(carbonNameKebab);
  sd.registerTransform(carbonCssValue);
  sd.registerTransformGroup({ name: 'carbon', transforms: CARBON_TRANSFORMS });
  for (const fmt of scssFormats) sd.registerFormat(fmt);
  sd.registerFormat(carbonJsLayout);
  return sd;
}

// ── run ───────────────────────────────────────────────────────────────────────
async function run() {
  const sd = await createInstance().extend(config);
  await sd.buildAllPlatforms();
}

module.exports = { run };
