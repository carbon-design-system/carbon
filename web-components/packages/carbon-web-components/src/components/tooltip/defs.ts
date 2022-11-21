/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * The alignment choices of tooltip.
 */
export enum TOOLTIP_ALIGNMENT {
  /**
   * Align the top/left position tooltip body to the one of its trigger button.
   */
  START = 'start',

  /**
   * Align the center position tooltip body to the one of its trigger button.
   */
  CENTER = 'center',

  /**
   * Align the bottom/right position tooltip body to the one of its trigger button.
   */
  END = 'end',
}

/**
 * The direction/positioning/orientation choices of tooltip.
 */
export enum TOOLTIP_DIRECTION {
  /**
   * Put tooltip body at the left of its trigger button.
   */
  LEFT = 'left',

  /**
   * Put tooltip body at the top of its trigger button.
   */
  TOP = 'top',

  /**
   * Put tooltip body at the right of its trigger button.
   */
  RIGHT = 'right',

  /**
   * Put tooltip body at the bottom of its trigger button.
   */
  BOTTOM = 'bottom',
}
