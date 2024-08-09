/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Use the local `localCompare` with the `numeric` option to sort two,
 * potentially alpha-numeric, strings in a list of items.
 *
 * @param {ItemType} itemA
 * @param {ItemType} itemB
 * @param {object} options
 * @param {string} options.locale
 * @returns {number}
 */
export const defaultCompareItems = (itemA, itemB, { locale }) =>
  itemA.localeCompare(itemB, locale, {
    numeric: true,
  });

/**
 * Default sorting algorithm for options in a selection control
 */
export const defaultSortItems = (
  items,
  { selectedItems = [], itemToString, compareItems, locale = 'en' }
) => {
  // Extract the "select all" option
  const selectAllOption = items.find((item) => item.isSelectAll);

  // Filter out the "select all" option from the items array
  const filteredItems = items.filter((item) => !item.isSelectAll);

  // Sort the filtered items
  const sortedItems = filteredItems.sort((itemA, itemB) => {
    const hasItemA = selectedItems.includes(itemA);
    const hasItemB = selectedItems.includes(itemB);

    if (hasItemA && !hasItemB) {
      return -1;
    }

    if (hasItemB && !hasItemA) {
      return 1;
    }

    return compareItems(itemToString(itemA), itemToString(itemB), {
      locale,
    });
  });

  // Add the "select all" option to the beginning of the sorted array, if it exists
  return selectAllOption ? [selectAllOption, ...sortedItems] : sortedItems;
};
