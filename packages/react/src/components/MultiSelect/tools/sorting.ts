/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { CompareItems, SortItemsOptions } from '../MultiSelectPropTypes';

const isSelectAllItem = (item: unknown): item is { isSelectAll?: boolean } =>
  typeof item === 'object' && item !== null && 'isSelectAll' in item;

/**
 * Use `localeCompare` with the `numeric` option enabled to sort two
 * alphanumeric strings.
 */
export const defaultCompareItems: CompareItems = (itemA, itemB, { locale }) =>
  itemA.localeCompare(itemB, locale, {
    numeric: true,
  });

/**
 * Default sorting function for options in a selection control.
 */
export const defaultSortItems = <T>(
  items: T[],
  { selectedItems, itemToString, compareItems, locale }: SortItemsOptions<T>
) => {
  // TODO: Should this util mutate items or should that be avoided?
  return items.sort((itemA, itemB) => {
    // Always place "select all" option at the beginning
    if (isSelectAllItem(itemA) && itemA.isSelectAll) return -1;
    if (isSelectAllItem(itemB) && itemB.isSelectAll) return 1;

    const hasItemA = selectedItems.includes(itemA);
    const hasItemB = selectedItems.includes(itemB);

    if (hasItemA && !hasItemB) return -1;
    if (hasItemB && !hasItemA) return 1;

    return compareItems(itemToString(itemA), itemToString(itemB), {
      locale,
    });
  });
};
