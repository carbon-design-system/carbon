/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { action } from 'storybook/actions';
import React, { useMemo, useState } from 'react';
import Button from '../../Button';
import { DataTable } from '..';
import Pagination from '../../Pagination';
import { headers } from './shared';

const {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarMenu,
  TableToolbarSearch,
} = DataTable;

import mdx from '../DataTable.mdx';
import './datatable-story.scss';

export default {
  title: 'Components/DataTable/Pagination',
  component: DataTable,
  subcomponents: {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
    Pagination,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

// Generate more rows for pagination demo
const generateRows = (count) => {
  const protocols = ['HTTP', 'HTTPS', 'TCP', 'UDP'];
  const rules = ['Round robin', 'DNS delegation', 'Least connections'];
  const statuses = ['Active', 'Starting', 'Disabled'];
  const ports = [80, 443, 3000, 8080, 8443];

  return Array.from({ length: count }, (_, i) => ({
    id: `load-balancer-${i + 1}`,
    name: `Load Balancer ${i + 1}`,
    protocol: protocols[i % protocols.length],
    port: ports[i % ports.length],
    rule: rules[i % rules.length],
    attached_groups: `VM Group ${i + 1}`,
    status: statuses[i % statuses.length],
  }));
};

const sharedArgTypes = {
  size: {
    control: 'select',
    options: ['xs', 'sm', 'md', 'lg', 'xl'],
    description: 'Change the row height of table',
  },
  stickyHeader: {
    control: 'boolean',
    description:
      'Specify whether the header should be sticky. Still in preview: may not work with every combination of table props',
  },
  useStaticWidth: {
    control: 'boolean',
    description: 'If true, will use a width of "auto" instead of 100%',
  },
  useZebraStyles: {
    control: 'boolean',
    description: 'Add zebra striping to rows',
  },
};

const sharedArgs = {
  size: 'lg',
  stickyHeader: false,
  useStaticWidth: false,
  useZebraStyles: false,
};

export const Default = (args) => {
  const allRows = useMemo(() => generateRows(100), []);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const paginationSize = args.size === 'xl' ? 'lg' : args.size;

  const filteredRows = allRows.filter((row) => {
    const search = searchValue.trim().toLowerCase();

    if (search === '') {
      return true;
    }

    return Object.values(row).some((value) =>
      String(value).toLowerCase().includes(search)
    );
  });

  const handlePaginationChange = ({ page, pageSize }) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const handleSearchChange = (event, onInputChange) => {
    action('toolbar search input')(event);
    onInputChange(event);
    setSearchValue(event.target.value);
    setPage(1);
  };

  // Calculate the rows to display for the current page
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedRows = filteredRows.slice(startIndex, endIndex);

  return (
    <>
      <DataTable rows={paginatedRows} headers={headers} {...args}>
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
          <TableContainer
            title="Load Balancers"
            description="Paginated data table with persistent toolbar">
            <TableToolbar {...getToolbarProps()}>
              <TableToolbarContent>
                <TableToolbarSearch
                  onChange={(event) => handleSearchChange(event, onInputChange)}
                  persistent
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
            <Table {...getTableProps()} aria-label="paginated table">
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader
                      key={header.key}
                      {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id} {...getRowProps({ row })}>
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id} {...getCellProps({ cell })}>
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
      <Pagination
        page={page}
        pageSize={pageSize}
        pageSizes={[10, 20, 30, 40, 50]}
        totalItems={filteredRows.length}
        onChange={handlePaginationChange}
        size={paginationSize}
      />
    </>
  );
};

Default.args = sharedArgs;
Default.argTypes = sharedArgTypes;
