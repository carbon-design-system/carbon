/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableExpandHeader,
  TableSelectAll,
} from '@carbon/react';
import figma from '@figma/code-connect';

const sharedTableProps = {
  // skeleton: figma.boolean('Skeleton'),
  slot: figma.boolean('Slot', {
    true: figma.instance('Swap slot'),
  }),
  toolbar: figma.boolean('Toolbar', {
    true: figma.children(['Data table toolbar item']),
  }),
  pagination: figma.boolean('Pagination', {
    true: figma.children(['Pagination - Table bar']),
  }),
  headerItem: figma.nestedProps('Data table header item', {
    description: figma.boolean('Description', {
      true: figma.string('Description text'),
    }),
    title: figma.string('Title text'),
  }),
  headerRow: figma.nestedProps('Data table header row item', {
    size: figma.enum('Size', {
      'Extra large': 'xl',
      Large: 'lg',
      Medium: 'md',
      Small: 'sm',
      'Extra small': 'xs',
    }),
    children: figma.children('Col*'),
  }),
  headerRowItems: figma.children(['Data table header row item']),
  rowItems: figma.boolean('Body', {
    true: figma.children(['Data table body row item']),
  }),
};

figma.connect(
  Table,
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=4630-268268&mode=design&t=dSt5NCwcWajIQZR7-4',
  {
    props: sharedTableProps,
    example: ({
      headerItem,
      headerRow,
      headerRowItems,
      rowItems,
      pagination,
      toolbar,
      slot,
    }) => {
      return (
        <TableContainer
          title={headerItem.title}
          description={headerItem.description}>
          {toolbar}
          <Table size={headerRow.size} aria-label="sample table">
            <TableHead>
              <TableRow>{headerRow.children}</TableRow>
            </TableHead>
            <TableBody>{rowItems}</TableBody>
          </Table>
          {pagination}
          {slot}
        </TableContainer>
      );
    },
  }
);

figma.connect(
  Table,
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=4630-268268&mode=design&t=dSt5NCwcWajIQZR7-4',
  {
    variant: { Type: 'Expandable' },
    props: sharedTableProps,
    example: ({
      headerItem,
      headerRow,
      headerRowItems,
      rowItems,
      pagination,
      toolbar,
      slot,
    }) => {
      return (
        <TableContainer
          title={headerItem.title}
          description={headerItem.description}>
          {toolbar}
          <Table size={headerRow.size} aria-label="sample table">
            <TableHead>
              <TableRow>
                <TableExpandHeader aria-label="expand row" />
                {headerRow.children}
              </TableRow>
            </TableHead>
            <TableBody>{rowItems}</TableBody>
          </Table>
          {pagination}
          {slot}
        </TableContainer>
      );
    },
  }
);

figma.connect(
  Table,
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=4630-268268&mode=design&t=dSt5NCwcWajIQZR7-4',
  {
    variant: { Type: 'Select checkbox' },
    props: sharedTableProps,
    example: ({
      headerItem,
      headerRow,
      headerRowItems,
      rowItems,
      pagination,
      toolbar,
      slot,
    }) => {
      return (
        <TableContainer
          title={headerItem.title}
          description={headerItem.description}>
          {toolbar}
          <Table size={headerRow.size} aria-label="sample table">
            <TableHead>
              <TableRow>
                <TableSelectAll />
                {headerRow.children}
              </TableRow>
            </TableHead>
            <TableBody>{rowItems}</TableBody>
          </Table>
          {pagination}
          {slot}
        </TableContainer>
      );
    },
  }
);

figma.connect(
  Table,
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=4630-268268&mode=design&t=dSt5NCwcWajIQZR7-4',
  {
    variant: { Type: 'Select radio' },
    props: sharedTableProps,
    example: ({
      headerItem,
      headerRow,
      headerRowItems,
      rowItems,
      pagination,
      toolbar,
      slot,
    }) => {
      return (
        <TableContainer
          title={headerItem.title}
          description={headerItem.description}>
          {toolbar}
          <Table size={headerRow.size} aria-label="sample table">
            <TableHead>
              <TableRow>
                <th scope="col" />
                {headerRow.children}
              </TableRow>
            </TableHead>
            <TableBody>{rowItems}</TableBody>
          </Table>
          {pagination}
          {slot}
        </TableContainer>
      );
    },
  }
);

figma.connect(
  Table,
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=4630-268268&mode=design&t=dSt5NCwcWajIQZR7-4',
  {
    variant: { Type: 'Expandable + Selectable' },
    props: sharedTableProps,
    example: ({
      headerItem,
      headerRow,
      headerRowItems,
      rowItems,
      pagination,
      toolbar,
      slot,
    }) => {
      return (
        <TableContainer
          title={headerItem.title}
          description={headerItem.description}>
          {toolbar}
          <Table size={headerRow.size} aria-label="sample table">
            <TableHead>
              <TableRow>
                <TableExpandHeader aria-label="expand row" />
                <TableSelectAll />
                {headerRow.children}
              </TableRow>
            </TableHead>
            <TableBody>{rowItems}</TableBody>
          </Table>
          {pagination}
          {slot}
        </TableContainer>
      );
    },
  }
);
