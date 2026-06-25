/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const debounce = (func: any, delay: number, leading = true) => {
  let timeout: ReturnType<typeof setTimeout> | null;
  return (...args: []) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    if (leading && !timeout) {
      func(...args);
    }
    timeout = setTimeout(() => {
      timeout = null;
      if (!leading) {
        func(...args);
      }
    }, delay);
  };
};
