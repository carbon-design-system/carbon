/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * The LTR/RTL direction used for positioning floating menu.
 */
export enum FLOATING_MENU_POSITION_DIRECTION {
  /**
   * LTR.
   */
  LTR = 'ltr',

  /**
   * RTL.
   */
  RTL = 'rtl',
}

/**
 * The alignment choices of floating menu.
 */
export enum FLOATING_MENU_ALIGNMENT {
  /**
   * Align the top/left position menu body to the one of its trigger button.
   */
  START = 'start',

  /**
   * Align the center position menu body to the one of its trigger button.
   */
  CENTER = 'center',

  /**
   * Align the bottom/right position menu body to the one of its trigger button.
   */
  END = 'end',
}

/**
 * The direction/positioning/orientation choices of floating menu.
 */
export enum FLOATING_MENU_DIRECTION {
  /**
   * Put menu body at the left of its trigger button.
   */
  LEFT = 'left',

  /**
   * Put menu body at the top of its trigger button.
   */
  TOP = 'top',

  /**
   * Put menu body at the right of its trigger button.
   */
  RIGHT = 'right',

  /**
   * Put menu body at the bottom of its trigger button.
   */
  BOTTOM = 'bottom',
}

/**
 * The group of the direction/positioning/orientation choices of floating menu.
 */
export enum FLOATING_MENU_DIRECTION_GROUP {
  /**
   * Put menu body at the left/right of its trigger button.
   */
  HORIZONTAL = 'horizontal',

  /**
   * Put menu body at the top/bottom of its trigger button.
   */
  VERTICAL = 'vertical',
}
