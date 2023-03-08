/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
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
  TOP = 'top',

  /**
   * Align the top-left position tooltip body to the one of its trigger button.
   */
  TOP_LEFT = 'top-left',

  /**
   * Align the top right position tooltip body to the one of its trigger button.
   */
  TOP_RIGHT = 'top-right',

  /**
   * Align the bottom position tooltip body to the one of its trigger button.
   */
  BOTTOM = 'bottom',

  /**
   * Align the bottom left position tooltip body to the one of its trigger button.
   */
  BOTTOM_LEFT = 'bottom-left',

  /**
   * Align the bottom right position tooltip body to the one of its trigger button.
   */
  BOTTOM_RIGHT = 'bottom-right',

  /**
   * Align the left position tooltip body to the one of its trigger button.
   */
  LEFT = 'left',

  /**
   * Align the left bottom position tooltip body to the one of its trigger button.
   */
  LEFT_BOTTOM = 'left-bottom',

  /**
   * Align the left top position tooltip body to the one of its trigger button.
   */
  LEFT_TOP = 'left-top',

  /**
   * Align the right position tooltip body to the one of its trigger button.
   */
  RIGHT = 'right',

  /**
   * Align the right bottom position tooltip body to the one of its trigger button.
   */
  RIGHT_BOTTOM = 'right-bottom',

  /**
   * Align the right top position tooltip body to the one of its trigger button.
   */
  RIGHT_TOP = 'right-top,',
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
