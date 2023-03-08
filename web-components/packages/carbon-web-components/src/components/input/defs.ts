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
  REGULAR = 'md',

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
