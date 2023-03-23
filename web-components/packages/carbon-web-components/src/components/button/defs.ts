/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Button kind.
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
 * Button type.
 */
export enum BUTTON_TYPE {
  /**
   * Default button type.
   */
  BUTTON = 'button',

  /**
   * Reset button type.
   */
  RESET = 'reset',

  /**
   * Submit button type.
   */
  SUBMIT = 'submit',
}

/**
 * Button size.
 */
export enum BUTTON_SIZE {
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

  /**
   * X-Large size.
   */
  EXTRA_LARGE = 'xl',

  /**
   * 2X-Large size.
   */
  EXTRA_EXTRA_LARGE = '2xl',
}

/**
 * Button tooltip alignment.
 */
export enum BUTTON_TOOLTIP_ALIGNMENT {
  /**
   * Aligned to the start.
   */
  START = 'left',

  /**
   * Aligned to the center.
   */
  CENTER = '',

  /**
   * Aligned to the end.
   */
  END = 'right',
}

/**
 * Button tooltip position.
 */
export enum BUTTON_TOOLTIP_POSITION {
  /**
   * Positioned on the top.
   */
  TOP = 'top',

  /**
   * Positioned on the right.
   */
  RIGHT = 'right',

  /**
   * Positioned on the bottom.
   */
  BOTTOM = 'bottom',

  /**
   * Positined on the left.
   */
  LEFT = 'left',
}
