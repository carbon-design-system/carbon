/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * The keyboard action categories for dropdown.
 */
export enum TABS_KEYBOARD_ACTION {
  /**
   * Not doing any action.
   */
  NONE = 'none',

  /**
   * Keyboard action to navigate back/forward.
   */
  NAVIGATING = 'navigating',

  /**
   * Keyboard action to navigate to first tab using home key
   */
  HOME = 'home',

  /**
   * Keyboard action to navigate to last tab using end key
   */
  END = 'end',
}

/**
 * Tabs types.
 */
export enum TABS_TYPE {
  /**
   * Regular tabs.
   */
  REGULAR = '',

  /**
   * Container type.
   */
  CONTAINER = 'container',

  /**
   * Contained type.
   */
  CONTAINED = 'contained',
}
