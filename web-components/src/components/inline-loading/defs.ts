/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Loading state for inline loading spinner.
 */
export enum INLINE_LOADING_STATE {
  /**
   * Inactive state.
   */
  INACTIVE = 'inactive',

  /**
   * State for loading in progress.
   */
  ACTIVE = 'active',

  /**
   * State for loading successful.
   */
  FINISHED = 'finished',

  /**
   * State for loading failure.
   */
  ERROR = 'error',
}
