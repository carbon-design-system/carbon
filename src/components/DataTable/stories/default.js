/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { iconDownload, iconEdit, iconSettings } from 'carbon-icons';
import Download16 from '@carbon/icons-react/lib/download/16';
import Edit16 from '@carbon/icons-react/lib/edit/16';
import Settings16 from '@carbon/icons-react/lib/settings/16';
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
import { componentsX } from '../../../internal/FeatureFlags';

export default ({ short, shouldShowBorder }) => (
  <DataTable
    rows={initialRows}
    headers={headers}
    short={short}
    shouldShowBorder={shouldShowBorder}
    render={({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getSelectionProps,
      getBatchActionProps,
      onInputChange,
      selectedRows,
      getTableProps,
    }) => (
      <TableContainer title="DataTable">
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
              renderIcon={!componentsX ? undefined : Download16}
              icon={componentsX ? undefined : iconDownload}
              iconDescription="Download"
              onClick={action('TableToolbarAction - Download')}
            />
            <TableToolbarAction
              renderIcon={!componentsX ? undefined : Edit16}
              icon={componentsX ? undefined : iconEdit}
              iconDescription="Edit"
              onClick={action('TableToolbarAction - Edit')}
            />
            <TableToolbarAction
              renderIcon={!componentsX ? undefined : Settings16}
              icon={componentsX ? undefined : iconSettings}
              iconDescription="Settings"
              onClick={action('TableToolbarAction - Settings')}
            />
            <Button onClick={action('Add new row')} small kind="primary">
              Add new
            </Button>
          </TableToolbarContent>
        </TableToolbar>
        <Table {...getTableProps()}>
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
