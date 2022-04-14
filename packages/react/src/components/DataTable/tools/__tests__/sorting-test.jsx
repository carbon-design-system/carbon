/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { sortRows, defaultSortRow } from '../sorting';
import { sortStates } from '../../state/sorting';

describe('sortRow', () => {
  const rowIds = ['row2', 'row1'];
  const cellsById = {
    'row1:header1': { value: 'cell11' },
    'row2:header1': { value: 'cell21' },
  };

  it('should sort data in ascending order', () => {
    expect(
      sortRows({
        rowIds,
        cellsById,
        sortDirection: sortStates.ASC,
        key: 'header1',
        locale: 'en',
        sortRow: defaultSortRow,
      })
    ).toEqual(['row1', 'row2']);
  });

  it('should sort data in descending order', () => {
    expect(
      sortRows({
        rowIds,
        cellsById,
        sortDirection: sortStates.DESC,
        key: 'header1',
        locale: 'en',
        sortRow: defaultSortRow,
      })
    ).toEqual(['row2', 'row1']);
  });

  it('should return unsorted data if cells not found', () => {
    expect(
      sortRows({
        rowIds,
        cellsById,
        sortDirection: sortStates.ASC,
        key: 'header2',
        locale: 'en',
        sortRow: defaultSortRow,
      })
    ).toEqual(['row2', 'row1']);
  });
});

describe('defaultSortRow', () => {
  it('should sort data in ascending order', () => {
    const sortProps = {
      sortDirection: sortStates.ASC,
      sortStates: sortStates,
      locale: 'en',
    };
    expect(defaultSortRow('a', 'b', sortProps)).toBeLessThan(0);
    expect(defaultSortRow('1', '2', sortProps)).toBeLessThan(0);
  });

  it('should sort data in descending order', () => {
    const sortProps = {
      sortDirection: sortStates.DESC,
      sortStates: sortStates,
      locale: 'en',
    };
    expect(defaultSortRow('a', 'b', sortProps)).toBeGreaterThan(0);
    expect(defaultSortRow('1', '2', sortProps)).toBeGreaterThan(0);
  });
});
