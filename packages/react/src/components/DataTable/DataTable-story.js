import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import React from 'react';
import {
  default as DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from '../DataTable';
import mdx from './DataTable.mdx';
import { headers, rows } from './stories/shared';

const props = () => ({
  useZebraStyles: boolean('Zebra row styles (useZebraStyles)', false),
  size: select(
    'Row height (size)',
    { compact: 'compact', short: 'short', tall: 'tall', none: null },
    null
  ),
  stickyHeader: boolean('Sticky header (experimental)', false),
});

export default {
  title: 'DataTable',
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Usage = () => (
  <DataTable
    rows={rows}
    headers={headers}
    render={({ rows, headers, getHeaderProps }) => (
      <TableContainer title="DataTable">
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader key={header.key} {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {row.cells.map((cell) => (
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

export const TableExample = () => {
  const rows = [
    {
      id: 'load-balancer-1',
      name: 'Load Balancer 1',
      rule: 'Round robin',
      Status: 'Starting',
    },
    {
      id: 'load-balancer-2',
      name: 'Load Balancer 2',
      rule: 'DNS delegation',
      status: 'Active',
    },
    {
      id: 'load-balancer-3',
      name: 'Load Balancer 3',
      rule: 'Round robin',
      status: 'Disabled',
    },
  ];
  const headers = ['Name', 'Rule', 'Status'];

  return (
    <Table>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableHeader key={header}>{header}</TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            {Object.keys(row)
              .filter((key) => key !== 'id')
              .map((key) => {
                return <TableCell key={key}>{row[key]}</TableCell>;
              })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

TableExample.story = {
  name: 'Table',
};

// // export const Default = withReadme(readme, () =>
// // require('./stories/default').default(props())
// // );

// // Default.story = {
// // name: 'default',
// // };

// // export const WithToolbar = withReadme(readme, () =>
// // require('./stories/with-toolbar').default(props())
// // );

// // WithToolbar.story = {
// // name: 'with toolbar',
// // };

// // export const WithSelection = withReadme(readme, () =>
// // require('./stories/with-selection').default(props())
// // );

// // WithSelection.story = {
// // name: 'with selection',
// // };

// // export const WithRadioButtonSelection = withReadme(readme, () =>
// // require('./stories/with-selection--radio').default(props())
// // );

// // WithRadioButtonSelection.story = {
// // name: 'with radio button selection',
// // };

// // export const WithExpansion = withReadme(readme, () =>
// // require('./stories/with-expansion').default(props())
// // );

// // WithExpansion.story = {
// // name: 'with expansion',
// // };

// // export const WithBatchExpansion = withReadme(readme, () =>
// // require('./stories/with-batch-expansion').default(props())
// // );

// // WithBatchExpansion.story = {
// // name: 'with batch expansion',
// // };

// // export const WithBatchActions = withReadme(readme, () =>
// // require('./stories/with-batch-actions').default(props())
// // );

// // WithBatchActions.story = {
// // name: 'with batch actions',
// // };

// // export const WithDynamicContent = withReadme(readme, () =>
// // require('./stories/with-dynamic-content').default(props())
// // );

// // WithDynamicContent.story = {
// // name: 'with dynamic content',
// // };

// // export const WithBooleanColumn = withReadme(readme, () =>
// // require('./stories/with-boolean-column').default(props())
// // );

// // WithBooleanColumn.story = {
// // name: 'with boolean column',
// // };

// // export const WithOptions = withReadme(readme, () =>
// // require('./stories/with-options').default(props())
// // );

// // WithOptions.story = {
// // name: 'with options',
// // };

// // export const WithOverflowMenu = withReadme(readme, () =>
// // require('./stories/with-overflow-menu').default({
// // ...props(),
// // overflowMenuOnHover: boolean(
// // 'Show overflow menu on hover (overflowMenuOnHover)',
// // false
// // ),
// // })
// // );

// // WithOverflowMenu.story = {
// // name: 'with overflow menu',
// // };
