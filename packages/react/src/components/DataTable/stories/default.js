/**
 * Copyright IBM Corp. 2016, 2018
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
} from '../../DataTable';
import { initialRows, headers } from './shared';

export default props => (
  <DataTable
    rows={initialRows}
    headers={headers}
    {...props}
    render={({ rows, headers, getHeaderProps, getRowProps, getTableProps }) => (
      <TableContainer title="DataTable" description="With default options">
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
