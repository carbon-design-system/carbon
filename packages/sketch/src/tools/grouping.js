/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sort a collection by keys determined by a sorter. Useful for organizing a
 * flat array by figuring out a key for each element and grouping that element
 * along with others that have the same key.
 *
 * @param {Array} collection
 * @param {Function} sorter
 * @returns {Array}
 * @example
 *   const array = [1, 2, 3, 4];
 *   const { even, odd } = groupByKey(array, number => {
 *     if (number % 2 === 0) {
 *       return 'even';
 *     }
 *     return 'odd';
 *   });
 *   console.log(even); // [2, 4]
 *   console.log(odd); // [1, 3]
 */
export function groupByKey(collection, sorter) {
  const result = {};

  for (let i = 0; i < collection.length; i++) {
    const element = collection[i];
    const key = sorter(element, i);

    if (!result[key]) {
      result[key] = [];
    }

    result[key].push(element);
  }

  return result;
}
