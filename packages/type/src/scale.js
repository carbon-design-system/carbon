/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Get the type size for the given step
 * @param {number} step
 * @returns {number}
 */
export function getTypeSize(step) {
  if (step <= 1) {
    return 12;
  }
  // Yn = Yn-1 + {FLOOR[(n - 2) / 4] + 1} * 2
  return getTypeSize(step - 1) + Math.floor((step - 2) / 4 + 1) * 2;
}

/**
 * The default type scale for 23 steps. Inlined as an array here through running
 * the follow step:
 *
 * > Array.from({ length: 23 }, (_, i) => getTypeSize(i + 1))
 */

//values in pixels
export const scale = [
  12, //scale[0]
  14, //scale[1]
  16, //scale[2]
  18, //scale[3]
  20, //scale[4]
  24, //scale[5]
  28, //scale[6]
  32, //scale[7]
  36, //scale[8]
  42, //scale[9]
  48, //scale[10]
  54, //scale[11]
  60, //scale[12]
  68, //scale[13]
  76, //scale[14]
  84, //scale[15]
  92, //scale[16]
  102, //scale[17]
  112, //scale[18]
  122, //scale[19]
  132, //scale[20]
  144, //scale[21]
  156, //scale[22]
];
