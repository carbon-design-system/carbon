/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Use the locale `localeCompare` with the `numeric` option to sort two
 * alpha-numeric strings.
 *
 * @param {string} itemA - The first string to compare.
 * @param {string} itemB - The second string to compare.
 * @param {object} options - Options for comparing.
 * @param {string} options.locale - The locale to use for comparison.
 * @returns {number} A negative number if itemA comes before itemB, a positive
 *   number if itemA comes after itemB, or 0 if they are equal.
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
  return items.sort((itemA, itemB) => {
    // Always place "select all" option at the beginning
    if (itemA.isSelectAll) return -1;
    if (itemB.isSelectAll) return 1;

    const hasItemA = selectedItems.includes(itemA);
    const hasItemB = selectedItems.includes(itemB);

    if (hasItemA && !hasItemB) return -1;
    if (hasItemB && !hasItemA) return 1;

    return compareItems(itemToString(itemA), itemToString(itemB), {
      locale,
    });
  });
};
