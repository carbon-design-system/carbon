/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './DataTable-expansion-story.scss';
import React, { useState, useEffect } from 'react';
import DataTable, {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableExpandHeader,
  TableExpandRow,
  TableExpandedRow,
  TableHead,
  TableHeader,
  TableRow,
} from '../..';
import { Pagination } from '../../../../';
import { rows, headers } from '../shared';
import mdx from '../../DataTable.mdx';

export default {
  title: 'Components/DataTable/Expansion',
  component: DataTable,
  subcomponents: {
    TableExpandHeader,
    TableExpandRow,
    TableExpandedRow,
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
      getTableProps,
      getTableContainerProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With expansion"
        {...getTableContainerProps()}>
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              <TableExpandHeader />
              {headers.map((header, i) => (
                <TableHeader key={i} {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <React.Fragment key={row.id}>
                <TableExpandRow {...getRowProps({ row })}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableExpandRow>
                <TableExpandedRow
                  colSpan={headers.length + 1}
                  className="demo-expanded-td">
                  <h6>Expandable row content</h6>
                  <div>Description here</div>
                </TableExpandedRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

export const BatchExpansion = () => (
  <DataTable
    rows={rows}
    headers={headers}
    render={({
      rows,
      headers,
      getHeaderProps,
      getExpandHeaderProps,
      getRowProps,
      getTableProps,
      getTableContainerProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With batch expansion"
        {...getTableContainerProps()}>
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              <TableExpandHeader
                enableExpando={true}
                {...getExpandHeaderProps()}
              />
              {headers.map((header, i) => (
                <TableHeader key={i} {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <React.Fragment key={row.id}>
                <TableExpandRow {...getRowProps({ row })}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableExpandRow>
                <TableExpandedRow
                  colSpan={headers.length + 1}
                  className="demo-expanded-td">
                  <h6>Expandable row content</h6>
                  <div>Description here</div>
                </TableExpandedRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  />
);

// REMOVE BEFORE MERGE
export const TestToggle = () => {
  const [rows, setRows] = useState([]);
  const headers = [
    {
      key: 'value',
      header: 'Value',
    },
    {
      key: 'timestamp',
      header: 'Submitted At',
    },
  ];

  const allRows = [
    {
      id: 'f66f9f0e293e622b046ab4826f99d071a377418fd69bf1685c8d23c371f517cc',
      value: 'First',
      timestamp: '2022-06-06T12:57:27',
    },
    {
      id: 'd0d95500fccef68dd1e7cb36f381984d340e9a81657b00e578ef175b195d4983',
      value: 'Sewcond',
      timestamp: '2022-06-06T12:57:27',
    },
    {
      id: 'fad0a998e49fb8a9f5681f34f3288bea55559853d971c541607d22fd25773ed8',
      value: 'third',
      timestamp: '2022-06-06T12:57:27',
    },
    {
      id: 'c8ad923e8b0ff106d104e95d695f84e695525364c0acdc74786e4c59a457c637',
      value: 'Fourth',
      timestamp: '2022-06-06T12:57:20',
    },
    {
      id: '0f7b8a2912a59a737a6e7e1d3c4807d64ad0c8f54d383d9a118851f2c8f98ab6',
      value: 'Fifth',
      timestamp: '2022-06-06T12:57:21',
    },
    {
      id: 'fad0a998e49fb8a9f5681f34f3288bea07659834a971c541607d22fd25773ed8',
      value: 'Sixth',
      timestamp: '2022-06-06T12:57:27',
    },
  ];

  const paginate = ({ page, pageSize }) => {
    const start = (page - 1) * pageSize;
    const end = page * pageSize;
    return allRows.slice(start, end);
  };

  useEffect(() => {
    setRows(paginate({ page: 1, pageSize: 2 }));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <DataTable useStaticWidth={false} rows={rows} headers={headers}>
        {({
          rows,
          headers,
          getTableProps,
          getHeaderProps,
          getRowProps,
          getExpandHeaderProps,
        }) => (
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                <TableExpandHeader enableToggle {...getExpandHeaderProps()} />
                {headers.map((header) => (
                  <TableHeader key={header.key} {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <React.Fragment key={row.id}>
                  <TableExpandRow key={index} {...getRowProps({ row })}>
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableExpandRow>
                  <TableExpandedRow colSpan={headers.length + 1}>
                    Some content for {row.id}
                  </TableExpandedRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        )}
      </DataTable>
      <Pagination
        backwardText="Previous page"
        forwardText="Next page"
        itemsPerPageText="Items per page:"
        onChange={({ page, pageSize }) => {
          setRows(paginate({ page, pageSize }));
        }}
        page={1}
        pageSize={2}
        pageSizes={[2]}
        size="md"
        totalItems={allRows.length}
      />
    </>
  );
};

export const Playground = (args) => (
  <DataTable rows={rows} headers={headers} {...args}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getTableProps,
      getTableContainerProps,
    }) => (
      <TableContainer
        title="DataTable"
        description="With expansion"
        {...getTableContainerProps()}>
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              <TableExpandHeader />
              {headers.map((header, i) => (
                <TableHeader key={i} {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <React.Fragment key={row.id}>
                <TableExpandRow {...getRowProps({ row })}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableExpandRow>
                <TableExpandedRow
                  colSpan={headers.length + 1}
                  className="demo-expanded-td">
                  <h6>Expandable row content</h6>
                  <div>Description here</div>
                </TableExpandedRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);
