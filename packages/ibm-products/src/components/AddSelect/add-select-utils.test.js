//
// Copyright IBM Corp. 2022, 2022
//
// This source code is licensed under the Apache-2.0 license found in the
// LICENSE file in the root directory of this source tree.
//

import {
  normalize,
  getGlobalFilterValues,
  sortItems,
  getFilteredItems,
} from './add-select-utils';

describe('add select utils', () => {
  let warn;

  beforeEach(() => {
    warn = jest.spyOn(console, 'warn').mockImplementation(jest.fn());
  });

  afterEach(() => {
    warn.mockRestore();
  });

  it('normalizes data', async () => {
    const data = {
      entries: [
        {
          id: '1',
          children: {
            entries: [
              {
                id: '1-1',
              },
            ],
          },
        },
      ],
    };
    const normalizedData = normalize(data);
    expect(normalizedData).toStrictEqual({
      1: {
        id: '1',
      },
      '1-1': {
        id: '1-1',
      },
    });
  });

  it('gets global filter values', async () => {
    const globalFilters = [{ id: 'fileType' }];
    const items = {
      1: {
        id: '1',
        fileType: 'js',
      },
      2: {
        id: '2',
        fileType: 'js',
      },
      3: {
        id: '3',
        fileType: 'jsx',
      },
    };
    const filters = getGlobalFilterValues(globalFilters, items);
    expect(filters).toStrictEqual([{ id: 'fileType', opts: ['js', 'jsx'] }]);
  });

  it('sorts items ascending', async () => {
    const sortFnAsc = sortItems('size', 'asc');
    const items = [{ size: '100' }, { size: '200' }, { size: '10' }];
    const ascItems = items.sort(sortFnAsc);
    expect(ascItems).toStrictEqual([
      { size: '10' },
      { size: '100' },
      { size: '200' },
    ]);
  });

  it('sorts items descending', async () => {
    const sortFnDesc = sortItems('size', 'desc');
    const items = [{ size: '100' }, { size: '200' }, { size: '10' }];
    const descItems = items.sort(sortFnDesc);
    expect(descItems).toStrictEqual([
      { size: '200' },
      { size: '100' },
      { size: '10' },
    ]);
  });

  it('filters none hierarchical items', async () => {
    const items = {
      entries: [
        {
          id: '1',
          title: 'test title 1',
        },
        {
          id: '2',
          title: 'test title 2',
        },
      ],
    };

    const noSearchTermResults = getFilteredItems(
      false,
      '',
      null,
      null,
      null,
      null,
      null,
      false,
      items,
      null
    );
    expect(noSearchTermResults).toStrictEqual(items.entries);

    const searchTermResults = getFilteredItems(
      false,
      '',
      'test title 2',
      null,
      null,
      null,
      null,
      false,
      items,
      null
    );
    expect(searchTermResults).toStrictEqual([
      {
        id: '2',
        title: 'test title 2',
      },
    ]);
  });

  it('filters hierarchical items', async () => {
    const items = {
      entries: [
        {
          id: '1',
          title: 'test title 1',
          category: 'business',
          children: {
            entries: [
              {
                id: '1-1',
                title: 'test title 1-1',
                category: 'vm',
              },
            ],
          },
        },
        {
          id: '2',
          title: 'test title 2',
          category: 'vm',
        },
      ],
    };

    const normalizedItems = normalize(items);

    const multiResults = getFilteredItems(
      true,
      normalizedItems,
      null,
      null,
      null,
      null,
      null,
      true,
      items,
      null
    );
    expect(multiResults).toStrictEqual(items);

    const globalFilterResults = getFilteredItems(
      true,
      normalizedItems,
      '',
      true,
      ['category'],
      { category: 'business' },
      undefined,
      false,
      items,
      null
    );
    expect(globalFilterResults).toStrictEqual([normalizedItems['1']]);

    const globalFilterResultsWithSearchTerm = getFilteredItems(
      true,
      normalizedItems,
      '2',
      true,
      ['category'],
      { category: 'vm' },
      undefined,
      false,
      items,
      null
    );
    expect(globalFilterResultsWithSearchTerm).toStrictEqual([
      normalizedItems['2'],
    ]);

    const withPathResults = getFilteredItems(
      true,
      normalizedItems,
      '',
      false,
      null,
      null,
      undefined,
      false,
      items,
      [
        {
          id: 'base_of_path',
          title: 'categories',
        },
        {
          id: '1',
          title: 'test title 1',
          parentId: 'base_of_path',
        },
      ]
    );
    expect(withPathResults).toStrictEqual([
      {
        id: '1-1',
        title: 'test title 1-1',
        category: 'vm',
      },
    ]);

    const defaultResults = getFilteredItems(
      true,
      normalizedItems,
      '',
      false,
      null,
      null,
      undefined,
      false,
      items,
      []
    );
    expect(defaultResults).toStrictEqual(items.entries);
  });
});
