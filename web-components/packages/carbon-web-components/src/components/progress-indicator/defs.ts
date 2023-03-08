/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * State of progress step.
 */
export enum PROGRESS_STEP_STAT {
  /**
   * Complete one.
   */
  COMPLETE = 'complete',

  /**
   * One that is being executed now.
   */
  CURRENT = 'current',

  /**
   * One for future execution.
   */
  INCOMPLETE = 'incomplete',

  /**
   * Invalid one.
   */
  INVALID = 'invalid',
}
