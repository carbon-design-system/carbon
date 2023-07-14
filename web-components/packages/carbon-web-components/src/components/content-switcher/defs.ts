/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Navigation direction, associated with key symbols.
 */
export const NAVIGATION_DIRECTION = {
  Left: -1,
  ArrowLeft: -1,
  Right: 1,
  ArrowRight: 1,
};

/**
 * Button size.
 */
export enum CONTENT_SWITCHER_SIZE {
  /**
   * Regular size.
   */
  REGULAR = '',

  /**
   * Small size.
   */
  SMALL = 'sm',

  /**
   * Large size.
   */
  LARGE = 'lg',

  // TODO: deprecate
  /**
   * X-Large size.
   */
  EXTRA_LARGE = 'xl',
}
