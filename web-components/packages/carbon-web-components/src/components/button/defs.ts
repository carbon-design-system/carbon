/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Button kinds.
 */
export enum BUTTON_KIND {
  /**
   * Primary button.
   */
  PRIMARY = 'primary',

  /**
   * Secondary button.
   */
  SECONDARY = 'secondary',

  /**
   * Tertiary button.
   */
  TERTIARY = 'tertiary',

  /**
   * Ghost button.
   */
  GHOST = 'ghost',

  /**
   * Danger button.
   */
  DANGER = 'danger',

  /**
   * Danger tertiary button.
   */
  DANGER_TERTIARY = 'danger-tertiary',

  /**
   * Danger ghost button,
   */
  DANGER_GHOST = 'danger-ghost',
}

/**
 * Button size.
 */
export enum BUTTON_SIZE {
  /**
   * Regular size.
   */
  REGULAR = '',

  /**
   * Small size.
   */
  SMALL = 'sm',

  /**
   * X-Large size.
   */
  EXTRA_LARGE = 'xl',

  /**
   * Size for form field.
   */
  FIELD = 'field',
}

/**
 * Button icon layout.
 */
export enum BUTTON_ICON_LAYOUT {
  /**
   * Regular layout.
   */
  REGULAR = '',

  /**
   * Condensed layout.
   */
  CONDENSED = 'condensed',
}
