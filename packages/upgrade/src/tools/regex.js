/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

function createFunctionRegex(name) {
  const parts = [
    // Make sure there is a space before the group, useful for things that might
    // intersect
    '(?<=[ \\(])',
    // Positive lookahead for the function definition
    // Support one-line, `my-function()` and multi-line `my-function(\n`
    `(?=${name}\\(.*[)\n])`,
    // Negative lookahead for checking if already migrated
    '(?<!carbon--)',
    // Capture the name of the function itself to change
    `(${name})`,
  ];
  return new RegExp(parts.join(''), 'gm');
}

function createMixinRegex(name) {
  const parts = [
    // Make sure there is a space before the group, useful for things that might
    // intersect
    '(?<=[ \\(])',
    // Positive lookahead for the function definition
    // Support one-line, `my-function()` and multi-line `my-function(\n`
    `(?=${name}\\(.*[)\n])?`,
    // Negative lookahead for checking if already migrated
    '(?<!carbon--)',
    // Capture the name of the function itself to change
    `(${name})`,
  ];
  return new RegExp(parts.join(''), 'gm');
}

function createVariableRegex(name) {
  return new RegExp(`\\$${name}`, 'gm');
}

module.exports = {
  createFunctionRegex,
  createMixinRegex,
  createVariableRegex,
};
