/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export { FORM_ELEMENT_COLOR_SCHEME as CODE_SNIPPET_COLOR_SCHEME } from '../../globals/shared-enums';

/**
 * Code snippet types.
 */
export enum CODE_SNIPPET_TYPE {
  /**
   * Single variant.
   */
  SINGLE = 'single',

  /**
   * Inline variant.
   */
  INLINE = 'inline',

  /**
   * Multi-line variant.
   */
  MULTI = 'multi',
}
