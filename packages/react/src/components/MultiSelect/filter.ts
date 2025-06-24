/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// TODO [@carbon-design-system/monorepo-reviewers]: This file was in the
// `ComboBox` directory before but it wasn't used there. Now it's used in
// `FilterableMultiSelect`. Is that expected?

export const defaultFilterItems = <ItemType>(
  items: ItemType[],
  {
    itemToString,
    inputValue,
  }: {
    itemToString: (item: ItemType | null) => string;
    inputValue: string | null;
  }
): ItemType[] => {
  if (!inputValue) return items;

  const normalizedInput = inputValue.toLowerCase();

  return items.filter((item) =>
    itemToString(item).toLowerCase().includes(normalizedInput)
  );
};
