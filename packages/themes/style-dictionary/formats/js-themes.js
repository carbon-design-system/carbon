/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Emits the ES module for one theme, `export const camelName = value;`, or
 * its companion TypeScript declarations.
 */

const { FILE_BANNER, kebabToCamel, toSource } = require('./js');

/**
 * @param {Array<{ name: string, value: string }>} tokens
 * @param {'js' | 'dts'} output
 * @returns {string}
 */
function jsThemes(tokens, output) {
  const lines = tokens.map(({ name, value }) => {
    const camelName = kebabToCamel(name);
    if (output === 'dts') {
      const tsType = typeof value === 'string' ? 'string' : 'number';
      return `export declare const ${camelName}: ${tsType};`;
    }
    return `export const ${camelName} = ${toSource(value)};`;
  });

  return [FILE_BANNER, ...lines].join('\n') + '\n';
}

module.exports = jsThemes;
