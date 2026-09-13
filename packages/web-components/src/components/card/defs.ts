/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Card density.
 */
export enum CARD_DENSITY {
  /**
   * Productive density — heading-compact-02 typography.
   */
  PRODUCTIVE = 'productive',

  /**
   * Expressive density — heading-03 typography.
   */
  EXPRESSIVE = 'expressive',
}

/**
 * Horizontal card media position.
 */
export enum CARD_MEDIA_POSITION {
  /**
   * Media on the inline-start side (default).
   */
  START = 'start',

  /**
   * Media on the inline-end side.
   */
  END = 'end',
}
