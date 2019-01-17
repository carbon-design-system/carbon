/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { iconDownload, iconEdit, iconSettings } from 'carbon-icons';
import Button from '../../Button';
import DataTable, {
  Table,
  TableBatchAction,
  TableBatchActions,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectRow,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarSearch,
} from '../../DataTable';
import { batchActionClick, initialRows, headers } from './shared';

export default () => (
  <DataTable
    rows={initialRows}
    headers={headers}
    render={({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getSelectionProps,
      getBatchActionProps,
      onInputChange,
      selectedRows,
    }) => (
      <TableContainer title="DataTable with batch actions">
        <TableToolbar>
          <TableBatchActions {...getBatchActionProps()}>
            <TableBatchAction onClick={batchActionClick(selectedRows)}>
              Ghost
            </TableBatchAction>
            <TableBatchAction onClick={batchActionClick(selectedRows)}>
              Ghost
            </TableBatchAction>
            <TableBatchAction onClick={batchActionClick(selectedRows)}>
              Ghost
            </TableBatchAction>
          </TableBatchActions>
          <TableToolbarSearch onChange={onInputChange} />
          <TableToolbarContent>
            <TableToolbarAction
              icon={iconDownload}
              iconDescription="Download"
              onClick={action('TableToolbarAction - Download')}
            />
            <TableToolbarAction
              icon={iconEdit}
              iconDescription="Edit"
              onClick={action('TableToolbarAction - Edit')}
            />
            <TableToolbarAction
              icon={iconSettings}
              iconDescription="Settings"
              onClick={action('TableToolbarAction - Settings')}
            />
            <Button onClick={action('Add new row')} small kind="primary">
              Add new
            </Button>
          </TableToolbarContent>
        </TableToolbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableSelectAll {...getSelectionProps()} />
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
                <TableSelectRow {...getSelectionProps({ row })} />
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
