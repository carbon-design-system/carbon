/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Sorts tokens into the order of the published Sass and JS outputs.
 *
 * Token files list tokens in the authored order, grouped by what they style.
 * The generated outputs keep the order of the build that predates the token
 * files: token names split on `-` into nested object keys, then read depth
 * first. JavaScript lists integer-like keys first and in numeric order, then
 * the rest in insertion order, so at each level: numeric segments ascending,
 * then the token itself, then the other segments alphabetically. That's why
 * `syntax-heading` follows `syntax-heading-1` ... `syntax-heading-6`.
 *
 * @template {{ name: string }} T
 * @param {T[]} tokens
 * @returns {T[]}
 */
function legacyOrder(tokens) {
  const root = { children: new Map() };
  for (const token of tokens) {
    let node = root;
    for (const segment of token.name.split('-')) {
      if (!node.children.has(segment)) {
        node.children.set(segment, { children: new Map() });
      }
      node = node.children.get(segment);
    }
    node.token = token;
  }

  const isInteger = (segment) => /^(0|[1-9]\d*)$/.test(segment);
  const sorted = [];
  (function walk(node) {
    const segments = Array.from(node.children.keys());
    const integers = segments.filter(isInteger).sort((a, b) => a - b);
    const others = segments.filter((segment) => !isInteger(segment)).sort();

    for (const segment of integers) {
      walk(node.children.get(segment));
    }
    if (node.token) {
      sorted.push(node.token);
    }
    for (const segment of others) {
      walk(node.children.get(segment));
    }
  })(root);

  return sorted;
}

module.exports = { legacyOrder };
