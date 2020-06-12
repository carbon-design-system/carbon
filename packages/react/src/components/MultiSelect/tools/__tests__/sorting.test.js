/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defaultSortItems, defaultCompareItems } from '../sorting';

describe('defaultSortItems', () => {
  let mockItemToString;
  let mockOptions;

  beforeEach(() => {
    mockItemToString = jest.fn(({ label }) => label);
    mockOptions = {
      selectedItems: [],
      itemToString: mockItemToString,
      compareItems: defaultCompareItems,
      locale: 'en',
    };
  });

  it('should sort un-selected options alphabetically', () => {
    const mockItems = ['d', 'c', 'b', 'a'].map((label) => ({ label }));
    expect(defaultSortItems(mockItems, mockOptions)).toEqual([
      {
        label: 'a',
      },
      {
        label: 'b',
      },
      {
        label: 'c',
      },
      {
        label: 'd',
      },
    ]);
  });

  it('should sort un-selected numbers in increasing order', () => {
    const mockItems = ['1', '10', '11', '2', '3'].map((label) => ({ label }));
    expect(defaultSortItems(mockItems, mockOptions)).toEqual([
      {
        label: '1',
      },
      {
        label: '2',
      },
      {
        label: '3',
      },
      {
        label: '10',
      },
      {
        label: '11',
      },
    ]);
  });

  it('should sort un-selected alpha-numeric sequences with increasing order', () => {
    const mockItems = [
      'Option 1',
      'Option 10',
      'Option 11',
      'Option 2',
    ].map((label) => ({ label }));
    expect(defaultSortItems(mockItems, mockOptions)).toEqual([
      {
        label: 'Option 1',
      },
      {
        label: 'Option 2',
      },
      {
        label: 'Option 10',
      },
      {
        label: 'Option 11',
      },
    ]);
  });

  it('should order a selected item before all other options', () => {
    const mockItems = [
      'Option 1',
      'Option 10',
      'Option 11',
      'Option 2',
    ].map((label) => ({ label }));

    // Set `selectedItems` to ['Option 11']
    mockOptions.selectedItems = [mockItems[2]];

    expect(defaultSortItems(mockItems, mockOptions)).toEqual([
      {
        label: 'Option 11',
      },
      {
        label: 'Option 1',
      },
      {
        label: 'Option 2',
      },
      {
        label: 'Option 10',
      },
    ]);
  });

  it('should sort selected items and order them before all other options', () => {
    const mockItems = [
      'Option 1',
      'Option 10',
      'Option 11',
      'Option 2',
    ].map((label) => ({ label }));

    // Set `selectedItems` to ['Option 11', 'Option 2']
    mockOptions.selectedItems = [mockItems[2], mockItems[3]];

    expect(defaultSortItems(mockItems, mockOptions)).toEqual([
      {
        label: 'Option 2',
      },
      {
        label: 'Option 11',
      },
      {
        label: 'Option 1',
      },
      {
        label: 'Option 10',
      },
    ]);
  });
});
