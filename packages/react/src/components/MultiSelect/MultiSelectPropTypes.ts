/**
 * Copyright IBM Corp. 2016, 2023
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
  compareItems: PropTypes.func,

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
  sortItems: PropTypes.func,
};

interface DownshiftTypedProps<ItemType> {
  itemToString?(item: ItemType): string;
}

interface SharedOptions {
  locale: string;
}

export interface SortItemsOptions<ItemType>
  extends SharedOptions,
    DownshiftTypedProps<ItemType> {
  compareItems(
    item1: ItemType,
    item2: ItemType,
    options: SharedOptions
  ): number;
  selectedItems: ItemType[];
}

export interface MultiSelectSortingProps<ItemType> {
  /**
   * Provide a compare function that is used to determine the ordering of
   * options. See 'sortItems' for more control.
   */
  compareItems?(
    item1: ItemType,
    item2: ItemType,
    options: SharedOptions
  ): number;

  /**
   * Provide a method that sorts all options in the control. Overriding this
   * prop means that you also have to handle the sort logic for selected versus
   * un-selected items. If you just want to control ordering, consider the
   * `compareItems` prop instead.
   *
   * The return value should be a number whose sign indicates the relative order
   * of the two elements: negative if a is less than b, positive if a is greater
   * than b, and zero if they are equal.
   */
  sortItems?(
    items: ReadonlyArray<ItemType>,
    options: SortItemsOptions<ItemType>
  ): ItemType[];
}
