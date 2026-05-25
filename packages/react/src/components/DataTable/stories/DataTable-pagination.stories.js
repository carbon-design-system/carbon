/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { action } from 'storybook/actions';
import React, { useState } from 'react';
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
  const allRows = generateRows(100);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handlePaginationChange = ({ page, pageSize }) => {
    setPage(page);
    setPageSize(pageSize);
  };

  // Calculate the rows to display for the current page
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedRows = allRows.slice(startIndex, endIndex);

  return (
    <>
      <TableContainer
        title="Load Balancers"
        description="Paginated data table with persistent toolbar">
        <TableToolbar
          aria-label="data table toolbar"
          size={args.size === 'xs' ? 'sm' : args.size}>
          <TableToolbarContent>
            <TableToolbarSearch
              onChange={(event) => {
                action('toolbar search input')(event);
              }}
              persistent
              size={args.size === 'xs' ? 'sm' : args.size}
            />
            <TableToolbarMenu size={args.size === 'xl' ? 'lg' : args.size}>
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
        <Table {...args} aria-label="paginated table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader key={header.key} id={header.key}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row.id}>
                {headers.map((header) => (
                  <TableCell key={header.key}>{row[header.key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        page={page}
        pageSize={pageSize}
        pageSizes={[10, 20, 30, 40, 50]}
        totalItems={allRows.length}
        onChange={handlePaginationChange}
        size={args.size}
      />
    </>
  );
};

Default.args = sharedArgs;
Default.argTypes = sharedArgTypes;
