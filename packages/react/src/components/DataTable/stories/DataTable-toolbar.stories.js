/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { action } from 'storybook/actions';
import React from 'react';
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
    },
  },
};

const sharedArgTypes = {
  ...dataTableArgTypes,
  persistent: { control: { type: 'boolean' } },
};

export const Default = ({ persistent, ...args }) => (
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
            <TableToolbarSearch
              onChange={onInputChange}
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

Default.args = { persistent: false };
Default.argTypes = sharedArgTypes;

export const PersistentToolbar = ({ persistent, ...args }) => (
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
            <TableToolbarSearch
              onChange={onInputChange}
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

PersistentToolbar.args = { persistent: true };
PersistentToolbar.argTypes = {
  ...sharedArgTypes,
  persistent: { table: { readonly: true } },
};

export const SmallPersistentToolbar = ({ persistent, ...args }) => (
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
          size={args.size}>
          <TableToolbarContent>
            <TableToolbarSearch
              onChange={onInputChange}
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
        <Table {...getTableProps()} size={args.size} aria-label="sample table">
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

SmallPersistentToolbar.args = { persistent: true, size: 'sm' };
SmallPersistentToolbar.argTypes = {
  ...sharedArgTypes,
  persistent: { table: { readonly: true } },
};

export const WithOverflowMenu = ({ persistent, ...args }) => (
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
            <TableToolbarSearch
              onChange={onInputChange}
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
    control: 'boolean',
    description: 'Only show row overflow menus on hover.',
  },
};
WithOverflowMenu.args = { overflowMenuOnHover: false, persistent: false };
