/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022, 2023
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
 * The direction/positioning/orientation choices of floating menu.
 */
export enum FLOATING_MENU_DIRECTION {
  /**
   * Put menu body at the top of its trigger button.
   */
  TOP = 'top',

  /**
   * Put menu body at the bottom of its trigger button.
   */
  BOTTOM = 'bottom',
}
