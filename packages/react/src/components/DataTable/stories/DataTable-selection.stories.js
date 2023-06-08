/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import DataTable, {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectRow,
} from '..';
import { rows, headers } from './shared';
import mdx from '../DataTable.mdx';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/DataTable/Selection',
  component: DataTable,
  subcomponents: {
    TableSelectAll,
    TableSelectRow,
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
      getTableProps,
      getTableContainerProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With selection"
        {...getTableContainerProps()}>
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
    )}
  </DataTable>
);

export const WithRadioSelection = () => (
  <DataTable rows={rows} headers={headers} radio>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getSelectionProps,
      getTableProps,
      getTableContainerProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With radio selection"
        {...getTableContainerProps()}>
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              <th scope="col" />
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
    )}
  </DataTable>
);

export const WithSelectionAndSorting = () => (
  <DataTable rows={rows} headers={headers} isSortable>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getSelectionProps,
      getTableProps,
      getTableContainerProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With selection"
        {...getTableContainerProps()}>
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
    )}
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
      getTableProps,
      getTableContainerProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With selection"
        {...getTableContainerProps()}>
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
              <TableRow
                key={i}
                {...getRowProps({ row })}
                onClick={(evt) => {
                  action('TableRow onClick')(evt);
                }}>
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
    )}
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
