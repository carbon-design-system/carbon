/**
 * Copyright IBM Corp. 2016, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { filterHeaders, filterColumns } from '../filter';

describe('filterHeaders', () => {
  it('should filter headers based on selectedColumns', () => {
    const filterProps = {
      headers: [
        { key: 'header1', header: 'Header1' },
        { key: 'header2', header: 'Header2' },
      ],
      selectedColumns: ['header2'],
    };
    expect(filterHeaders(filterProps)).toEqual([
      { key: 'header2', header: 'Header2' },
    ]);
  });

  it('should return all headers if selectedColumns not specified', () => {
    const filterProps = {
      headers: [
        { key: 'header1', header: 'Header1' },
        { key: 'header2', header: 'Header2' },
      ],
    };
    expect(filterHeaders(filterProps)).toEqual([
      { key: 'header1', header: 'Header1' },
      { key: 'header2', header: 'Header2' },
    ]);
  });
});

describe('filterColumns', () => {
  it('should filter columns based on selectedColumns', () => {
    const filterProps = {
      rows: [
        {
          cells: [ { info: { header: 'header1' } }, { info: { header: 'header2' } } ],
        },
      ],
      selectedColumns: ['header2'],
    };
    expect(filterColumns(filterProps)).toEqual([
      {
        cells: [ { info: { header: 'header2' } } ],
      },
    ]);
  });

  it('should return all columns if selectedColumns not specified', () => {
    const filterProps = {
      rows: [
        {
          cells: [ { info: { header: 'header1' } }, { info: { header: 'header2' } } ],
        },
      ],
    };
    expect(filterColumns(filterProps)).toEqual([
      {
        cells: [ { info: { header: 'header1' } }, { info: { header: 'header2' } } ],
      },
    ]);
  });
});
