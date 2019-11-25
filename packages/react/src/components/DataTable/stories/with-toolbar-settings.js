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
  TableToolbarSettingColumns,
  TableToolbarSettingSize,
  TableToolbarMenu,
} from '..';

import { initialRows, headers as allHeaders } from './shared';

export default props => (
  <DataTable
    {...props}
    rows={initialRows}
    headers={allHeaders}
    size="short"
    sizeOptions={['normal', 'short']}
    selectedColumns={allHeaders
      .map(header => header.key)
      .filter(item => item !== 'protocol')}
    render={({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getTableProps,
      getTableSettingsProps,
      onInputChange,
      onSizeChange,
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
              <TableToolbarSettingSize
                onChange={onSizeChange}
                {...getTableSettingsProps()}
              />
              <TableToolbarSettingColumns
                onChange={onColumnsChange}
                {...getTableSettingsProps()}
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
