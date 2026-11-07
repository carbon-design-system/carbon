/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { compare, defaultSortRow, sortRows } from '../sorting';
import { sortStates } from '../../state/sortStates';

describe('sortRows', () => {
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

  it('should sort React elements correctly', () => {
    const reactCells1 = {
      'row1:header1': { value: { props: { children: 'Apple' } } },
      'row2:header1': { value: { props: { children: 'Banana' } } },
    };
    const reactCells2 = {
      'row1:header1': { value: { props: { children: 1000 } } },
      'row2:header1': { value: { props: { children: 'hmm' } } },
    };

    expect(
      sortRows({
        rowIds,
        cellsById: reactCells1,
        sortDirection: sortStates.ASC,
        key: 'header1',
        locale: 'en',
        sortRow: defaultSortRow,
      })
    ).toEqual(['row1', 'row2']);
    expect(
      sortRows({
        rowIds,
        cellsById: reactCells2,
        sortDirection: sortStates.ASC,
        key: 'header1',
        locale: 'en',
        sortRow: defaultSortRow,
      })
    ).toEqual(['row2', 'row1']);
  });

  it('should sort numeric strings as numbers', () => {
    const cells = {
      'row1:header1': { value: '10' },
      'row2:header1': { value: '2' },
    };

    expect(
      sortRows({
        rowIds,
        cellsById: cells,
        sortDirection: sortStates.ASC,
        key: 'header1',
        locale: 'en',
      })
    ).toEqual(['row2', 'row1']);
  });

  it('should handle a custom `sortRow` function', () => {
    const customSortRow = (a, b) => a.length - b.length;

    const customCells = {
      'row1:header1': { value: 'short' },
      'row2:header1': { value: 'longerstring' },
    };

    expect(
      sortRows({
        rowIds,
        cellsById: customCells,
        sortDirection: sortStates.ASC,
        key: 'header1',
        sortRow: customSortRow,
      })
    ).toEqual(['row1', 'row2']);
  });

  it('should maintain order for equal values', () => {
    const cells = {
      'row1:header1': { value: 'same' },
      'row2:header1': { value: 'same' },
    };

    expect(rowIds).toEqual(['row2', 'row1']);
    expect(
      sortRows({
        rowIds,
        cellsById: cells,
        sortDirection: sortStates.ASC,
        key: 'header1',
      })
    ).toEqual(['row2', 'row1']);
  });
});

describe('sortRows with numeric strings', () => {
  const values = ['3', '-10', '3.25', '-1', '10', '-5', '3.10'];
  const cellsById = Object.fromEntries(
    values.map((value) => [`${value}:header1`, { value }])
  );
  const sort = (sortDirection) =>
    sortRows({
      rowIds: values,
      cellsById,
      sortDirection,
      key: 'header1',
    });

  it('should order rows numerically in ascending order', () => {
    expect(sort(sortStates.ASC)).toEqual([
      '-10',
      '-5',
      '-1',
      '3',
      '3.10',
      '3.25',
      '10',
    ]);
  });

  it('should order rows numerically in descending order', () => {
    expect(sort(sortStates.DESC)).toEqual([
      '10',
      '3.25',
      '3.10',
      '3',
      '-1',
      '-5',
      '-10',
    ]);
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

describe('compare', () => {
  it('should treat null as empty string', () => {
    expect(compare(null, 'abc')).toEqual(-1);
    expect(compare(null, null)).toEqual(0);
    expect(compare('abc', null)).toEqual(1);
  });

  it('should compare numbers correctly', () => {
    expect(compare(10, 5)).toEqual(5);
    expect(compare(3, 3)).toEqual(0);
    expect(compare(1, 10)).toEqual(-9);
  });

  it('should compare mixed strings and numbers as strings', () => {
    expect(compare('5', 10)).toEqual(-1);
    expect(compare(20, '10')).toEqual(1);
  });

  it('should compare numeric strings by their numeric value', () => {
    expect(compare('10', '9')).toEqual(1);
    expect(compare('-5', '-10')).toEqual(1);
    expect(compare('-10', '3')).toEqual(-1);
    expect(compare('3.9', '3.10')).toEqual(1);
    expect(compare('0.5', '.25')).toEqual(1);
    expect(compare('1.0', '1')).toEqual(0);
    expect(compare(-5, '-10')).toEqual(1);
  });

  it('should compare strings that start with a number by that number', () => {
    expect(compare('10 MB', '9 MB')).toEqual(1);
    expect(compare('9 MB', '10 MB')).toEqual(-1);
  });

  it('should not compare empty, non-finite, or partly numeric strings as numbers', () => {
    expect(compare('', '5')).toEqual(-1);
    expect(compare('   ', '5')).toEqual(-1);
    expect(compare('Infinity', '5')).toEqual(1);
    expect(compare('abc', '5')).toEqual(1);
  });

  it('should compare React elements whose `props.children` are strings', () => {
    const a = { props: { children: 'Apple' } };
    const b = { props: { children: 'Banana' } };

    expect(compare(a, b)).toEqual(-1);
  });

  it('should fallback to string comparison when `props.children` is not a string', () => {
    const a = { props: { children: 123 } };
    const b = { props: { children: 'banana' } };

    expect(compare(a, b)).toEqual(0);
  });

  it('should fallback to string comparison for non-matching types', () => {
    expect(compare({}, 1)).toEqual(-1);
    expect(compare(true, 'false')).toEqual(1);
  });

  it('should treat `undefined` as a string when comparing', () => {
    expect(compare(undefined, 'abc')).toEqual(1);
    expect(compare(undefined, undefined)).toEqual(0);
    expect(compare('abc', undefined)).toEqual(-1);
  });

  it('should use locale for string comparison', () => {
    expect(compare('ä', 'z', 'sv-SE')).toEqual(1);
    expect(compare('z', 'ä', 'sv-SE')).toEqual(-1);
    expect(compare('ä', 'z', 'en-US')).toEqual(-1);
    expect(compare('z', 'ä', 'en-US')).toEqual(1);
    expect(compare('ä', 'z', 'de-DE')).toEqual(-1);
    expect(compare('z', 'ä', 'de-DE')).toEqual(1);
  });

  it('should compare falsy values correctly', () => {
    expect(compare(false, true)).toEqual(-1);
    expect(compare(true, false)).toEqual(1);
    expect(compare(0, false)).toEqual(-1);
    expect(compare(false, 0)).toEqual(1);
    expect(compare(null, undefined)).toEqual(-1);
    expect(compare(undefined, null)).toEqual(1);
  });
});
