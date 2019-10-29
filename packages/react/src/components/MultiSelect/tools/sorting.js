/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
/*
 * A utility to find the parent of the given item.
 *
 * @param {object} item
 * @param {Array} items
 * @returns {object}
 */
export const findParent = (item, items = []) => {
  let parent;
  if (item.parentId) {
    items.some(theItem => {
      if (theItem.id === item.parentId) {
        parent = theItem;
        return true;
      }
      return false;
    });
  }
  return parent;
};

/**
 * A utility to build the hierarchy of the given item starting from root.
 */
export const buildHierarchy = (item, items = []) => {
  const hierarchy = [];
  if (item.parentId) {
    const parent = findParent(item, items);
    if (parent) {
      const parentHierarchy = buildHierarchy(parent, items);
      hierarchy.push(...parentHierarchy);
    }
  }
  hierarchy.push(item);
  return hierarchy;
};

/**
 * Use the local `localCompare` with the `numeric` option to sort two,
 * potentially alpha-numeric, strings in a list of items.
 *
 * @param {string} itemA
 * @param {string} itemB
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
  { itemToString, compareItems, locale = 'en' }
) => {
  const itemArr = [...items];
  return items.sort((itemA, itemB) => {
    const hierarchyA = buildHierarchy(itemA, itemArr);
    const hierarchyB = buildHierarchy(itemB, itemArr);
    const depth =
      hierarchyA.length > hierarchyB.length
        ? hierarchyA.length
        : hierarchyB.length;

    let compareResult = 0;

    for (let i = 0; i < depth; i += 1) {
      const currentA = hierarchyA[i];
      const currentB = hierarchyB[i];

      if (currentA && !currentB) {
        // `currentA` is a child of `currentB`
        // always place the child after the parent
        return 1;
      } else if (!currentA && currentB) {
        // `currentB` is a child of `currentA`
        // always place the child after the parent
        return -1;
      }

      compareResult = compareItems(
        itemToString(currentA),
        itemToString(currentB),
        {
          locale,
        }
      );

      if (compareResult !== 0) {
        return compareResult;
      }
    }

    return compareResult;
  });
};
