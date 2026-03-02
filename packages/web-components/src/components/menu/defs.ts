/**
 * Copyright IBM Corp. 2020, 2022, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Menu size.
 */
export enum MENU_SIZE {
  /**
   * extra small size.
   */
  EXTRA_SMALL = 'xs',
  /**
   * Small size.
   */
  SMALL = 'sm',

  /**
   * Medium size.
   */
  MEDIUM = 'md',

  /**
   * Large size.
   */
  LARGE = 'lg',
}
/**
 * menu item kind
 */
export enum MENU_ITEM_KIND {
  /**
   * default kind
   */
  DEFAULT = 'default',
  /**
   * danger kind
   */
  DANGER = 'danger',
}

/**
 * Menu background token.
 */
export enum MENU_BACKGROUND_TOKEN {
  /**
   * Use the layer token for the background.
   */
  LAYER = 'layer',

  /**
   * Use the background token for the background.
   */
  BACKGROUND = 'background',
}
