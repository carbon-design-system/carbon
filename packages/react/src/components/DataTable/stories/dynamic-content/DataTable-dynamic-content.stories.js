/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';

import React, { useState } from 'react';
import { TrashCan, Save, Download } from '@carbon/icons-react';
import { action } from 'storybook/actions';
import { EmptyState } from '../../../EmptyState';
import DataTable, {
  Table,
  TableBatchAction,
  TableBatchActions,
  TableBody,
  TableCell,
  TableContainer,
  TableExpandHeader,
  TableExpandRow,
  TableExpandedRow,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectRow,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
} from '../..';
import {
  batchActionClick,
  dataTableArgs,
  dataTableArgTypes,
  headers,
} from '../shared';
import IconIndicator from '../../../IconIndicator';

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

const initialRows = [
  {
    id: 'a',
    name: 'Load Balancer 3',
    protocol: 'HTTP',
    port: 3000,
    rule: 'Round robin',
    attached_groups: 'Kevin\u2019s VM Groups',
    status: <IconIndicator kind="failed" label="Failed" />,
  },
  {
    id: 'b',
    name: 'Load Balancer 1',
    protocol: 'HTTP',
    port: 443,
    rule: 'Round robin',
    attached_groups: 'Maureen\u2019s VM Groups',
    status: <IconIndicator kind="in-progress" label="In progress" />,
  },
  {
    id: 'c',
    name: 'Load Balancer 2',
    protocol: 'HTTP',
    port: 80,
    rule: 'DNS delegation',
    attached_groups: 'Andrew\u2019s VM Groups',
    status: <IconIndicator kind="succeeded" label="Succeeded" />,
  },
  {
    id: 'd',
    name: 'Load Balancer 6',
    protocol: 'HTTP',
    port: 3000,
    rule: 'Round robin',
    attached_groups: 'Marc\u2019s VM Groups',
    status: <IconIndicator kind="failed" label="Failed" />,
  },
  {
    id: 'e',
    name: 'Load Balancer 4',
    protocol: 'HTTP',
    port: 443,
    rule: 'Round robin',
    attached_groups: 'Mel\u2019s VM Groups',
    status: <IconIndicator kind="in-progress" label="In progress" />,
  },
  {
    id: 'f',
    name: 'Load Balancer 5',
    protocol: 'HTTP',
    port: 80,
    rule: 'DNS delegation',
    attached_groups: 'Ronja\u2019s VM Groups',
    status: <IconIndicator kind="succeeded" label="Succeeded" />,
  },
];

// Defined outside Default so React never remounts it on re-render
class DynamicRows extends React.Component {
  state = {
    rows: initialRows,
    headers: headers,
    id: 0,
  };

  insertInRandomPosition = (array, element) => {
    const index = Math.floor(Math.random() * (array.length + 1));
    return [...array.slice(0, index), element, ...array.slice(index)];
  };

  handleOnHeaderAdd = () => {
    const length = this.state.headers.length;
    const header = {
      key: `header_${length}`,
      header: `Header ${length}`,
    };
    this.setState((state) => ({
      rows: state.rows.map((row) => ({ ...row, [header.key]: header.header })),
      headers: state.headers.concat(header),
    }));
  };

  handleOnRowAdd = () => {
    this.setState((state) => {
      const { id: _id, rows } = state;
      const id = _id + 1;
      const row = {
        id: '' + id,
        name: `New Row ${id}`,
        protocol: 'HTTP',
        port: id * 100,
        rule: id % 2 === 0 ? 'Round robin' : 'DNS delegation',
        attached_groups: `Row ${id}'s VM Groups`,
        status: 'Starting',
      };
      state.headers
        .filter((header) => row[header.key] === undefined)
        .forEach((header) => {
          row[header.key] = header.header;
        });
      return { id, rows: this.insertInRandomPosition(rows, row) };
    });
  };

