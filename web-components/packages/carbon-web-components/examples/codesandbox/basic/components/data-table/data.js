/**
 * @license
 *
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
export const columns = [
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

export const rows = [
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
  {
    id: 4,
    name: 'Load Balancer 4',
    protocol: 'HTTP',
    port: 80,
    rule: 'Round Robin',
    attachedGroups: "Maureen's VM Groups",
    status: 'Active',
  },
  {
    id: 5,
    name: 'Load Balancer 5',
    protocol: 'HTTPS',
    port: 443,
    rule: 'Round Robin',
    attachedGroups: "Maureen's VM Groups",
    status: 'Active',
  },
  {
    id: 6,
    selected: true,
    name: 'Load Balancer 6',
    protocol: 'HTTP',
    port: 80,
    rule: 'Round Robin',
    attachedGroups: "Maureen's VM Groups",
    status: 'Active',
  },
];
