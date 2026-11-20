/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { action } from 'storybook/actions';
import React, { useState } from 'react';
import { Add } from '@carbon/icons-react';
import Button from '../../Button';
import { MenuItem } from '../../Menu';
import OverflowMenu from '../../OverflowMenu';
import OverflowMenuItem from '../../OverflowMenuItem';
import { useFeatureFlag } from '../../FeatureFlags';
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
import { EmptyState } from '../../../examples/EmptyState/example/components/EmptyState';
import notFoundIllustration from '../../../examples/EmptyState/example/assets/not-found.svg';
import mdx from '../DataTable.mdx';
import { dataTableArgs, dataTableArgTypes, headers, rows } from './shared';

export default {
  title: 'Components/DataTable/Toolbar',
  component: DataTable,
  args: dataTableArgs,
  argTypes: dataTableArgTypes,
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
      source: {
        type: 'code',
      },
    },
  },
};

const sharedArgTypes = {
  ...dataTableArgTypes,
  persistent: { control: { type: 'boolean' } },
};

export const Default = ({ persistent, ...args }) => {
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
        rows,
        headers,
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
                onChange={(evt) => {
                  action('TableToolbarSearch - onChange')(evt);
                  setSearchValue(evt.target.value);
                }}
                persistent={persistent}
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
                {headers.map((header) => (
                  <TableHeader key={header.key} {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {showEmptyState
                ? null
                : rows.map((row) => (
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
                illustration={notFoundIllustration}
                illustrationDescription="Not found illustration"
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

Default.args = { persistent: false };
Default.argTypes = sharedArgTypes;

export const WithGhostAction = ({
  toolbarSize,
  buttonSize,
  actionLabel,
  disabled,
  ...args
}) => {
  const [tableRows, setTableRows] = useState(rows);
  const resetRows = () => setTableRows(rows);

  return (
    <DataTable rows={tableRows} headers={headers} {...args}>
      {({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getTableProps,
        getToolbarProps,
        getTableContainerProps,
        getCellProps,
        onInputChange,
      }) => (
        <TableContainer
          title="Load balancers"
          description="Add a load balancer with a ghost toolbar action."
          {...getTableContainerProps()}>
          <TableToolbar
            {...getToolbarProps()}
            aria-label="Load balancer actions"
            size={toolbarSize === 'default' ? undefined : toolbarSize}>
            <TableToolbarContent>
              <TableToolbarSearch persistent onChange={onInputChange} />
              <TableToolbarMenu>
                <TableToolbarAction onClick={resetRows}>
                  Reset rows
                </TableToolbarAction>
              </TableToolbarMenu>
              <Button
                kind="ghost"
                size={buttonSize === 'default' ? undefined : buttonSize}
                renderIcon={Add}
                disabled={disabled}
                onClick={() => {
                  setTableRows((currentRows) => [
                    ...currentRows,
                    {
                      ...currentRows[0],
                      id: `new-${currentRows.length}`,
                      name: `Load Balancer ${currentRows.length + 1}`,
                    },
                  ]);
                }}>
                {actionLabel}
              </Button>
            </TableToolbarContent>
          </TableToolbar>
          <Table {...getTableProps()} aria-label="Load balancers">
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
};

WithGhostAction.args = {
  toolbarSize: 'default',
  buttonSize: 'sm',
  actionLabel: 'Add row',
  disabled: false,
};
WithGhostAction.argTypes = {
  ...dataTableArgTypes,
  toolbarSize: {
    control: 'select',
    options: ['default', 'xs', 'sm', 'lg'],
    description: 'Choose the toolbar height independently of the table rows.',
  },
  buttonSize: {
    control: 'select',
    options: ['default', 'xs', 'sm', 'md', 'lg'],
    description: 'Choose an explicit button size or use its default.',
  },
  actionLabel: { control: 'text' },
  disabled: { control: 'boolean' },
};
WithGhostAction.parameters = {
  docs: {
    description: {
      story:
        'Compose a small ghost action with an independently sized toolbar. The action adds a row; the toolbar menu resets the rows.',
    },
  },
};

export const PersistentToolbar = ({ persistent, ...args }) => {
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
        rows,
        headers,
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
                onChange={(evt) => {
                  action('TableToolbarSearch - onChange')(evt);
                  setSearchValue(evt.target.value);
                }}
                persistent={persistent}
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
                {headers.map((header) => (
                  <TableHeader key={header.key} {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {showEmptyState
                ? null
                : rows.map((row) => (
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
                illustration={notFoundIllustration}
                illustrationDescription="Not found illustration"
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

PersistentToolbar.args = { persistent: true };
PersistentToolbar.argTypes = {
  ...sharedArgTypes,
  persistent: { table: { readonly: true } },
};

export const SmallPersistentToolbar = ({ persistent, ...args }) => {
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
        rows,
        headers,
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
          <TableToolbar
            {...getToolbarProps()}
            aria-label="data table toolbar"
            size={args.size}>
            <TableToolbarContent>
              <TableToolbarSearch
                value={searchValue}
                onChange={(evt) => {
                  action('TableToolbarSearch - onChange')(evt);
                  setSearchValue(evt.target.value);
                }}
                persistent={persistent}
                size={args.size}
              />
              <TableToolbarMenu size={args.size}>
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
          <Table
            {...getTableProps()}
            size={args.size}
            aria-label="sample table">
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
              {showEmptyState
                ? null
                : rows.map((row) => (
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
                illustration={notFoundIllustration}
                illustrationDescription="Not found illustration"
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

SmallPersistentToolbar.args = { persistent: true, size: 'sm' };
SmallPersistentToolbar.argTypes = {
  ...sharedArgTypes,
  persistent: { table: { readonly: true } },
};

export const WithOverflowMenu = ({ persistent, ...args }) => {
  const enableV12OverflowMenu = useFeatureFlag('enable-v12-overflowmenu');
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
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getTableProps,
        getToolbarProps,
        getCellProps,
      }) => (
        <TableContainer title="DataTable" description="With overflow menu">
          <TableToolbar {...getToolbarProps()} aria-label="data table toolbar">
            <TableToolbarContent>
              <TableToolbarSearch
                value={searchValue}
                onChange={(evt) => {
                  action('TableToolbarSearch - onChange')(evt);
                  setSearchValue(evt.target.value);
                }}
                persistent={persistent}
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
                {headers.map((header) => (
                  <TableHeader key={header.key} {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
                <TableHeader aria-label="overflow actions" />
              </TableRow>
            </TableHead>
            <TableBody>
              {showEmptyState
                ? null
                : rows.map((row) => (
                    <TableRow {...getRowProps({ row })}>
                      {row.cells.map((cell) => (
                        <TableCell {...getCellProps({ cell })}>
                          {cell.value}
                        </TableCell>
                      ))}
                      <TableCell className="cds--table-column-menu">
                        {enableV12OverflowMenu ? (
                          <OverflowMenu label="Options">
                            <MenuItem label="Stop app" />
                            <MenuItem label="Restart app" />
                            <MenuItem label="Rename app" />
                          </OverflowMenu>
                        ) : (
                          <OverflowMenu size="sm" flipped>
                            <OverflowMenuItem itemText="Stop app" />
                            <OverflowMenuItem itemText="Restart app" />
                            <OverflowMenuItem itemText="Rename app" />
                          </OverflowMenu>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
          {showEmptyState && (
            <div style={{ padding: '2rem 1rem' }}>
              <EmptyState
                illustration={notFoundIllustration}
                illustrationDescription="Not found illustration"
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

WithOverflowMenu.argTypes = {
  ...sharedArgTypes,
  overflowMenuOnHover: {
    control: 'boolean',
    description: 'Only show row overflow menus on hover.',
  },
};
WithOverflowMenu.args = { overflowMenuOnHover: false, persistent: false };
