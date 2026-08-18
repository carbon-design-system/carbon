/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { action } from 'storybook/actions';
import React, { useState } from 'react';
import Button from '../../Button';
import OverflowMenu from '../../OverflowMenu';
import OverflowMenuItem from '../../OverflowMenuItem';
import {
  default as DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
} from '..';
import { EmptyState } from '../../EmptyState';

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
import mdx from '../DataTable.mdx';
import { headers, rows } from './shared';

export default {
  title: 'Components/DataTable/Toolbar',
  component: DataTable,
  subcomponents: {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const sharedArgTypes = {
  size: {
    options: ['xs', 'sm', 'md', 'lg', 'xl'],
    control: { type: 'select' },
  },
  useZebraStyles: {
    control: { type: 'boolean' },
  },
  isSortable: { control: { type: 'boolean' } },
  persistent: { control: { type: 'boolean' } },
};

export const Default = (args) => {
  const [searchValue, setSearchValue] = useState('');
  const filteredRows = rows.filter((row) => {
    const q = searchValue.trim().toLowerCase();
    if (!q) return true;
    return Object.values(row).some((v) => String(v).toLowerCase().includes(q));
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
        getTableProps,
        getToolbarProps,
        getTableContainerProps,
        getCellProps,
      }) => (
        <TableContainer
          title="DataTable"
          description="With toolbar"
          {...getTableContainerProps()}>
          <TableToolbar {...getToolbarProps()} aria-label="data table toolbar">
            <TableToolbarContent>
              <TableToolbarSearch
                value={searchValue}
                onChange={(evt) => setSearchValue(evt.target.value)}
              />
              <TableToolbarMenu>
                <TableToolbarAction onClick={action('Action 1 Click')}>
                  Action 1
                </TableToolbarAction>
                <TableToolbarAction onClick={action('Action 2 Click')}>
                  Action 2
                </TableToolbarAction>
                <TableToolbarAction onClick={action('Action 3 Click')}>
                  Action 3
                </TableToolbarAction>
              </TableToolbarMenu>
              <Button onClick={action('Button click')}>Primary Button</Button>
            </TableToolbarContent>
          </TableToolbar>
          <Table {...getTableProps()} aria-label="sample table">
            <TableHead>
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableHeader key={header.key} {...getHeaderProps({ header })}>
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
      )}
    </DataTable>
  );
};

Default.argTypes = { ...sharedArgTypes };

export const PersistentToolbar = (args) => (
  <DataTable rows={rows} headers={headers} {...args}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getTableProps,
      getToolbarProps,
      onInputChange,
      getTableContainerProps,
      getCellProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With toolbar"
        {...getTableContainerProps()}>
        <TableToolbar {...getToolbarProps()} aria-label="data table toolbar">
          <TableToolbarContent>
            <TableToolbarSearch onChange={onInputChange} persistent />
            <TableToolbarMenu>
              <TableToolbarAction onClick={action('Action 1 Click')}>
                Action 1
              </TableToolbarAction>
              <TableToolbarAction onClick={action('Action 2 Click')}>
                Action 2
              </TableToolbarAction>
              <TableToolbarAction onClick={action('Action 3 Click')}>
                Action 3
              </TableToolbarAction>
            </TableToolbarMenu>
            <Button onClick={action('Button click')}>Primary Button</Button>
          </TableToolbarContent>
        </TableToolbar>
        <Table {...getTableProps()} aria-label="sample table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader key={header.key} {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow {...getRowProps({ row })}>
                {row.cells.map((cell) => (
                  <TableCell {...getCellProps({ cell })}>
                    {cell.value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

PersistentToolbar.argTypes = { ...sharedArgTypes };

export const SmallPersistentToolbar = (args) => (
  <DataTable rows={rows} headers={headers} {...args}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getTableProps,
      getToolbarProps,
      onInputChange,
      getTableContainerProps,
      getCellProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With toolbar"
        {...getTableContainerProps()}>
        <TableToolbar
          {...getToolbarProps()}
          aria-label="data table toolbar"
          size="sm">
          <TableToolbarContent>
            <TableToolbarSearch onChange={onInputChange} persistent size="sm" />
            <TableToolbarMenu size="sm">
              <TableToolbarAction onClick={action('Action 1 Click')}>
                Action 1
              </TableToolbarAction>
              <TableToolbarAction onClick={action('Action 2 Click')}>
                Action 2
              </TableToolbarAction>
              <TableToolbarAction onClick={action('Action 3 Click')}>
                Action 3
              </TableToolbarAction>
            </TableToolbarMenu>
            <Button onClick={action('Button click')}>Primary Button</Button>
          </TableToolbarContent>
        </TableToolbar>
        <Table {...getTableProps()} size="sm" aria-label="sample table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader key={header.key} {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow {...getRowProps({ row })}>
                {row.cells.map((cell) => (
                  <TableCell {...getCellProps({ cell })}>
                    {cell.value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

SmallPersistentToolbar.argTypes = { ...sharedArgTypes };

export const WithOverflowMenu = (args) => (
  <DataTable rows={rows} headers={headers} {...args}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getTableProps,
      getToolbarProps,
      onInputChange,
      getCellProps,
    }) => (
      <TableContainer title="DataTable" description="With overflow menu">
        <TableToolbar {...getToolbarProps()} aria-label="data table toolbar">
          <TableToolbarContent>
            <TableToolbarSearch onChange={onInputChange} />
            <TableToolbarMenu>
              <TableToolbarAction onClick={action('Action 1 Click')}>
                Action 1
              </TableToolbarAction>
              <TableToolbarAction onClick={action('Action 2 Click')}>
                Action 2
              </TableToolbarAction>
              <TableToolbarAction onClick={action('Action 3 Click')}>
                Action 3
              </TableToolbarAction>
            </TableToolbarMenu>
            <Button onClick={action('Button click')}>Primary Button</Button>
          </TableToolbarContent>
        </TableToolbar>
        <Table {...getTableProps()} aria-label="sample table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader key={header.key} {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
              <TableHeader aria-label="overflow actions" />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow {...getRowProps({ row })}>
                {row.cells.map((cell) => (
                  <TableCell {...getCellProps({ cell })}>
                    {cell.value}
                  </TableCell>
                ))}
                <TableCell className="cds--table-column-menu">
                  <OverflowMenu size="sm" flipped>
                    <OverflowMenuItem itemText="Stop app" />
                    <OverflowMenuItem itemText="Restart app" />
                    <OverflowMenuItem itemText="Rename app" />
                  </OverflowMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

WithOverflowMenu.argTypes = {
  ...sharedArgTypes,
  overflowMenuOnHover: {
    control: { type: 'boolean' },
  },
};
