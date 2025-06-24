/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defaultFilterItems } from '../filter';

describe('defaultFilterItems', () => {
  const items = [
    { label: 'Apple' },
    { label: 'Banana' },
    { label: 'Cherry' },
    { label: 'Date' },
  ];

  const itemToString = (item) => item?.label ?? '';

  it('should return all items if `inputValue` is `null`', () => {
    const result = defaultFilterItems(items, {
      itemToString,
      inputValue: null,
    });

    expect(result).toEqual(items);
  });

  it('should return all items if `inputValue` is an empty string', () => {
    const result = defaultFilterItems(items, {
      itemToString,
      inputValue: '',
    });

    expect(result).toEqual(items);
  });

  it('should filter items case-insensitively based on `inputValue`', () => {
    const result = defaultFilterItems(items, {
      itemToString,
      inputValue: 'a',
    });

    expect(result).toEqual([
      { label: 'Apple' },
      { label: 'Banana' },
      { label: 'Date' },
    ]);
  });

  it('should return only exact matching items (case-insensitive)', () => {
    const result = defaultFilterItems(items, {
      itemToString,
      inputValue: 'ch',
    });

    expect(result).toEqual([{ label: 'Cherry' }]);
  });

  it('should return an empty array when no items match `inputValue`', () => {
    const result = defaultFilterItems(items, {
      itemToString,
      inputValue: '⛔',
    });

    expect(result).toEqual([]);
  });

  it('should handle `itemToString` returning an empty string', () => {
    const customItems = [{ value: '' }, { value: 'Something' }];
    const result = defaultFilterItems(customItems, {
      itemToString: (item) => item?.value ?? '',
      inputValue: 'something',
    });

    expect(result).toEqual([{ value: 'Something' }]);
  });
});
