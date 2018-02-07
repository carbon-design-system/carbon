/**
 * Use the local `localCompare` with the `numeric` option to sort two,
 * potentially alpha-numeric, strings in a list of items.
 *
 * @param {string} itemA
 * @param {string} itemB
 * @param {Object} options
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
  { selectedItems, itemToString, compareItems, locale = 'en' }
) =>
  items.sort((itemA, itemB) => {
    const hasItemA = selectedItems.includes(itemA);
    const hasItemB = selectedItems.includes(itemB);

    // Prefer whichever item is in the `selectedItems` array first
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
