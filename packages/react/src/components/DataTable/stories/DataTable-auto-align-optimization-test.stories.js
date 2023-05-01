/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { DataTable } from '..';

const {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} = DataTable;

import mdx from '../DataTable.mdx';
import './datatable-story.scss';

export default {
  title: 'Components/DataTable/OptimizationTest/AutoAlign',
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
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
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
    <Table size="lg" useZebraStyles={false} autoAlign>
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

const performanceRows12000Cells = [];
const performanceHeaders12000Cells = [];
for (let i = 0; i < 1000; i++) {
  const row = {};
  for (let j = 0; j < 16; j++) {
    if (i === 0) {
      performanceHeaders12000Cells.push(`h-${j}`);
    }
    row[`h-${j}`] = `${i}-${j}`;
  }
  performanceRows12000Cells.push(row);
}

export const PerformanceTest12000Cells = () => {
  return (
    <Table size="lg" useZebraStyles={false} autoAlign>
      <TableHead>
        <TableRow>
          {performanceHeaders12000Cells.map((header) => (
            <TableHeader id={header.key} key={header}>
              {header}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {performanceRows12000Cells.map((row) => (
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

const performanceRows10000Cells = [];
const performanceHeaders10000Cells = [];
for (let i = 0; i < 625; i++) {
  const row = {};
  for (let j = 0; j < 16; j++) {
    if (i === 0) {
      performanceHeaders10000Cells.push(`h-${j}`);
    }
    row[`h-${j}`] = `${i}-${j}`;
  }
  performanceRows10000Cells.push(row);
}

export const PerformanceTest10000Cells = () => {
  return (
    <Table size="lg" useZebraStyles={false} autoAlign>
      <TableHead>
        <TableRow>
          {performanceHeaders10000Cells.map((header) => (
            <TableHeader id={header.key} key={header}>
              {header}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {performanceRows10000Cells.map((row) => (
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

const performanceRows2000Cells = [];
const performanceHeaders2000Cells = [];
for (let i = 0; i < 125; i++) {
  const row = {};
  for (let j = 0; j < 16; j++) {
    if (i === 0) {
      performanceHeaders2000Cells.push(`h-${j}`);
    }
    row[`h-${j}`] = `${i}-${j}`;
  }
  performanceRows2000Cells.push(row);
}

export const PerformanceTest2000Cells = () => {
  return (
    <Table size="lg" useZebraStyles={false} autoAlign>
      <TableHead>
        <TableRow>
          {performanceHeaders2000Cells.map((header) => (
            <TableHeader id={header.key} key={header}>
              {header}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {performanceRows2000Cells.map((row) => (
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

const performanceRows1250CellsEmojis = [];
const performanceHeaders1250CellsEmojis = [];
const emojis = ['🤔', '😅', '🙏🏻', '🚀', '👋🏼'];
for (let i = 0; i < 125; i++) {
  const row = {};
  for (let j = 0; j < 10; j++) {
    if (i === 0) {
      performanceHeaders1250CellsEmojis.push(`h-${j}`);
    }
    row[`h-${j}`] = `${i}-${j}` + emojis[Math.floor(Math.random() * 5)];
  }
  performanceRows1250CellsEmojis.push(row);
}

export const PerformanceTest1250CellsEmojis = () => {
  return (
    <Table size="lg" useZebraStyles={false} autoAlign>
      <TableHead>
        <TableRow>
          {performanceHeaders1250CellsEmojis.map((header) => (
            <TableHeader id={header.key} key={header}>
              {header}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {performanceRows1250CellsEmojis.map((row) => (
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
