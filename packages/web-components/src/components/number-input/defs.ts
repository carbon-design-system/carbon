/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export { FORM_ELEMENT_COLOR_SCHEME as NUMBER_INPUT_COLOR_SCHEME } from '../../globals/shared-enums';

/**
 * Works in conjunction with VALIDATION_STATUS
 */
export enum NUMBER_INPUT_VALIDATION_STATUS {
  EXCEEDED_MAXIMUM = 'exceeded_maximum',
  EXCEEDED_MINIMUM = 'exceeded_minimum',
}
