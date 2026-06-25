/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const throttle = (fn, delay: number = 100) => {
  let time = Date.now();

  return () => {
    if (time + delay - Date.now() <= 0) {
      fn();
      time = Date.now();
    }
  };
};
