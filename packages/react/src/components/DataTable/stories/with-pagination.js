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

import Pagination from '../../Pagination';
let inititalPaginationRows = initialRows;
for (let i = 0; i < 3; i++) {
  initialRows.forEach(row => {
    inititalPaginationRows.push({ ...row, id: row.id + i });
  });
}
inititalPaginationRows = inititalPaginationRows.slice(0, 120);

export default props => (
  <DataTable
    rows={inititalPaginationRows}
    headers={headers}
    isSortable={true}
    {...props}
    render={({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getTableProps,
      getCurrentPageRows,
      getPaginationProps,
    }) => {
      const currentPageRows = getCurrentPageRows(rows);
      return (
        <TableContainer title="DataTable" description="With pagination">
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
              {currentPageRows.map(row => (
                <TableRow {...getRowProps({ row })}>
                  {row.cells.map(cell => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            {...getPaginationProps()}
            pageSizes={[10, 20, 30, 40, 50]}
            totalItems={rows.length}
            className="service-table-pagination"
          />
        </TableContainer>
      );
    }}
  />
);
