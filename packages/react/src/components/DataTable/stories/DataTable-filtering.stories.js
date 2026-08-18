/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { action } from 'storybook/actions';
import React, { useState } from 'react';
import Button from '../../Button';
import DataTable, {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
  TableToolbarAction,
  TableBatchActions,
  TableBatchAction,
  TableSelectAll,
  TableSelectRow,
} from '..';
import { EmptyState } from '../../EmptyState';
import { rows, headers } from './shared';
import mdx from '../DataTable.mdx';
import TableToolbarFilter from './examples/TableToolbarFilter';
import './datatable-story.scss';
import { Add, Download, Save, TrashCan } from '@carbon/icons-react';

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
  title: 'Components/DataTable/Filtering',
  component: DataTable,
  subcomponents: {
    TableToolbar,
    TableToolbarContent,
    TableToolbarSearch,
    TableToolbarMenu,
    TableToolbarAction,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableHeader,
    TableRow,
  },
  argTypes: {
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
    useZebraStyles: {
      control: { type: 'boolean' },
    },
  },
  args: {
    size: 'lg',
    useZebraStyles: false,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => {
  const [renderedRows, setRenderedRows] = useState(rows);

  const handleTableFilter = (selectedCheckboxes) => {
    setRenderedRows([]);

    for (let i = 0; i < selectedCheckboxes.length; i++) {
      // Filter the items inside the rows list
      const filteredRows = rows.filter((row) => {
        return Object.values(row).some((value) =>
          String(value)
            .toLowerCase()
            .includes(selectedCheckboxes[i].toLowerCase())
        );
      });

      setRenderedRows((prevData) => {
        // Filter out duplicate rows
        const uniqueRows = filteredRows.filter((row) => {
          return !prevData.some((prevRow) => {
            return Object.keys(row).every((key) => {
              return row[key] === prevRow[key];
            });
          });
        });
        return [...prevData, ...uniqueRows];
      });
    }
  };

  const handleOnResetFilter = () => {
    setRenderedRows(rows);
  };

  return (
    <DataTable rows={renderedRows} headers={headers} {...args}>
      {({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getTableProps,
        getToolbarProps,
        onInputChange,
        getCellProps,
      }) => {
        const showEmptyState = rows.length === 0;
        return (
          <TableContainer title="DataTable" description="With filtering">
            <TableToolbar {...getToolbarProps()}>
              <TableToolbarContent>
                {/* pass in `onInputChange` change here to make filtering work */}
                <TableToolbarSearch
                  onChange={(evt, value) => {
                    action(`TableToolbarSearch - onChange ${value}`)(evt);
                    onInputChange(evt);
                  }}
                />
                <TableToolbarFilter
                  onApplyFilter={handleTableFilter}
                  onResetFilter={handleOnResetFilter}
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
            <Table {...getTableProps()} aria-label="sample table">
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
                {showEmptyState
                  ? null
                  : rows.map((row) => (
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
            {showEmptyState && (
              <div style={{ padding: '2rem 1rem' }}>
                <EmptyState
                  illustration={VisualInspectionPictogram}
                  illustrationDescription="Visual inspection pictogram"
                  title="No results match the current filter"
                  subtitle="Clear the filter to see all results, or try a different search term."
                  action={{
                    text: 'Clear search',
                    kind: 'tertiary',
                    onClick: () => handleOnResetFilter(),
                  }}
                />
              </div>
            )}
          </TableContainer>
        );
      }}
    </DataTable>
  );
};
