/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Style Dictionary configuration for @carbon/themes.
 *
 * Wires together the custom plugins in this directory
 *
 */

const path = require('path');
const fs = require('fs-extra');
const { default: StyleDictionary } = require('style-dictionary');

// ── Custom plugins ────────────────────────────────────────────────────────────
const carbonColorFlatten = require('./transforms/color-flatten');
const carbonAlphaModifier = require('./transforms/alpha-modifier');
const carbonComponentTokensPreprocessorModule = require('./preprocessors/component-tokens');
const { preprocessor: carbonComponentTokensPreprocessor } =
  carbonComponentTokensPreprocessorModule;
const carbonThemeMetadataPreprocessor = require('./preprocessors/theme-metadata');
const { preprocessor: flattenDualRole } = require('./preprocessors/dual-role');
const carbonScssThemes = require('./formats/scss-themes');
const carbonScssTokens = require('./formats/scss-tokens');
const carbonScssComponentTokens = require('./formats/scss-component-tokens');
const carbonJsThemes = require('./formats/js-themes');
const carbonJsComponentTokens = require('./formats/js-component-tokens');

// ── Paths ─────────────────────────────────────────────────────────────────────
const ROOT = path.resolve(__dirname, '..');
const DTCG_DIR = path.join(ROOT, 'src', 'dtcg');
const SCSS_GENERATED = path.join(ROOT, 'scss', 'generated');
const JS_GENERATED_THEMES = path.join(ROOT, 'js', 'generated', 'themes');
const JS_GENERATED_COMPONENTS = path.join(
  ROOT,
  'js',
  'generated',
  'component-tokens'
);

const THEME_NAMES = ['white', 'g10', 'g90', 'g100'];

// Light/dark scheme per theme — used to re-inject color-scheme metadata after
// extractThemeSlice strips the root $extensions from the unified file.
const THEME_COLOR_SCHEME = {
  white: 'light',
  g10: 'light',
  g90: 'dark',
  g100: 'dark',
};
const COMPONENT_NAMES = [
  'button',
  'tag',
  'notification',
  'status',
  'content-switcher',
];

// ── extractThemeSlice ─────────────────────────────────────────────────────────
//
// After the component-tokens preprocessor runs on themes.json, every leaf token
// node becomes a group with a `_by_theme` child containing one synthetic leaf
// per theme.  This function walks the expanded tree and replaces each
// `_by_theme` group with the single synthetic leaf for `themeName`, collapsing
// the tree back into a normal per-theme token structure that the rest of the
// pipeline (flattenDualRole, SD transforms, formatters) understands.
//
// Tokens that do NOT have a _by_theme group (palette reference tokens injected
// via `source:`) are passed through unchanged.
function extractThemeSlice(node, themeName) {
  if (!node || typeof node !== 'object') return node;

  const out = {};
  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith('$')) {
      out[key] = value;
      continue;
    }
    if (!value || typeof value !== 'object') {
      out[key] = value;
      continue;
    }
    if (key === '_by_theme') {
      // Skip — handled by the parent via the `value._by_theme` branch below.
      continue;
    }

    // Check if this child node has a _by_theme group (i.e. it was a leaf or
    // dual-role node in themes.json that the preprocessor expanded).
    if (value._by_theme) {
      const leaf = value._by_theme[themeName];
      if (leaf) {
        // Start with the leaf's DTCG fields ($type, $value, $extensions).
        const merged = { ...leaf };
        // Preserve $description from the group wrapper (leaf synthetic nodes
        // don't carry it, but the original themes.json node does).
        if (!merged.$description && value.$description)
          merged.$description = value.$description;
        if (!merged.$type && value.$type) merged.$type = value.$type;

        // Recurse into any group children of this node (dual-role case):
        // e.g. `background` is both a token and the parent of `background-active`.
        for (const [childKey, childValue] of Object.entries(value)) {
          if (childKey.startsWith('$') || childKey === '_by_theme') continue;
          if (!childValue || typeof childValue !== 'object') continue;
          const sliced = extractThemeSlice(
            { [childKey]: childValue },
            themeName
          );
          if (sliced[childKey] !== undefined)
            merged[childKey] = sliced[childKey];
        }

        out[key] = merged;
      }
      // If the theme had no entry, skip the token.
    } else {
      const sliced = extractThemeSlice(value, themeName);
      if (sliced !== null) out[key] = sliced;
    }
  }
  return out;
}

// ── Custom name transform ─────────────────────────────────────────────────────
//
// Builds a kebab-case name from the SD token path, with one special rule:
// a path segment equal to `_self` is stripped.  This is used in conjunction
// with the carbon/dual-role preprocessor — dual-role parent token values are
// placed under a `_self` child key so that SD processes them as separate leaf
// tokens, but their output name omits the `_self` suffix.
//
// Examples:
//   ['background']           → 'background'
//   ['background', '_self']  → 'background'   (parent of dual-role node)
//   ['background', 'active'] → 'background-active'
//   ['layer', '01']          → 'layer-01'
//   ['layer', '_self']       → 'layer'
const carbonNameKebab = {
  name: 'carbon/name-kebab',
  type: 'name',
  transform(token) {
    return token.path
      .filter((p) => p !== '_self')
      .map((p) => p.replace(/^_/, '').replace(/_/g, '-'))
      .join('-');
  },
};

