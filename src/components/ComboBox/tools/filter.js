/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const defaultFilterItems = (items, { itemToString, inputValue }) =>
  items.filter(item => {
    if (!inputValue) {
      return true;
    }
    return itemToString(item)
      .toLowerCase()
      .includes(inputValue.toLowerCase());
  });
