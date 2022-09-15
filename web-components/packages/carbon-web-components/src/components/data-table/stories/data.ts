/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import 'core-js/modules/es.array.flat.js';
import 'core-js/modules/es.string.pad-start.js';
import { TABLE_SORT_DIRECTION } from '../table-header-cell';
import { TDemoTableColumn, TDemoTableRow, TDemoSortInfo } from './types';

export const columns: TDemoTableColumn[] = [
  {
    id: 'name',
    title: 'Name',
    sortCycle: 'bi-states-from-ascending',
  },
  {
    id: 'protocol',
    title: 'Protocol',
  },
  {
    id: 'port',
    title: 'Port',
    sortCycle: 'tri-states-from-ascending',
  },
  {
    id: 'rule',
    title: 'Rule',
  },
  {
    id: 'attachedGroups',
    title: 'Attached Groups',
  },
  {
    id: 'status',
    title: 'Status',
  },
];

export const rows: TDemoTableRow[] = [
  {
    id: 1,
    name: 'Load Balancer 1',
    protocol: 'HTTP',
    port: 80,
    rule: 'Round Robin',
    attachedGroups: "Maureen's VM Groups",
    status: 'Active',
  },
  {
    id: 2,
    name: 'Load Balancer 2',
    protocol: 'HTTPS',
    port: 443,
    rule: 'Round Robin',
    attachedGroups: "Maureen's VM Groups",
    status: 'Active',
  },
  {
    id: 3,
    selected: true,
    name: 'Load Balancer 3',
    protocol: 'HTTP',
    port: 80,
    rule: 'Round Robin',
    attachedGroups: "Maureen's VM Groups",
    status: 'Active',
  },
];

export const rowsMany: TDemoTableRow[] = Array.from(new Array(50))
  .map((_item, i) =>
    rows.map((row, j) => ({
      ...row,
      id: i * 3 + j,
      name: `Load Balancer ${String(i * 3 + j + 1).padStart(3, '0')}`,
    }))
  )
  .flat();

export const sortInfo: TDemoSortInfo = {
  columnId: 'name',
  direction: TABLE_SORT_DIRECTION.ASCENDING,
};
