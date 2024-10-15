/**
 * @license
 *
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Multi-select selection feedback options.
 */
export enum SELECTION_FEEDBACK_OPTION {
  /**
   * selected item stays at it's position
   */
  FIXED = 'fixed',

  /**
   * selected item jumps to top
   */
  TOP = 'top',

  /**
   * selected item jump to top after reopen dropdown
   */
  TOP_AFTER_REOPEN = 'top-after-reopen',
}
