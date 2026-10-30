/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Emits the token names behind `unstable_metadata`, in the order of the token
 * files: the theme tokens, the contextual tokens that the `layer` mixin in
 * `@carbon/styles` sets, and the tokens of each component.
 */

const { FILE_BANNER, kebabToCamel, toSource } = require('./js');

// `status-accessibility-background` was added for the icon indicator, its
// design questions were never settled, and `@carbon/styles` doesn't emit it as
// a CSS custom property. Leaving it out of `unstable_metadata` until it's either
// finished or removed.
// TODO: decide its status, see https://github.com/carbon-design-system/carbon/issues/17539
const EXCLUDED_TOKENS = new Set(['status-accessibility-background']);

/**
 * @param {{
 *   tokens: Array<{ name: string }>,
 *   contextual: string[],
 *   components: Record<string, Array<{ name: string }>>,
 * }} theme
 * @param {'js' | 'dts'} output
 * @returns {string}
 */
function jsMetadata(theme, output) {
  const list = (names) =>
    `[\n${names.map((name) => `  ${toSource(name)},\n`).join('')}]`;
  const components = Object.keys(theme.components)
    .map((component) => [kebabToCamel(component), component])
    .sort(([a], [b]) => (a < b ? -1 : 1));

  if (output === 'dts') {
    return (
      [
        FILE_BANNER,
        'export declare const tokens: string[];',
        'export declare const contextual: string[];',
        'export declare const components: Record<string, string[]>;',
      ].join('\n') + '\n'
    );
  }

  const componentEntries = components
    .map(([key, component]) => {
      const names = theme.components[component]
        .map(({ name }) => name)
        .filter((name) => !EXCLUDED_TOKENS.has(name));
      return `  ${key}: ${list(names).replace(/\n/g, '\n  ')},`;
    })
    .join('\n');

  return (
    [
      FILE_BANNER,
      `export const tokens = ${list(theme.tokens.map(({ name }) => name))};`,
      `export const contextual = ${list(theme.contextual)};`,
      `export const components = {\n${componentEntries}\n};`,
    ].join('\n') + '\n'
  );
}

module.exports = jsMetadata;
