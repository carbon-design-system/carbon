/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export { FORM_ELEMENT_COLOR_SCHEME as INPUT_COLOR_SCHEME } from '../../globals/shared-enums';

/**
 * Input size.
 */
export enum INPUT_SIZE {
  /**
   * Small size.
   */
  SMALL = 'sm',

  /**
   * Regular size, same as medium size.
   */
  MEDIUM = 'md',

  /**
   * Large size.
   */
  LARGE = 'lg',
}

/**
 * Input tooltop alignment
 */
export enum INPUT_TOOLTIP_ALIGNMENT {
  START = 'start',

  CENTER = 'center',

  END = 'end',
}

/**
 * Input tooltop direction
 */
export enum INPUT_TOOLTIP_DIRECTION {
  TOP = 'top',

  RIGHT = 'right',

  BOTTOM = 'bottom',

  LEFT = 'left',
}

/**
 * Supported input types.
 *
 * For this component we only support password and text
 */
export enum INPUT_TYPE {
  PASSWORD = 'password',
  TEXT = 'text',
}
