/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';

export const sortingPropTypes = {
  /**
   * Provide a compare function that is used to determine the ordering of
   * options. `compareItems` has the following function signature:
   *
   * compareFunction :
   *  (itemA: string, itemB: string, { locale: string }) => number
   */
  compareItems: PropTypes.func.isRequired,

  /**
   * Provide a method that sorts all options in the control. Overriding this
   * prop means that you also have to handle the sort logic for selected versus
   * un-selected items. If you just want to control ordering, consider the
   * `compareItems` prop instead.
   *
   * `sortItems` has the following signature:
   *
   * sortItems :
   *   (items: Array<Item>, {
   *     selectedItems: Array<Item>,
   *     itemToString: Item => string,
   *     compareItems: (itemA: string, itemB: string, {
   *       locale: string
   *     }) => number,
   *     locale: string,
   *   }) => Array<Item>
   */
  sortItems: PropTypes.func.isRequired,
};
