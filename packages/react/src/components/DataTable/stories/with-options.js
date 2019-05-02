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
  TableExpandedRow,
  TableExpandHeader,
  TableExpandRow,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectRow,
} from '..';
import { headers, initialRows } from './shared';

export default props => (
  <DataTable
    rows={[
      { ...initialRows[0], disabled: true },
      { ...initialRows[1], isSelected: true },
      { ...initialRows[2], isExpanded: true },
    ]}
    headers={headers}
    {...props}
    render={({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getTableProps,
      getSelectionProps,
    }) => (
      <TableContainer title="DataTable" description="With options">
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              <TableExpandHeader />
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
              <React.Fragment key={row.id}>
                <TableExpandRow {...getRowProps({ row })}>
                  <TableSelectRow {...getSelectionProps({ row })} />
                  {row.cells.map(cell => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableExpandRow>
                <TableExpandedRow colSpan={headers.length + 2}>
                  <h1>Expandable row content</h1>
                  <p>Description here</p>
                </TableExpandedRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  />
);
