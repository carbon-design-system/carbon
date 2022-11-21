/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * State of progress step.
 */
export enum PROGRESS_STEP_STAT {
  /**
   * One for future execution.
   */
  QUEUED = 'queued',

  /**
   * One that is being executed now.
   */
  CURRENT = 'current',

  /**
   * Complete one.
   */
  COMPLETE = 'complete',

  /**
   * Invalid one.
   */
  INVALID = 'invalid',
}
