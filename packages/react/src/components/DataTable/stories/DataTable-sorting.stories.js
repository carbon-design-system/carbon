/**
 * Copyright IBM Corp. 2016, 2026
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
} from '..';
import { dataTableArgs, dataTableArgTypes, rows, headers } from './shared';
import mdx from '../DataTable.mdx';

export default {
  title: 'Components/DataTable/Sorting',
  component: DataTable,
  args: dataTableArgs,
  argTypes: dataTableArgTypes,
  subcomponents: {
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

export const Default = (args) => (
  <DataTable rows={rows} headers={headers} {...args}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getTableProps,
      getCellProps,
    }) => (
      <TableContainer title="DataTable" description="With sorting">
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

Default.args = { isSortable: true };
Default.argTypes = {
  isSortable: { table: { readonly: true } },
};
