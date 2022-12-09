/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export { FORM_ELEMENT_COLOR_SCHEME as TABS_COLOR_SCHEME } from '../../globals/shared-enums';

/**
 * Navigation direction for narrow mode, associated with key symbols.
 */
export const NAVIGATION_DIRECTION_NARROW = {
  Up: -1,
  ArrowUp: -1,
  Down: 1,
  ArrowDown: 1,
};

/**
 * The keyboard action categories for dropdown.
 */
export enum TABS_KEYBOARD_ACTION {
  /**
   * Not doing any action.
   */
  NONE = 'none',

  /**
   * Keyboard action to close menu.
   */
  CLOSING = 'closing',

  /**
   * Keyboard action to navigate back/forward.
   */
  NAVIGATING = 'navigating',

  /**
   * Keyboard action to open/close menu on the trigger button or select/deselect a menu item.
   */
  TRIGGERING = 'triggering',

  /**
   * Keyboard action to trigger tab selection using enter key
   */
  SELECTING = 'selecting',

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
}
