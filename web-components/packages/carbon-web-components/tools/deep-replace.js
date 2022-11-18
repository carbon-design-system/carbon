/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const isPlainObj = require('is-plain-obj');

/**
 * The parent nodes in object tree.
 *
 * @typedef {object} deepReplace~parent
 * @property {string|number} key The object property name or the array index.
 * @property {string|number} value The object property value or the array item value.
 */

/**
 * The callback used for testing a node in object tree.
 *
 * @callback deepReplace~matcher
 * @param itemValue The object property value or the array item value.
 * @param {string|number} key The object property name or the array index.
 * @param {object|Array} parent The parent object or array.
 * @param {deepReplace~parent[]} parents The parent properties.
 * @returns {boolean} `true` if this node should be replaced.
 */

/**
 * The callback used for replacing a node in object tree.
 *
 * @callback deepReplace~replacer
 * @param itemValue The object property value or the array item value.
 * @param {string|number} key The object property name or the array index.
 * @param {object|Array} parent The parent object or array.
 * @param {deepReplace~parent[]} parents The parent properties.
 * @returns The new value. If `deepReplace.DELETE` is returned, the node will be removed.
 */

/**
 * @param {object|Array} value An object or an array.
 * @param {deepReplace~matcher} matcher The callback to test if a node this object tree should be replaced.
 * @param {deepReplace~replacer} replacer The callback that returns the new value of a node in this object tree.
 * @param {deepReplace~parent[]} parents PRIVATE. The parent object nodes of the given `value`.
 * @returns {object} The new object with the given `replacer` applied.
 */
function deepReplace(value, matcher, replacer, parents = []) {
  function mapPredicate(itemValue, key, parent) {
    const matches = matcher(itemValue, key, parent, parents);
    const newItemValue = !matches ? itemValue : replacer(itemValue, key, parent, parents);
    return deepReplace(newItemValue, matcher, replacer, parents.concat({ key, value: newItemValue }));
  }
  if (isPlainObj(value)) {
    return Object.keys(value).reduce((acc, key) => {
      const newItemValue = mapPredicate(value[key], key, value);
      if (newItemValue !== deepReplace.DELETE) {
        acc[key] = newItemValue;
      }
      return acc;
    }, {});
  }
  if (Array.isArray(value)) {
    return value.map(mapPredicate).filter((itemValue) => itemValue !== deepReplace.DELETE);
  }
  return value;
}

/**
 * @param {deepReplace~parent[]} nodes A list of object nodes.
 * @returns {Array} The dotted list of the property names. Array indices are omitted.
 */
function getPaths(nodes) {
  return nodes
    .filter((item) => typeof item.key === 'string')
    .map((item) => item.key)
    .join('.');
}

deepReplace.getPaths = getPaths;
deepReplace.DELETE = Symbol('delete');

module.exports = deepReplace;
