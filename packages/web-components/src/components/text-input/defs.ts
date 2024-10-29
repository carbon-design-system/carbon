/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
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

  // TODO: deprecate
  /**
   * Extra large size.
   */
  EXTRA_LARGE = 'xl',
}

/**
 * Input tooltop alignment
 */
export enum INPUT_TOOLTIP_ALIGNMENT {
  /**
   * Small size.
   */
  START = 'start',

  /**
   * Regular size, same as medium size.
   */
  CENTER = 'center',

  /**
   * Large size.
   */
  END = 'end',
}

/**
 * Input tooltop direction
 */
export enum INPUT_TOOLTIP_DIRECTION {
  /**
   * Small size.
   */
  TOP = 'top',

  /**
   * Regular size, same as medium size.
   */
  RIGHT = 'right',

  /**
   * Large size.
   */
  BOTTOM = 'bottom',

  /**
   * Regular size, same as medium size.
   */
  LEFT = 'left',
}

/**
 * Supported input types.
 *
 * For this component we only support textual types
 */
export enum INPUT_TYPE {
  EMAIL = 'email',
  PASSWORD = 'password',
  TEL = 'tel',
  TEXT = 'text',
  URL = 'url',
}
