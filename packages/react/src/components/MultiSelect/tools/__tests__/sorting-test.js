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
    const mockItems = ['d', 'c', 'b', 'a'].map(label => ({ id: label, label }));
    expect(defaultSortItems(mockItems, mockOptions)).toEqual([
      {
        id: 'a',
        label: 'a',
      },
      {
        id: 'b',
        label: 'b',
      },
      {
        id: 'c',
        label: 'c',
      },
      {
        id: 'd',
        label: 'd',
      },
    ]);
  });

  it('should sort un-selected numbers in increasing order', () => {
    const mockItems = ['1', '10', '11', '2', '3'].map(label => ({
      id: label,
      label,
    }));
    expect(defaultSortItems(mockItems, mockOptions)).toEqual([
      {
        id: '1',
        label: '1',
      },
      {
        id: '2',
        label: '2',
      },
      {
        id: '3',
        label: '3',
      },
      {
        id: '10',
        label: '10',
      },
      {
        id: '11',
        label: '11',
      },
    ]);
  });

  it('should sort un-selected alpha-numeric sequences with increasing order', () => {
    const mockItems = ['Option 1', 'Option 10', 'Option 11', 'Option 2'].map(
      label => ({ id: label, label })
    );
    expect(defaultSortItems(mockItems, mockOptions)).toEqual([
      {
        id: 'Option 1',
        label: 'Option 1',
      },
      {
        id: 'Option 2',
        label: 'Option 2',
      },
      {
        id: 'Option 10',
        label: 'Option 10',
      },
      {
        id: 'Option 11',
        label: 'Option 11',
      },
    ]);
  });

  it('should sort parent and child', () => {
    const mockItems = [
      {
        id: 'x-a',
        label: 'a',
        parentId: 'x',
      },
      {
        id: 'x',
        label: 'x',
      },
      {
        id: 'z-d-m',
        label: 'm',
        parentId: 'z-d',
      },
      {
        id: 'z-1',
        label: 'z',
      },
      {
        id: 'x-b',
        label: 'b',
        parentId: 'x',
      },
      {
        id: 'y',
        label: 'y',
      },
      {
        id: 'z-c',
        label: 'c',
        parentId: 'z',
      },
      {
        id: 'z-d',
        label: 'd',
        parentId: 'z',
      },
      {
        id: 'z',
        label: 'z',
      },
      {
        id: 'z-c-k',
        label: 'k',
        parentId: 'z-c',
      },
      {
        id: 'z-e',
        label: 'e',
        parentId: 'z',
      },
      {
        id: 'z-a',
        label: 'a',
        parentId: 'z',
      },
      {
        id: 'z-c-l',
        label: 'l',
        parentId: 'z-c',
      },
      {
        id: 'z-d-n',
        label: 'n',
        parentId: 'z-d',
      },
    ];
    expect(defaultSortItems(mockItems, mockOptions)).toEqual([
      {
        id: 'x',
        label: 'x',
      },
      {
        id: 'x-a',
        label: 'a',
        parentId: 'x',
      },
      {
        id: 'x-b',
        label: 'b',
        parentId: 'x',
      },
      {
        id: 'y',
        label: 'y',
      },
      {
        id: 'z-1',
        label: 'z',
      },
      {
        id: 'z',
        label: 'z',
      },
      {
        id: 'z-a',
        label: 'a',
        parentId: 'z',
      },
      {
        id: 'z-c',
        label: 'c',
        parentId: 'z',
      },
      {
        id: 'z-c-k',
        label: 'k',
        parentId: 'z-c',
      },
      {
        id: 'z-c-l',
        label: 'l',
        parentId: 'z-c',
      },
      {
        id: 'z-d',
        label: 'd',
        parentId: 'z',
      },
      {
        id: 'z-d-m',
        label: 'm',
        parentId: 'z-d',
      },
      {
        id: 'z-d-n',
        label: 'n',
        parentId: 'z-d',
      },
      {
        id: 'z-e',
        label: 'e',
        parentId: 'z',
      },
    ]);
  });
});
