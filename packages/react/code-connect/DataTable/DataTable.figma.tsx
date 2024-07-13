/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// React : Figma
// DataTable > Table : Data table
// TableSelectRow & TableRow : Data table row
// TableHead > TableRow : Data table header row item
// TableBody > TableRow : Data table body row item
// TableCell : Data table row cell item
// TableHeader : Data table header cell item

import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  Table,
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=4630-268268&mode=design&t=dSt5NCwcWajIQZR7-4',
  {
    props: {
      body: figma.boolean('Body'),
      swapslot: figma.instance('Swap slot'),
      slot: figma.boolean('Slot'), // shows up below data table
      toolbar: figma.boolean('Toolbar'),
      pagination: figma.boolean('Pagination'),
      type: figma.enum('Type', {
        Default: 'default',
        Expandable: 'expandable',
        'Select checkbox': 'select-checkbox',
        'Select radio': 'select-radio',
        'Expandable + Selectable': 'expandable---selectable',
        'Batch actions': 'batch-actions',
      }),
      size: figma.enum('Size', {
        'XL / LG / MD': 'xl---lg---md',
        'SM / XS': 'sm---xs',
      }),
      skeleton: figma.boolean('Skeleton'),
    },
    example: () => {
      // This is sample code for a basic Table
      // See storybook for for detailed implementation docs
      // https://react.carbondesignsystem.com/?path=/docs/components-datatable-basic--overview
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
      ];
      const headers = ['Name', 'Rule', 'Status'];
      return (
        <Table aria-label="sample table">
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
    },
  }
);
