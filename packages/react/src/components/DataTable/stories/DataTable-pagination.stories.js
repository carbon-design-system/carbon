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
import { EmptyState } from '../../EmptyState';
import mdx from '../DataTable.mdx';
import './datatable-story.scss';
import { dataTableArgs, dataTableArgTypes, headers } from './shared';

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

const VisualInspectionPictogram = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true"
    focusable="false"
    {...props}>
    <path d="M16,26.3604c-6.8062,0-12.1055-3.5283-15.3242-10.2041-.0479-.0986-.0479-.2139,0-.3125,3.2188-6.6753,8.5181-10.2036,15.3242-10.2036s12.1064,3.5283,15.3242,10.2036l-.6484.3125c-3.1338-6.5005-8.0713-9.7964-14.6758-9.7964-6.5503,0-11.4614,3.2432-14.5996,9.6401,3.1382,6.3965,8.0493,9.6396,14.5996,9.6396v.7207ZM23.7451,24.2549l-4.2197-4.2207c-.9434.8252-2.1768,1.3262-3.5254,1.3262-2.9556,0-5.3599-2.4053-5.3599-5.3604s2.4043-5.3599,5.3599-5.3599,5.3604,2.4043,5.3604,5.3599c0,1.3486-.501,2.582-1.3262,3.5254l4.2207,4.2197-.5098.5098ZM16,11.3599c-2.5586,0-4.6401,2.0815-4.6401,4.6401s2.0815,4.6396,4.6401,4.6396,4.6396-2.0811,4.6396-4.6396-2.0811-4.6401-4.6396-4.6401Z" />
    <rect style={{ fill: 'none' }} width="32" height="32" />
  </svg>
);

export default {
  title: 'Components/DataTable/Pagination',
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
    if (search === '') return true;
    return Object.values(row).some((value) =>
      String(value).toLowerCase().includes(search)
    );
  });

  const showEmptyState = filteredRows.length === 0;

  const handleSearchChange = (event) => {
    action('toolbar search input')(event);
    setSearchValue(event.target.value);
    setPage(1);
  };

  const handlePaginationChange = ({ page, pageSize }) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedRows = showEmptyState
    ? []
    : filteredRows.slice(startIndex, endIndex);

  return (
    <>
      <DataTable rows={paginatedRows} headers={headers} {...args}>
        {({
          rows: tableRows,
          headers: tableHeaders,
          getHeaderProps,
          getRowProps,
          getTableProps,
          getToolbarProps,
          getCellProps,
        }) => (
          <TableContainer
            title="Load Balancers"
            description="Paginated data table with persistent toolbar">
            <TableToolbar {...getToolbarProps()}>
              <TableToolbarContent>
                <TableToolbarSearch onChange={handleSearchChange} persistent />
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
                  {tableHeaders.map((header) => (
                    <TableHeader
                      key={header.key}
                      {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {showEmptyState
                  ? null
                  : tableRows.map((row) => (
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
            {showEmptyState && (
              <div style={{ padding: '2rem 1rem' }}>
                <EmptyState
                  illustration={VisualInspectionPictogram}
                  illustrationDescription="Visual inspection pictogram"
                  title="No results match the current search"
                  subtitle="Clear the search field to see all results, or try a different search term."
                  action={{
                    text: 'Clear search',
                    kind: 'tertiary',
                    onClick: () => {
                      setSearchValue('');
                      setPage(1);
                    },
                  }}
                />
              </div>
            )}
          </TableContainer>
        )}
      </DataTable>
      {!showEmptyState && (
        <Pagination
          page={page}
          pageSize={pageSize}
          pageSizes={[10, 20, 30, 40, 50]}
          totalItems={filteredRows.length}
          onChange={handlePaginationChange}
          size={paginationSize}
        />
      )}
    </>
  );
};

Default.args = sharedArgs;
Default.argTypes = sharedArgTypes;
