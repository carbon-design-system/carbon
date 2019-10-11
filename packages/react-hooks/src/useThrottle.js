/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useDebounce } from './useDebounce';

/**
 * Returns a throttle value that is updated at most once per every `wait`
 * milliseconds.
 *
 * @param {any} value
 * @param {number} wait
 * @param {object} options
 * @param {boolean} options.leading
 * @param {boolean} options.trailing
 * @returns {[any, Function]}
 */
export function useThrottle(value, wait = 0, options = {}) {
  const { leading = true, trailing = true } = options;
  return useDebounce(value, wait, {
    leading,
    trailing,
    maxWait: wait,
  });
}
