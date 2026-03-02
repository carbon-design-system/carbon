/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const defaultItemToString = <ItemType>(item: ItemType | null) => {
  if (typeof item === 'string') return item;
  if (typeof item === 'number') return `${item}`;
  if (
    item &&
    typeof item === 'object' &&
    'label' in item &&
    typeof item.label === 'string'
  ) {
    return item.label;
  }

  return '';
};
