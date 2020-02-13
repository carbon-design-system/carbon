/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { createRef } from 'react';

import DataTable, { Table, TableBody, TableContainer, TableRow } from '..';
import { initialRows, headers } from './shared';

// addition for column resizing
import { settings } from 'carbon-components';
const { prefix } = settings;
import TableCellResizable from '../TableCellResizable';
import TableHeaderResizable from '../TableHeaderResizable';
import TableHeadResizable from '../TableHeadResizable';
import { ResizeProvider } from '../tools/columnResize';

export const getColKey = cellId => cellId.split(':')[1];

export default props => (
  <DataTable
    rows={initialRows}
    headers={headers}
    {...props}
    render={({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getTableProps,
      getTableContainerProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With resizable columns"
        {...getTableContainerProps()}>
        <Table
          {...getTableProps()}
          className={`${prefix}--data-table--resizable`}>
          <ResizeProvider>
            <TableHeadResizable isResizable>
              <TableRow>
                {headers.map(header => (
                  <TableHeaderResizable
                    {...getHeaderProps({ header })}
                    ref={createRef()}
                    isResizable
                    colKey={header.key}>
                    {header.header}
                  </TableHeaderResizable>
                ))}
              </TableRow>
            </TableHeadResizable>
            <TableBody>
              {rows.map(row => (
                <TableRow {...getRowProps({ row })}>
                  {row.cells.map(cell => (
                    <TableCellResizable
                      key={cell.id}
                      isResizable
                      colKey={getColKey(cell.id)}>
                      {cell.value}
                    </TableCellResizable>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </ResizeProvider>
        </Table>
      </TableContainer>
    )}
  />
);
