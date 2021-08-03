/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import { Download16 } from '@carbon/icons-react';
import Link from '../Link';
import mdx from './Link.mdx';

import {
  DataTable,
  Table,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from 'carbon-components-react';

const sizes = {
  'Small  (sm)': 'sm',
  'Medium (md) - default': undefined,
  'Large  (lg)': 'lg',
};

const props = () => ({
  className: 'some-class',
  href: text('The link href (href)', '#'),
  inline: boolean('Use the in-line variant (inline)', false),
  visited: boolean('Allow visited styles', false),
  onClick: ((handler) => (evt) => {
    evt.preventDefault(); // Prevent link from being followed for demo purpose
    handler(evt);
  })(action('onClick')),
  disabled: boolean('Disabled', false),
  size: select('Field size (size)', sizes, undefined) || undefined,
});

export default {
  title: 'Components/Link',
  decorators: [withKnobs],

  parameters: {
    component: Link,
    docs: {
      page: mdx,
    },
  },
};

export const _Default = () => (
  <Link href="http://www.carbondesignsystem.com">Link</Link>
);

_Default.story = {
  name: 'Link',
};

export const PairedWithIcon = () => (
  <Link href="http://www.carbondesignsystem.com" renderIcon={Download16}>
    Download
  </Link>
);

export const Playground = () => <Link {...props()}>Link</Link>;

const headerData = [
  {
    header: 'Name',
    key: 'name',
  },
];
const rowData = [
  {
    id: 'a',
    name: 'Load Balancer 3',
  },
  {
    id: 'b',
    name: 'Load Balancer 1',
  },
];

export const TESTING = () => (
  <DataTable rows={rowData} headers={headerData}>
    {({ rows, headers, getHeaderProps, getTableProps }) => (
      <TableContainer title="DataTable">
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                // eslint-disable-next-line react/jsx-key
                <TableHeader {...getHeaderProps({ header })}></TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {row.cells.map((cell) => (
                  <TableCell key={cell.id}>
                    <Link disabled={true} href="#">
                      {cell.value}
                    </Link>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);
