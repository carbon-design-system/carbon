/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from '../../Button';
import DataTable, {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarColumns,
  TableToolbarRowHeight,
  TableToolbarMenu,
} from '..';

import { initialRows, headers as allHeaders } from './shared';

export default props => (
  <DataTable
    rows={initialRows}
    headers={allHeaders}
    {...props}
    render={({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getTableProps,
      onInputChange,
      onRowHeightChange,
      onColumnsChange,
      getTableContainerProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With toolbar settings"
        {...getTableContainerProps()}>
        <TableToolbar>
          <TableToolbarContent>
            <TableToolbarSearch onChange={onInputChange} />
            <TableToolbarMenu>
              <TableToolbarRowHeight
                initialSelected='default'
                onChange={onRowHeightChange}
              />
              <TableToolbarColumns
                columns={allHeaders}
                initialSelected={allHeaders.map(header => header.key)}
                onChange={onColumnsChange}
              />
            </TableToolbarMenu>
            <Button onClick={action('ButtonCLick')}>Primary Button</Button>
          </TableToolbarContent>
        </TableToolbar>
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              {headers.map(header => (
                <TableHeader {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow {...getRowProps({ row })}>
                {row.cells.map(cell => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  />
);