// ── Transform group ────────────────────────────────────────────────────────────
//
// Order matters: alpha-modifier must fire BEFORE color-flatten so the hex
// is already resolved when flatten runs.
// Both are `transitive: true` — SD re-applies them until the value stabilises.
const CARBON_TRANSFORMS = [
  'attribute/cti',
  'carbon/name-kebab', // custom: strips _self from dual-role parent paths
  'carbon/alpha-modifier',
  'carbon/color-flatten',
];

// ── Helper: build config for one theme ───────────────────────────────────────
//
// themes.json is the unified source — all four themes in one file, with each
// token carrying per-theme values under $extensions["carbon.themes"].
// The component-tokens preprocessor expands those into per-theme leaf tokens
// (identical to what it does for component files), and dual-role splitting
// then runs on the resulting tree so SD sees clean leaf+group pairs.
function themeConfig(themeName) {
  // Read the unified themes.json. The component-tokens preprocessor first
  // expands carbon.themes entries into _by_theme.<theme> leaf nodes, then
  // flattenDualRole splits any dual-role nodes (value + children) so SD can
  // process them without losing children.
  const rawThemes = JSON.parse(
    fs.readFileSync(path.join(DTCG_DIR, 'themes.json'), 'utf8')
  );
  // The component-tokens preprocessor understands the { value, alpha } entry
  // shape from the unified file as well as the legacy bare-string shape from
  // component files. Run it first so carbon.themes entries become $value leaves.
  const expanded = carbonComponentTokensPreprocessor(rawThemes);
  // Now extract only this theme's _by_theme.<themeName> leaf nodes, rewriting
  // them back to plain $value tokens so the rest of the pipeline sees a normal
  // single-theme token tree.
  const rawSlice = extractThemeSlice(expanded, themeName);

  // Re-attach the per-theme color-scheme to the root $extensions so that
  // carbonThemeMetadataPreprocessor (which reads
  // dictionary.$extensions["org.carbon"]["color-scheme"]) can inject the
  // color-scheme synthetic token.  extractThemeSlice does not carry the root
  // $extensions through because they are global, not per-token.
  const themeSlice = {
    ...rawSlice,
    $extensions: {
      ...(rawSlice.$extensions ?? {}),
      'org.carbon': {
        ...(rawSlice.$extensions?.['org.carbon'] ?? {}),
        'color-scheme': THEME_COLOR_SCHEME[themeName],
      },
    },
  };

  const flatTokens = flattenDualRole(themeSlice);

  return {
    source: [path.join(DTCG_DIR, 'color-palette.json')],
    tokens: flatTokens,
    preprocessors: ['carbon/theme-metadata'],
    platforms: {
      // SCSS theme map
      [`scss/themes/${themeName}`]: {
        transformGroup: 'carbon',
        buildPath: SCSS_GENERATED + '/',
        files: [
          {
            // Each theme writes to its own temp file; a post-step
            // (buildAllPlatforms action) concatenates them into _themes.scss.
            destination: `_theme-${themeName}.scss`,
            format: 'carbon/scss-themes',
            options: { themeName },
            // Exclude palette reference tokens from the theme map.
            filter(token) {
              const role =
                token.$extensions?.['org.carbon']?.role ??
                token.extensions?.['org.carbon']?.role;
              return role !== 'reference';
            },
          },
        ],
      },
      // JS theme module
      [`js/themes/${themeName}`]: {
        transformGroup: 'carbon',
        buildPath: JS_GENERATED_THEMES + '/',
        files: [
          {
            destination: `${themeName}.js`,
            format: 'carbon/js-themes',
            options: { themeName, output: 'js' },
            filter(token) {
              const role =
                token.$extensions?.['org.carbon']?.role ??
                token.extensions?.['org.carbon']?.role;
              return role !== 'reference';
            },
          },
          {
            destination: `${themeName}.d.ts`,
            format: 'carbon/js-themes',
            options: { themeName, output: 'dts' },
            filter(token) {
              const role =
                token.$extensions?.['org.carbon']?.role ??
                token.extensions?.['org.carbon']?.role;
              return role !== 'reference';
            },
          },
        ],
      },
    },
  };
}

