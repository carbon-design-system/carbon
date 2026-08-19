/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { action } from 'storybook/actions';
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

import { Toggletip, ToggletipButton, ToggletipContent } from '../../Toggletip';


import { EmptyState } from '../../EmptyState';
import {
  batchActionClick,
  dataTableArgs,
  dataTableArgTypes,
  rows,
  headers,
} from './shared';
import mdx from '../DataTable.mdx';
import Link from '../../Link';


const VisualInspectionPictogram = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true"
    focusable="false"
    {...props}>
    <path d="M16,26.3604c-6.8062,0-12.1055-3.5283-15.3242-10.2041-.0479-.0986-.0479-.2139,0-.3125,3.2188-6.6753,8.5181-10.2036,15.3242-10.2036s12.1064,3.5283,15.3242,10.2036l-.6484.3125c-3.1338-6.5005-8.0713-9.7964-14.6758-9.7964-6.5503,0-11.4614,3.2432-14.5996,9.6401,3.1382,6.3965,8.0493,9.6396,14.5996,9.6396v.7207ZM23.7451,24.2549l-4.2197-4.2207c-.9434.8252-2.1768,1.3262-3.5254,1.3262-2.9556,0-5.3599-2.4053-5.3599-5.3604s2.4043-5.3599,5.3599-5.3599,5.3604,2.4043,5.3604,5.3599c0,1.3486-.501,2.582-1.3262,3.5254l4.2207,4.2197-.5098.5098ZM16,11.3599c-2.5586,0-4.6401,2.0815-4.6401,4.6401s2.0815,4.6396,4.6401,4.6396,4.6396-2.0811,4.6396-4.6396-2.0811-4.6401-4.6396-4.6401Z" />
    <rect style={{ fill: 'none' }} width="32" height="32" />
  </svg>
);

export default {
  title: 'Components/DataTable/Batch Actions',
  component: DataTable,
  args: dataTableArgs,
  argTypes: dataTableArgTypes,
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

export const Default = (args) => {
  const [searchValue, setSearchValue] = useState('');

  const filteredRows = rows.filter((row) => {
    const search = searchValue.trim().toLowerCase();
    if (search === '') return true;
    return Object.values(row).some((val) =>
      String(val).toLowerCase().includes(search)
    );
  });

  const showEmptyState = filteredRows.length === 0;

  return (
    <DataTable
      rows={showEmptyState ? [] : filteredRows}
      headers={headers}
      {...args}>
      {({
        rows: tableRows,
        headers: tableHeaders,
        getHeaderProps,
        getRowProps,
        getSelectionProps,
        getToolbarProps,
        getBatchActionProps,
        onInputChange,
        selectedRows,
        getTableProps,
        getTableContainerProps,
        getCellProps,
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
                  onClick={batchActionClick(
                    selectedRows,
                    action('Batch action click')
                  )}>
                  Delete
                </TableBatchAction>
                <TableBatchAction
                  tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                  renderIcon={Save}
                  onClick={batchActionClick(
                    selectedRows,
                    action('Batch action click')
                  )}>
                  Save
                </TableBatchAction>
                <TableBatchAction
                  tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                  renderIcon={Download}
                  onClick={batchActionClick(
                    selectedRows,
                    action('Batch action click')
                  )}>
                  Download
                </TableBatchAction>
              </TableBatchActions>
              <TableToolbarContent
                aria-hidden={batchActionProps.shouldShowBatchActions}>
                <TableToolbarSearch
                  tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                  value={searchValue}
                  onChange={(evt) => {
                    action('TableToolbarSearch - onChange')(evt);
                    setSearchValue(evt.target.value);
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
                  kind="primary">
                  Add new
                </Button>
              </TableToolbarContent>
            </TableToolbar>
            <Table {...getTableProps()} aria-label="sample table">
              <TableHead>
                <TableRow>
                  <TableSelectAll {...getSelectionProps()} />
                  {tableHeaders.map((header, i) => (
                    <TableHeader key={i} {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {showEmptyState
                  ? null
                  : tableRows.map((row) => (
                      <TableRow {...getRowProps({ row })}>
                        <TableSelectRow
                          {...getSelectionProps({ row })}
                          onChange={action('TableSelectRow - onChange')}
                        />
                        {row.cells.map((cell) => (
                          <TableCell {...getCellProps({ cell })}>
                            {cell.value}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
            {showEmptyState && (
              <div style={{ padding: '2rem 1rem' }}>
                <EmptyState
                  illustration={VisualInspectionPictogram}
                  illustrationDescription="Visual inspection pictogram"
                  title="No results match the current search"
                  subtitle="Clear the search field to see all results, or try a different search term."
                  action={{
                    text: 'Clear search',
                    kind: 'tertiary',
                    onClick: () => setSearchValue(''),
                  }}
                />
              </div>
            )}
          </TableContainer>
        );
      }}
    </DataTable>
  );
};

Default.args = {
  isSortable: false,
  locale: 'en',
  overflowMenuOnHover: true,
  size: 'lg',
  stickyHeader: false,
  useStaticWidth: false,
  useZebraStyles: false,
};

Default.argTypes = {
  locale: {
    control: 'text',
    description: 'Provide a string for the current locale',
  },
  overflowMenuOnHover: {
    control: 'boolean',
    description:
      'Specify whether the overflow menu (if it exists) should be shown always, or only on hover',
  },
  size: {
    control: 'select',
    options: ['xs', 'sm', 'md', 'lg', 'xl'],
    description: 'Change the row height of table',
  },
  stickyHeader: {
    control: 'boolean',
    description:
      'Specify whether the header should be sticky. Still in preview: may not work with every combination of table props',
  },
  useStaticWidth: {
    control: 'boolean',
    description: 'If true, will use a width of "auto" instead of 100%',
  },
  useZebraStyles: {
    control: 'boolean',
    description: 'Add zebra striping to rows',
  },
};
