/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export { FORM_ELEMENT_COLOR_SCHEME as DATE_PICKER_INPUT_COLOR_SCHEME } from '../../globals/shared-enums';

/**
 * Date picker input kinds.
 */
export enum DATE_PICKER_INPUT_KIND {
  /**
   * One for simple variant of date picker, comes without the calendar dropdown.
   */
  SIMPLE = 'simple',

  /**
   * One for single variant of date picker.
   */
  SINGLE = 'single',

  /**
   * One for the start date for the range variant.
   */
  FROM = 'from',

  /**
   * One for the end date for the range variant.
   */
  TO = 'to',
}

/**
 * Horizontal size, applicable only to the simple variant.
 */
export enum DATE_PICKER_INPUT_SIZE_HORIZONTAL {
  /**
   * Regular size.
   */
  REGULAR = '',

  /**
   * Short size.
   */
  SHORT = 'short',
}
