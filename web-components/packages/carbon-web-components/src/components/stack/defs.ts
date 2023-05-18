/**
 * @license
 *
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { spacing } from '@carbon/layout';

/**
 * Stack orientation
 */
export enum STACK_ORIENTATION {
  /**
   * Default vertical orientation.
   */
  VERTICAL = 'vertical',

  /**
   * Horizontal.
   */
  HORIZONTAL = 'horizontal',
}

/**
 * The steps in the spacing scale
 *
 * @type {Array<number>}
 */
export const SPACING_STEPS = Array.from({ length: spacing.length - 1 }).map(
  (_, step) => {
    return step + 1;
  }
);
