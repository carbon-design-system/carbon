/**
 * @license
 *
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Status of progress bar.
 */
export enum PROGRESS_BAR_STATUS {
  /**
   * Currently active.
   */
  ACTIVE = 'active',

  /**
   * Executed.
   */
  FINISHED = 'finished',

  /**
   * Invalid.
   */
  ERROR = 'error',
}

/**
 * Size of progress bar.
 */
export enum PROGRESS_BAR_SIZE {
  /**
   * small size (thinner)
   */
  SMALL = 'small',

  /**
   * big size
   */
  BIG = 'big',
}

/**
 * Defines the alignment variant of the progress bar.
 */
export enum PROGRESS_BAR_TYPE {
  /**
   * default type
   */
  DEFAULT = 'default',

  /**
   * Inline type
   */
  INLINE = 'inline',

  /**
   * indented type
   */
  INDENTED = 'indented',
}
