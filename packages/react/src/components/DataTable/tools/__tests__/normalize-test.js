/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import normalize from '../normalize';

describe('normalize', () => {
  let mockRows;
  let mockHeaders;

  beforeEach(() => {
    mockRows = [
      {
        id: 'a',
        fieldA: 'fieldA',
        fieldB: 'fieldB',
        fieldC: 'fieldC',
      },
      {
        id: 'b',
        fieldA: 'fieldA',
        fieldB: 'fieldB',
        fieldC: 'fieldC',
      },
      {
        id: 'c',
        fieldA: 'fieldA',
        fieldB: 'fieldB',
        fieldC: 'fieldC',
      },
    ];
    mockHeaders = [
      {
        key: 'fieldA',
        header: 'Field A',
      },
      {
        key: 'fieldB',
        header: 'Field B',
      },
      {
        key: 'fieldC',
        header: 'Field C',
      },
    ];
  });

  it('should return an object with normalized fields', () => {
    const result = normalize(mockRows, mockHeaders);
    expect(result.rowIds).toBeDefined();
    expect(result.rowsById).toBeDefined();
    expect(result.cellsById).toBeDefined();
  });

  it('should return an array of the row ids', () => {
    const { rowIds } = normalize(mockRows, mockHeaders);
    expect(rowIds).toMatchSnapshot();
  });

  it('should return a normalized map of rows by id', () => {
    const { rowsById } = normalize(mockRows, mockHeaders);
    expect(rowsById).toMatchSnapshot();
  });

  it('should return a normalized map of cells by id', () => {
    const { cellsById } = normalize(mockRows, mockHeaders);
    expect(cellsById).toMatchSnapshot();
  });
});
