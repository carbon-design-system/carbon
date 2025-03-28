/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { noopFn } from './noopFn';

/**
 * Logs a warning.
 *
 * The warning is only logged if the condition is not met and  `__DEV__` is
 * truthy.
 *
 * @param condition - Condition to evaluate.
 * @param message - Warning message.
 * @throws Error if no `message` is provided.
 */
export const warning: (condition: boolean, message: string) => void = __DEV__
  ? (condition, message) => {
      if (typeof message === 'undefined') {
        throw new Error(
          '`warning(condition, message)` requires a warning ' +
            'format argument'
        );
      }

      if (!condition) {
        console.warn('Warning: ' + message);
      }
    }
  : noopFn;
