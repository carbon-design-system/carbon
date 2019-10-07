/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Shallow compare two arrays for equality
 * @param {Array} arr1 the first array
 * @param {Array} arr2 the second array
 * @returns {boolean} true if both arrays have the same contents, otherwise false
 */
export function equals(arr1, arr2) {
  if (
    !Array.isArray(arr1) ||
    !Array.isArray(arr2) ||
    arr1.length !== arr2.length
  ) {
    return false;
  }
  if (arr1 === arr2) {
    return true;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

/**
 * helper to define valid column widths for prop checking
 *
 * @param {object} params - inclusive edge markers
 * @param {number} params.start
 * @param {number} params.end
 * @returns {number[]} arr with each item having val of its index
 */
export const range = ({ start = 0, end }) =>
  [...Array(end - start + 1)].map((_, i) => i);