  render() {
    const { args, searchValue, onSearchChange } = this.props;

    const filteredRows = this.state.rows.filter((row) => {
      const q = searchValue.trim().toLowerCase();
      if (!q) return true;
      return Object.values(row).some(
        (v) => typeof v === 'string' && v.toLowerCase().includes(q)
      );
    });
    const showEmptyState = filteredRows.length === 0;

    return (
      <DataTable
        {...args}
        rows={showEmptyState ? [] : filteredRows}
        headers={this.state.headers}>
        {({
          rows,
          headers,
          getExpandHeaderProps,
          getHeaderProps,
          getSelectionProps,
          getToolbarProps,
          getBatchActionProps,
          getRowProps,
          getExpandedRowProps,
          selectedRows,
          getTableProps,
          getTableContainerProps,
          getCellProps,
        }) => {
          const batchActionProps = getBatchActionProps();
          return (
            <TableContainer
              title="DataTable"
              description="Use the toolbar menu to add rows and headers"
              {...getTableContainerProps()}>
              <TableToolbar {...getToolbarProps()}>
                <TableBatchActions {...getBatchActionProps()}>
                  <TableBatchAction
                    renderIcon={TrashCan}
                    iconDescription="Delete the selected rows"
                    onClick={batchActionClick(
                      selectedRows,
                      action('Batch action click')
                    )}
                    tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}>
                    Delete
                  </TableBatchAction>
                  <TableBatchAction
                    renderIcon={Save}
                    iconDescription="Save the selected rows"
                    onClick={batchActionClick(
                      selectedRows,
                      action('Batch action click')
                    )}
                    tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}>
                    Save
                  </TableBatchAction>
                  <TableBatchAction
                    renderIcon={Download}
                    iconDescription="Download the selected rows"
                    onClick={batchActionClick(
                      selectedRows,
                      action('Batch action click')
                    )}
                    tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}>
                    Download
                  </TableBatchAction>
                </TableBatchActions>
                <TableToolbarContent
                  aria-hidden={batchActionProps.shouldShowBatchActions}>
                  <TableToolbarSearch
                    tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                    value={searchValue}
                    onChange={onSearchChange}
                  />
                  <TableToolbarMenu
                    tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}>
                    <TableToolbarAction onClick={this.handleOnRowAdd}>
                      Add row
                    </TableToolbarAction>
                    <TableToolbarAction onClick={this.handleOnHeaderAdd}>
                      Add header
                    </TableToolbarAction>
                  </TableToolbarMenu>
                </TableToolbarContent>
              </TableToolbar>
              <Table {...getTableProps()} aria-label="sample table">
                <TableHead>
                  <TableRow>
                    <TableExpandHeader
                      aria-label="expand row"
                      {...getExpandHeaderProps()}
                    />
                    {args.radio ? (
                      <th scope="col" />
                    ) : (
                      <TableSelectAll {...getSelectionProps()} />
                    )}
                    {headers.map((header, i) => (
                      <TableHeader key={i} {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {showEmptyState
                    ? null
                    : rows.map((row) => (
                        <React.Fragment key={row.id}>
                          <TableExpandRow {...getRowProps({ row })}>
                            <TableSelectRow {...getSelectionProps({ row })} />
                            {row.cells.map((cell) => (
                              <TableCell {...getCellProps({ cell })}>
                                {cell.value}
                              </TableCell>
                            ))}
                          </TableExpandRow>
                          <TableExpandedRow
                            colSpan={headers.length + 3}
                            className="demo-expanded-td"
                            {...getExpandedRowProps({ row })}>
                            <h6>Expandable row content</h6>
                            <div>Description here</div>
                          </TableExpandedRow>
                        </React.Fragment>
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
                      onClick: () => onSearchChange({ target: { value: '' } }),
                    }}
                  />
                </div>
              )}
            </TableContainer>
          );
        }}
      </DataTable>
    );
  }
}

export default {
  title: 'Components/DataTable/Dynamic',
  component: DataTable,
  args: dataTableArgs,
  argTypes: dataTableArgTypes,
};

export const Default = (args) => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <DynamicRows
      args={args}
      searchValue={searchValue}
      onSearchChange={(evt) => setSearchValue(evt.target.value)}
    />
  );
};

Default.args = {
  size: 'lg',
  useStaticWidth: false,
  useZebraStyles: false,
  isSortable: false,
  locale: 'en',
  radio: false,
};

Default.argTypes = {
  size: {
    control: 'select',
    options: ['xs', 'sm', 'md', 'lg', 'xl'],
    description: 'Change the row height of table',
  },
  useStaticWidth: {
    control: 'boolean',
    description: 'If true, will use a width of "auto" instead of 100%',
  },
  useZebraStyles: {
    control: 'boolean',
    description: 'Add zebra striping to rows',
  },
  isSortable: {
    control: 'boolean',
    description: 'Specify if the rows are sortable',
  },
  locale: {
    description: 'Provide a string for the current locale',
  },
  radio: {
    description: 'Use radio-selection instead of multi-selection',
  },
};
