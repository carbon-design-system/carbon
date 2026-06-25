//
// Copyright IBM Corp. 2022, 2022
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

/**
 * to be able to more easily and efficiently the child entries the data needs to be
 * normalized. this function recursively goes through the data array to build a single
 * object who's keys are the id's of every single entry
 * @param {object} data
 * @returns an object of normalized data
 */
export const normalize = (data) => {
  const items = data.entries.reduce((prev, cur) => {
    const { children, ...item } = cur;
    prev[item.id] = item;
    if (children) {
      const childItems = normalize(children);
      return {
        ...prev,
        ...childItems,
      };
    }
    return prev;
  }, {});
  return items;
};

/**
 * takes in a global filters array and a flat list of items
 * it then searches through the items and finds any with the matching filter properties
 * and adds those values to the array
 * globalFilters looks like [{ id: someProperty }]
 * the returned array would look like [{ id: someProperty, opts: [value, value]}]
 * @param {Array} globalFilters - list of filter properties
 * @param {Array} items - items to search through
 * @returns an array of filter values
 */
export const getGlobalFilterValues = (globalFilters, items) => {
  const itemIds = Object.keys(items);
  const results = globalFilters.reduce((prevFilter, curFilter) => {
    const filterId = curFilter.id;
    const filterOpts = itemIds.reduce((prevId, curId) => {
      const curItem = items[curId];
      const value = curItem[filterId];
      if (value && !prevId.includes(value)) {
        prevId.push(value);
      }
      return prevId;
    }, []);
    prevFilter.push({
      opts: filterOpts,
      ...curFilter,
    });
    return prevFilter;
  }, []);
  return results;
};

export const sortItems = (attribute, direction) => {
  return (a, b) => {
    const valueA = a[attribute]?.split(' ').join('');
    const valueB = b[attribute]?.split(' ').join('');
    if (direction === 'desc') {
      return valueA > valueB ? -1 : 1;
    }

    return valueA < valueB ? -1 : 1;
  };
};

export const getFilteredItems = (
  useNormalizedItems,
  normalizedItems,
  searchTerm,
  globalFiltersApplied,
  globalFilterKeys,
  appliedGlobalFilters,
  sortFn,
  multi,
  items,
  path
) => {
  /**
   * useNormalizedItems just specifies if the data is hierarchical. the data structure
   * is an object and not an array.
   */
  if (useNormalizedItems) {
    const itemIds = Object.keys(normalizedItems);
    if (searchTerm || globalFiltersApplied) {
      const results = itemIds
        .reduce((prev, cur) => {
          if (
            normalizedItems[cur].title
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          ) {
            prev.push(normalizedItems[cur]);
          }
          return prev;
        }, [])
        .filter((item) => {
          return globalFilterKeys.every(
            (filter) => item[filter] === appliedGlobalFilters[filter]
          );
        })
        .sort(sortFn);
      return results;
    }
    /**
     * multi select with hierarchy requires special consideration because columns
     * are built recursively, so the items are just returned
     */
    if (multi) {
      return items;
    }
    /**
     * because single add select with hierarchy isn't recursively built the data
     * structure has to be built around the path to maintain the folder structure
     */
    if (path.length > 1) {
      return path.reduce((prev, cur, curIdx) => {
        // because the root of the path never changes we can skip it
        if (curIdx === 0) {
          return prev;
        }
        const item = prev.find((item) => item.id === cur.id)?.children?.entries;
        return item;
      }, items.entries);
    }
    return items.entries;
  } else {
    if (searchTerm) {
      return items.entries.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return items.entries;
  }
};
