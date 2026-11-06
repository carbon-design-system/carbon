/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Resolves the JSON Pointer references (`{ "$ref": "#/…" }`) inside token
 * values. Style Dictionary only resolves curly-brace aliases, which always
 * point at a whole token. Theme tokens use JSON Pointer references to reuse
 * the components of a palette color with their own alpha:
 *
 *   "$value": {
 *     "colorSpace": { "$ref": "#/gray/50/$value/colorSpace" },
 *     "components": { "$ref": "#/gray/50/$value/components" },
 *     "alpha": 0.5
 *   }
 *
 * Pointers resolve against the merged dictionary, so they can point at tokens
 * from any source file.
 *
 * @see https://www.designtokens.org/tr/2025.10/format/#json-pointer-notation
 * @param {object} dictionary
 * @returns {object}
 */
function jsonPointerReferences(dictionary) {
  function lookup(pointer, seen = []) {
    if (seen.includes(pointer)) {
      throw new Error(`Circular reference: ${[...seen, pointer].join(' → ')}`);
    }
    if (!pointer.startsWith('#/')) {
      throw new Error(`Unsupported reference "${pointer}"`);
    }

    let target = dictionary;
    for (const segment of pointer.slice(2).split('/')) {
      const key = segment.replace(/~1/g, '/').replace(/~0/g, '~');
      if (target === null || typeof target !== 'object' || !(key in target)) {
        throw new Error(`Reference "${pointer}" does not resolve`);
      }
      target = target[key];
    }
    return resolve(target, [...seen, pointer]);
  }

  function resolve(value, seen) {
    if (Array.isArray(value)) {
      return value.map((item) => resolve(item, seen));
    }
    if (value === null || typeof value !== 'object') {
      return value;
    }
    if (typeof value.$ref === 'string') {
      return lookup(value.$ref, seen);
    }
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, resolve(item, seen)])
    );
  }

  function walk(node) {
    for (const [key, child] of Object.entries(node)) {
      if (key === '$ref') {
        // Style Dictionary drops these tokens without a warning
        throw new Error('Whole-token `$ref` aliases are not supported');
      }
      if (key === '$value') {
        node.$value = resolve(child);
      } else if (!key.startsWith('$') && child && typeof child === 'object') {
        walk(child);
      }
    }
  }

  walk(dictionary);
  return dictionary;
}

module.exports = {
  name: 'carbon/json-pointer-references',
  preprocessor: jsonPointerReferences,
};
