/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { mount } from 'enzyme';
import { Table, TableBody, TableRow } from '..';
import TableCellResizable from '../TableCellResizable';

jest.mock('../tools/columnResize', () => {
  const hookReturnVal = {
    colWidth: 100,
    ref: null,
    columnKeyResizeActive: null,
    initColumnResizing: jest.fn(),
    cleanupColumnResizing: jest.fn(),
    startResizeAction: jest.fn(),
    endResizeAction: jest.fn(),
    resizeColumn: jest.fn(),
  };
  return {
    hookReturnVal,
    useResizedColumnWidth: () => hookReturnVal,
  };
});

describe('DataTable.TableCellResizable', () => {
  it('should render', () => {
    const wrapper = mount(
      <Table>
        <TableBody>
          <TableRow>
            <TableCellResizable />
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render with resizable columns', () => {
    const wrapper = mount(
      <Table>
        <TableBody>
          <TableRow>
            <TableCellResizable key="aKey" colKey="aKey" />
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
