/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defaultFilterRows } from '../filter';

describe('defaultFilterRows', () => {
  const getCellId = (rowId, key) => `${rowId}-${key}`;

  const headers = [{ key: 'name' }, { key: 'age' }, { key: 'active' }];
  const cellsById = {
    '1-name': { value: 'Alice' },
    '1-age': { value: 30 },
    '1-active': { value: true },
    '2-name': { value: 'Bob' },
    '2-age': { value: 40 },
    '2-active': { value: false },
    '3-name': { value: 'Charlie' },
    '3-age': { value: 25 },
    '3-active': { value: true },
  };
  const rowIds = ['1', '2', '3'];
  const defaultOptions = {
    rowIds,
    headers,
    cellsById,
    inputValue: '',
    getCellId,
  };

  it('should filter rows by name', () => {
    const result = defaultFilterRows({
      ...defaultOptions,
      inputValue: 'ali',
    });

    expect(result).toEqual(['1']);
  });

  it('should filter rows by number (coerced to string)', () => {
    const result = defaultFilterRows({
      ...defaultOptions,
      inputValue: '40',
    });

    expect(result).toEqual(['2']);
  });

  it('should ignore boolean fields', () => {
    const result = defaultFilterRows({
      ...defaultOptions,
      inputValue: 'true',
    });

    expect(result).toEqual([]);
  });

  it('should perform a case-insensitive search', () => {
    const result = defaultFilterRows({
      ...defaultOptions,
      inputValue: 'CHARLIE',
    });

    expect(result).toEqual(['3']);
  });

  it('should return an empty array when nothing matches', () => {
    const result = defaultFilterRows({
      ...defaultOptions,
      inputValue: 'xyz',
    });

    expect(result).toEqual([]);
  });

  it('should handle an empty `rowIds` array', () => {
    const result = defaultFilterRows({
      ...defaultOptions,
      rowIds: [],
      inputValue: 'alice',
    });

    expect(result).toEqual([]);
  });

  it('should handle a missing cell gracefully', () => {
    const incompleteCellsById = { '1-name': { value: 'Alice' } };

    const result = defaultFilterRows({
      ...defaultOptions,
      rowIds: ['1'],
      cellsById: incompleteCellsById,
      inputValue: 'alice',
    });

    expect(result).toEqual(['1']);
  });

  it('should return all rows if `inputValue` is empty or only whitespace', () => {
    const emptyResult = defaultFilterRows(defaultOptions);
    const whitespaceResult = defaultFilterRows({
      ...defaultOptions,
      inputValue: '   ',
    });

    expect(defaultOptions.inputValue).toEqual('');
    expect(emptyResult).toEqual(rowIds);
    expect(whitespaceResult).toEqual(rowIds);
  });
});
