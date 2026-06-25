/**
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Iterates through a numeric range and calls callback
// function for each iteration
export const rangeWithCallback = (start, end, fn) => {
  for (let i = start; i <= end; i++) {
    fn(i);
  }
};