// ── Helper: build config for one component ───────────────────────────────────
function componentConfig(componentName) {
  return {
    source: [
      path.join(DTCG_DIR, 'color-palette.json'),
      path.join(DTCG_DIR, 'components', `${componentName}.json`),
    ],
    preprocessors: ['carbon/component-tokens'],
    platforms: {
      // SCSS component token map
      [`scss/component-tokens/${componentName}`]: {
        transformGroup: 'carbon',
        buildPath: SCSS_GENERATED + '/',
        files: [
          {
            destination: `_${componentName}-tokens.scss`,
            format: 'carbon/scss-component-tokens',
            filter(token) {
              // Only include expanded theme tokens (injected by preprocessor)
              return token.name.includes('-by-theme-');
            },
          },
        ],
      },
      // JS component token module
      [`js/component-tokens/${componentName}`]: {
        transformGroup: 'carbon',
        buildPath: JS_GENERATED_COMPONENTS + '/',
        files: [
          {
            destination: `${componentName}.js`,
            format: 'carbon/js-component-tokens',
            options: { output: 'js' },
            filter(token) {
              return token.name.includes('-by-theme-');
            },
          },
          {
            destination: `${componentName}.d.ts`,
            format: 'carbon/js-component-tokens',
            options: { output: 'dts' },
            filter(token) {
              return token.name.includes('-by-theme-');
            },
          },
        ],
      },
    },
  };
}

// ── _tokens.scss config ───────────────────────────────────────────────────────
//
// This file does not use token values at all — it reads from Carbon JS metadata
// directly.  We still run it through SD so it participates in buildAllPlatforms
// and can be tested alongside the other outputs.
const tokensConfig = {
  // No source files needed — format reads from src/tokens directly.
  source: [],
  platforms: {
    'scss/tokens': {
      transformGroup: 'carbon',
      buildPath: SCSS_GENERATED + '/',
      files: [
        {
          destination: '_tokens.scss',
          format: 'carbon/scss-tokens',
        },
      ],
    },
  },
};

// ── Build a registered SD instance ────────────────────────────────────────────
// In SD v5, register* methods live on the instance, not the class.
// We create one base instance with all plugins registered, then extend it
// per-config so each build inherits the registrations.
function createBase() {
  const base = new StyleDictionary({});
  // Register custom transforms BEFORE the transform group that references them.
  base.registerTransform(carbonNameKebab);
  base.registerTransform(carbonAlphaModifier);
  base.registerTransform(carbonColorFlatten);
  base.registerTransformGroup({
    name: 'carbon',
    transforms: CARBON_TRANSFORMS,
  });
  base.registerPreprocessor(carbonComponentTokensPreprocessorModule);
  base.registerPreprocessor(carbonThemeMetadataPreprocessor);
  base.registerFormat(carbonScssThemes);
  base.registerFormat(carbonScssTokens);
  base.registerFormat(carbonScssComponentTokens);
  base.registerFormat(carbonJsThemes);
  base.registerFormat(carbonJsComponentTokens);
  return base;
}

// ── SCSS build ────────────────────────────────────────────────────────────────
// Generates:
//   scss/generated/_themes.scss
//   scss/generated/_tokens.scss
//   scss/generated/_button-tokens.scss   (and tag, notification, status, content-switcher)
async function runScss() {
  const base = createBase();
  const scssTokensContent = await carbonScssTokens.format({
    dictionary: { allTokens: [] },
    options: {},
    file: {},
  });
  fs.ensureDirSync(SCSS_GENERATED);
  fs.writeFileSync(
    path.join(SCSS_GENERATED, '_tokens.scss'),
    scssTokensContent,
    'utf8'
  );

  // Per-theme maps — write to temp files, then concatenate
  for (const themeName of THEME_NAMES) {
    await (await base.extend(themeConfig(themeName))).buildAllPlatforms();
  }

  // Concatenate per-theme temp files into a single _themes.scss
  const themeParts = THEME_NAMES.map((name) => {
    const src = path.join(SCSS_GENERATED, `_theme-${name}.scss`);
    const content = fs.readFileSync(src, 'utf8');
    return name === THEME_NAMES[0]
      ? content
      : '\n' +
          content
            .replace(/^\/\/[^\n]*\n(?:\/\/[^\n]*\n)*/m, '') // strip banner
            .replace(/^@use [^\n]+\n/gm, '') // strip duplicate @use
            .replace(/^\n+/, ''); // collapse leading blanks
  });
  fs.writeFileSync(
    path.join(SCSS_GENERATED, '_themes.scss'),
    themeParts.join(''),
    'utf8'
  );
  for (const name of THEME_NAMES) {
    fs.removeSync(path.join(SCSS_GENERATED, `_theme-${name}.scss`));
  }

  // Component token maps
  for (const componentName of COMPONENT_NAMES) {
    await (
      await base.extend(componentConfig(componentName))
    ).buildAllPlatforms();
  }
}

// ── JS build ──────────────────────────────────────────────────────────────────
// Generates:
//   js/generated/themes/{white,g10,g90,g100}.{js,d.ts}
//   js/generated/component-tokens/{button,tag,…}.{js,d.ts}
async function runJs() {
  const base = createBase();

  for (const themeName of THEME_NAMES) {
    await (await base.extend(themeConfig(themeName))).buildAllPlatforms();
  }
  for (const componentName of COMPONENT_NAMES) {
    await (
      await base.extend(componentConfig(componentName))
    ).buildAllPlatforms();
  }
}

// ── Full build (SCSS + JS) ────────────────────────────────────────────────────
async function run() {
  await runScss();
  await runJs();
}

module.exports = {
  run,
  runScss,
  runJs,
  themeConfig,
  componentConfig,
  tokensConfig,
};
