/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { TrashCan, Save, Download, Add } from '@carbon/icons-react';

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
  TableToolbarMenu,
} from '..';

import { batchActionClick, rows, headers } from './shared';
import mdx from '../DataTable.mdx';

export default {
  title: 'Components/DataTable/Batch Actions',
  component: DataTable,
  subcomponents: {
    TableBatchAction,
    TableBatchActions,
    TableToolbar,
    TableToolbarAction,
    TableToolbarContent,
    TableToolbarSearch,
    TableToolbarMenu,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableHeader,
    TableRow,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <DataTable rows={rows} headers={headers}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getSelectionProps,
      getToolbarProps,
      getBatchActionProps,
      onInputChange,
      selectedRows,
      getTableProps,
      getTableContainerProps,
    }) => {
      const batchActionProps = getBatchActionProps();

      return (
        <TableContainer
          title="DataTable"
          description="With batch actions. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas accumsan mauris sed congue egestas. Integer varius mauris vel arcu pulvinar bibendum non sit amet ligula. Nullam ut nisi eu tellus aliquet vestibulum vel sit amet odio."
          {...getTableContainerProps()}>
          <TableToolbar {...getToolbarProps()}>
            <TableBatchActions {...batchActionProps}>
              <TableBatchAction
                tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                renderIcon={TrashCan}
                onClick={batchActionClick(selectedRows)}>
                Delete
              </TableBatchAction>
              <TableBatchAction
                hasIconOnly
                iconDescription="Add"
                tooltipPosition="bottom"
                tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                renderIcon={Add}
                onClick={batchActionClick(selectedRows)}>
                Delete
              </TableBatchAction>
              <TableBatchAction
                hasIconOnly
                iconDescription="Save"
                tooltipPosition="bottom"
                tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                renderIcon={Save}
                onClick={batchActionClick(selectedRows)}>
                Save
              </TableBatchAction>
              <TableBatchAction
                tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                renderIcon={Download}
                onClick={batchActionClick(selectedRows)}>
                Download
              </TableBatchAction>
            </TableBatchActions>
            <TableToolbarContent
              aria-hidden={batchActionProps.shouldShowBatchActions}>
              <TableToolbarSearch
                tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                onChange={onInputChange}
              />
              <TableToolbarMenu
                tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}>
                <TableToolbarAction onClick={() => alert('Alert 1')}>
                  Action 1
                </TableToolbarAction>
                <TableToolbarAction onClick={() => alert('Alert 2')}>
                  Action 2
                </TableToolbarAction>
                <TableToolbarAction onClick={() => alert('Alert 3')}>
                  Action 3
                </TableToolbarAction>
              </TableToolbarMenu>
              <Button
                tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                onClick={action('Add new row')}
                size="small"
                kind="primary">
                Add new
              </Button>
            </TableToolbarContent>
          </TableToolbar>
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                <TableSelectAll {...getSelectionProps()} />
                {headers.map((header, i) => (
                  <TableHeader key={i} {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i} {...getRowProps({ row })}>
                  <TableSelectRow {...getSelectionProps({ row })} />
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }}
  </DataTable>
);

export const Playground = (args) => (
  <DataTable rows={rows} headers={headers} {...args}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getSelectionProps,
      getToolbarProps,
      getBatchActionProps,
      onInputChange,
      selectedRows,
      getTableProps,
      getTableContainerProps,
    }) => {
      const batchActionProps = getBatchActionProps();

      return (
        <TableContainer
          title="DataTable"
          description="With batch actions"
          {...getTableContainerProps()}>
          <TableToolbar {...getToolbarProps()}>
            <TableBatchActions {...batchActionProps}>
              <TableBatchAction
                tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                renderIcon={TrashCan}
                onClick={batchActionClick(selectedRows)}>
                Delete
              </TableBatchAction>
              <TableBatchAction
                tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                renderIcon={Save}
                onClick={batchActionClick(selectedRows)}>
                Save
              </TableBatchAction>
              <TableBatchAction
                tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                renderIcon={Download}
                onClick={batchActionClick(selectedRows)}>
                Download
              </TableBatchAction>
            </TableBatchActions>
            <TableToolbarContent
              aria-hidden={batchActionProps.shouldShowBatchActions}>
              <TableToolbarSearch
                tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                onChange={(evt) => {
                  action('TableToolbarSearch - onChange')(evt);
                  onInputChange(evt);
                }}
              />
              <TableToolbarMenu
                tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}>
                <TableToolbarAction onClick={() => alert('Alert 1')}>
                  Action 1
                </TableToolbarAction>
                <TableToolbarAction onClick={() => alert('Alert 2')}>
                  Action 2
                </TableToolbarAction>
                <TableToolbarAction onClick={() => alert('Alert 3')}>
                  Action 3
                </TableToolbarAction>
              </TableToolbarMenu>
              <Button
                tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                onClick={action('Add new row')}
                size="small"
                kind="primary">
                Add new
              </Button>
            </TableToolbarContent>
          </TableToolbar>
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                {args.radio ? (
                  <th scope="col" />
                ) : (
                  <TableSelectAll {...getSelectionProps()} />
                )}
                {headers.map((header, i) => (
                  <TableHeader key={i} {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i} {...getRowProps({ row })}>
                  <TableSelectRow
                    {...getSelectionProps({ row })}
                    onChange={action('TableSelectRow - onChange')}
                  />
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }}
  </DataTable>
);

Playground.argTypes = {
  filterRows: {
    table: {
      disable: true,
    },
  },
  headers: {
    table: {
      disable: true,
    },
  },
  overflowMenuOnHover: {
    table: {
      disable: true,
    },
  },
  rows: {
    table: {
      disable: true,
    },
  },
  translateWithId: {
    table: {
      disable: true,
    },
  },
  sortRow: {
    table: {
      disable: true,
    },
  },
};
