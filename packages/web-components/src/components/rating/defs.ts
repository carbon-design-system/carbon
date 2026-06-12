/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Rating variant.
 */
export enum RATING_VARIANT {
  /**
   * Star rating
   */
  STAR = 'star',
  /**
   * Thumbs up/down
   */
  THUMB = 'thumb',
  /**
   * Net Promoter Score
   */
  NPS = 'nps',
}

/**
 * Rating size.
 */
export enum RATING_SIZE {
  /**
   * Small size
   */
  SMALL = 'sm',
  /**
   * Medium size (default)
   */
  MEDIUM = 'md',
  /**
   * Large size
   */
  LARGE = 'lg',
}
