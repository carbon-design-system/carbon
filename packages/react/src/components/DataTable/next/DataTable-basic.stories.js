/**
 * Copyright IBM Corp. 2016, 2020
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
} from '..';

import mdx from '../DataTable.mdx';

export default {
  title: 'Components/DataTable/Basic',
  component: DataTable,
  subcomponents: {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
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
  const rows = [
    {
      id: 'load-balancer-1',
      name: 'Load Balancer 1',
      rule: 'Round robin',
      Status: 'Starting',
      other: 'Test',
      example: '22',
    },
    {
      id: 'load-balancer-2',
      name: 'Load Balancer 2',
      rule: 'DNS delegation',
      status: 'Active',
      other: 'Test',
      example: '22',
    },
    {
      id: 'load-balancer-3',
      name: 'Load Balancer 3',
      rule: 'Round robin',
      status: 'Disabled',
      other: 'Test',
      example: '22',
    },
    {
      id: 'load-balancer-4',
      name: 'Load Balancer 4',
      rule: 'Round robin',
      status: 'Disabled',
      other: 'Test',
      example: '22',
    },
    {
      id: 'load-balancer-5',
      name: 'Load Balancer 5',
      rule: 'Round robin',
      status: 'Disabled',
      other: 'Test',
      example: '22',
    },
    {
      id: 'load-balancer-6',
      name: 'Load Balancer 6',
      rule: 'Round robin',
      status: 'Disabled',
      other: 'Test',
      example: '22',
    },
    {
      id: 'load-balancer-7',
      name: 'Load Balancer 7',
      rule: 'Round robin',
      status: 'Disabled',
      other: 'Test',
      example: '22',
    },
  ];
  const headers = ['Name', 'Rule', 'Status', 'Other', 'Example'];

  return (
    <Table {...args}>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableHeader id={header.key} key={header}>
              {header}
            </TableHeader>
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
