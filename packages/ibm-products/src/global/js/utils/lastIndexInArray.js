/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * This utility will return the index of the last instance of an
 * item in the given array of objects whose key is equal to the value
 * parameter. If there are no matches, -1 is returned as similar to findIndex
 * @param {Array<Object.*>} array
 * @param {string} key
 * @param {string|boolean|number} value
 */
export const lastIndexInArray = (array, key, value) => {
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i]?.[key] === value) {
      return i + 1;
    }
  }
  return -1;
};
