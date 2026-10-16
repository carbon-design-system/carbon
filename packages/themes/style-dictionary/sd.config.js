/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Style Dictionary build for @carbon/themes.
 *
 * `tokens/themes.resolver.json` lists the token files of each theme. Every
 * theme is one Style Dictionary run that resolves references and converts
 * colors to CSS values. The formats in this directory then write the
 * generated Sass and JS from the resolved tokens of all themes, because the
 * component token outputs hold every theme's value side by side.
 */

const path = require('path');
const fs = require('fs-extra');
const { default: StyleDictionary } = require('style-dictionary');

const { readResolver } = require('./resolver');
const jsonPointerReferences = require('./preprocessors/json-pointer-references');
const colorFlatten = require('./transforms/color-flatten');
const scssThemes = require('./formats/scss-themes');
const scssTokens = require('./formats/scss-tokens');
const scssComponentTokens = require('./formats/scss-component-tokens');
const jsThemes = require('./formats/js-themes');
const jsComponentTokens = require('./formats/js-component-tokens');

const ROOT = path.resolve(__dirname, '..');
const RESOLVER = path.join(ROOT, 'tokens', 'themes.resolver.json');
const SCSS_GENERATED = path.join(ROOT, 'scss', 'generated');
const JS_GENERATED = path.join(ROOT, 'js', 'generated');

const EXTENSION_NAMESPACE = 'com.ibm.carbon';
const TOKEN_FILE_EXTENSION = '.tokens.json';
// the token file that holds a theme's own tokens; every other file in a theme
// holds the tokens of the component it is named after
const THEME_TOKEN_FILE = 'theme';

// Root-level `$schema` and `$description` describe a file, not its tokens.
// Dropping them keeps Style Dictionary from reporting a collision for every
// file it merges, so that real token collisions can fail the build.
const tokenFileParser = {
  name: 'carbon/token-file',
  pattern: /\.tokens\.json$/,
  parser({ contents }) {
    const { $schema, $description, ...tokens } = JSON.parse(contents);
    return tokens;
  },
};

/**
 * Resolves the tokens of one theme.
 *
 * @param {ReturnType<typeof readResolver>} resolver
 * @param {string} themeName
 * @returns {Promise<{
 *   name: string,
 *   tokens: Array<{ name: string, value: string }>,
 *   components: Record<string, Array<{ name: string, value: string, fallback?: string }>>,
 * }>}
 */
async function resolveTheme(resolver, themeName) {
  const base = new StyleDictionary({});
  base.registerParser(tokenFileParser);
  base.registerPreprocessor(jsonPointerReferences);
  base.registerTransform(colorFlatten);

  const sd = await base.extend({
    ...resolver.resolve({ theme: themeName }),
    parsers: [tokenFileParser.name],
    preprocessors: [jsonPointerReferences.name],
    platforms: {
      css: { transforms: [colorFlatten.name] },
    },
    log: { warnings: 'error' },
  });
  const { allTokens } = await sd.getPlatformTokens('css');

  const theme = { name: themeName, tokens: [], components: {} };
  for (const token of allTokens) {
    // palette tokens are only there to be referenced
    if (!token.isSource) {
      continue;
    }

    const file = path.basename(token.filePath, TOKEN_FILE_EXTENSION);
    const entry = { name: token.path.join('-'), value: token.$value };
    if (file === THEME_TOKEN_FILE) {
      theme.tokens.push(entry);
      continue;
    }

    const fallback = token.$extensions?.[EXTENSION_NAMESPACE]?.fallback;
    if (fallback !== undefined) {
      entry.fallback = fallback;
    }
    theme.components[file] ??= [];
    theme.components[file].push(entry);
  }

  const colorScheme =
    sd.tokens.$extensions?.[EXTENSION_NAMESPACE]?.['color-scheme'];
  if (colorScheme) {
    theme.tokens.push({ name: 'color-scheme', value: colorScheme });
  }

  return theme;
}

/**
 * @returns {Promise<Array<Awaited<ReturnType<typeof resolveTheme>>>>}
 */
async function resolveThemes() {
  const resolver = readResolver(RESOLVER);
  const themes = [];
  for (const themeName of resolver.contexts('theme')) {
    themes.push(await resolveTheme(resolver, themeName));
  }
  return themes;
}

/**
 * Combines the per-theme component tokens into one entry per token that holds
 * its value in every theme that defines it.
 *
 * @param {Awaited<ReturnType<typeof resolveThemes>>} themes
 * @returns {Record<string, Array<{ name: string, values: Record<string, string> }>>}
 */
function combineComponentTokens(themes) {
  const components = {};
  for (const theme of themes) {
    for (const [component, tokens] of Object.entries(theme.components)) {
      components[component] ??= new Map();
      for (const { name, value, fallback } of tokens) {
        if (!components[component].has(name)) {
          components[component].set(
            name,
            fallback === undefined ? {} : { fallback }
          );
        }
        components[component].get(name)[theme.name] = value;
      }
    }
  }

  return Object.fromEntries(
    Object.entries(components).map(([component, tokens]) => [
      component,
      Array.from(tokens, ([name, values]) => ({ name, values })),
    ])
  );
}

// SCSS build
// Generates:
//   scss/generated/_themes.scss
//   scss/generated/_tokens.scss
//   scss/generated/_button-tokens.scss   (and tag, notification, status, content-switcher)
async function runScss() {
  const themes = await resolveThemes();
  const files = {
    '_tokens.scss': await scssTokens.format(),
    '_themes.scss': scssThemes(themes),
  };
  for (const [component, tokens] of Object.entries(
    combineComponentTokens(themes)
  )) {
    files[`_${component}-tokens.scss`] = scssComponentTokens(tokens);
  }

  for (const [file, content] of Object.entries(files)) {
    fs.outputFileSync(path.join(SCSS_GENERATED, file), content, 'utf8');
  }
}

// JS build
// Generates:
//   js/generated/themes/{white,g10,g90,g100}.{js,d.ts}
//   js/generated/component-tokens/{button,tag,…}.{js,d.ts}
async function runJs() {
  const themes = await resolveThemes();
  const files = {};
  for (const { name, tokens } of themes) {
    files[`themes/${name}.js`] = jsThemes(tokens, 'js');
    files[`themes/${name}.d.ts`] = jsThemes(tokens, 'dts');
  }
  for (const [component, tokens] of Object.entries(
    combineComponentTokens(themes)
  )) {
    files[`component-tokens/${component}.js`] = jsComponentTokens(tokens, 'js');
    files[`component-tokens/${component}.d.ts`] = jsComponentTokens(
      tokens,
      'dts'
    );
  }

  for (const [file, content] of Object.entries(files)) {
    fs.outputFileSync(path.join(JS_GENERATED, file), content, 'utf8');
  }
}

// Full build (SCSS + JS)
async function run() {
  await runScss();
  await runJs();
}

module.exports = {
  run,
  runScss,
  runJs,
  resolveThemes,
  combineComponentTokens,
};
