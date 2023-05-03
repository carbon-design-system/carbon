/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import chalk from 'chalk';
import { diff as jestDiff } from 'jest-diff';

/**
 * @param {any} a
 * @param {any} b
 * @param {object} [options]
 * @returns {string}
 */
export function diff(a, b, options = {}) {
  const defaultOptions = {
    aAnnotation: 'Original',
    aColor: chalk.red,
    bAnnotation: 'Modified',
    bColor: chalk.green,
  };
  return jestDiff(a, b, {
    ...defaultOptions,
    ...options,
  });
}
