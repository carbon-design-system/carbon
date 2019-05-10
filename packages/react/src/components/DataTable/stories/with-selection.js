/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { boolean } from '@storybook/addon-knobs';
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
} from '../../DataTable';
import { initialRows, headers } from './shared';

const selectionProps = () => ({
  radio: boolean('Use radio buttons (radio)', false),
});

export default props => (
  <DataTable
    rows={initialRows}
    headers={headers}
    radio={selectionProps().radio}
    {...props}
    render={({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getSelectionProps,
      getTableProps,
    }) => (
      <TableContainer title="DataTable" description="With selection">
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              {selectionProps().radio ? (
                <th scope="col" />
              ) : (
                <TableSelectAll {...getSelectionProps()} />
              )}
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
