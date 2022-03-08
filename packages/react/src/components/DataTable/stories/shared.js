/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { action } from '@storybook/addon-actions';
// import Link from '../../Link';
import RadioButton from '../../RadioButton';
import Checkbox from '../../Checkbox';

export const rows = [
  {
    id: 'a',
    name: 'Load Balancer 3',
    protocol: 'HTTP',
    port: (
      <Checkbox disabled labelText={`Checkbox label`} id="checkbox-label-1" />
    ),
    rule: 'Round robin',
    attached_groups: 'Kevin’s VM Groups',
    enabled: (
      <RadioButton disabled labelText="Option 1" value="radio-1" id="radio-1" />
    ),
  },
  {
    id: 'b',
    name: 'Load Balancer 1',
    protocol: 'HTTP',
    port: <Checkbox labelText={`Checkbox label`} id="checkbox-label-1" />,
    rule: 'Round robin',
    attached_groups: 'Maureen’s VM Groups',
    enabled: <RadioButton labelText="Option 1" value="radio-1" id="radio-1" />,
  },
  {
    id: 'c',
    name: 'Load Balancer 2',
    protocol: 'HTTP',
    port: <Checkbox labelText={`Checkbox label`} id="checkbox-label-1" />,
    rule: 'DNS delegation',
    attached_groups: 'Andrew’s VM Groups',
    enabled: <RadioButton labelText="Option 1" value="radio-1" id="radio-1" />,
  },
  {
    id: 'd',
    name: 'Load Balancer 6',
    protocol: 'HTTP',
    port: <Checkbox labelText={`Checkbox label`} id="checkbox-label-1" />,
    rule: 'Round robin',
    attached_groups: 'Marc’s VM Groups',
    enabled: <RadioButton labelText="Option 1" value="radio-1" id="radio-1" />,
  },
  {
    id: 'e',
    name: 'Load Balancer 4',
    protocol: 'HTTP',
    port: <Checkbox labelText={`Checkbox label`} id="checkbox-label-1" />,
    rule: 'Round robin',
    attached_groups: 'Mel’s VM Groups',
    enabled: <RadioButton labelText="Option 1" value="radio-1" id="radio-1" />,
  },
  {
    id: 'f',
    name: 'Load Balancer 5',
    protocol: 'HTTP',
    port: <Checkbox labelText={`Checkbox label`} id="checkbox-label-1" />,
    rule: 'DNS delegation',
    attached_groups: 'Ronja’s VM Groups',
    enabled: <RadioButton labelText="Option 1" value="radio-1" id="radio-1" />,
  },
];

export const headers = [
  {
    key: 'name',
    header: 'Name',
  },
  // {
  //   key: 'protocol',
  //   header: 'Protocol',
  // },
  {
    key: 'port',
    header: 'Port',
  },
  // {
  //   key: 'rule',
  //   header: 'Rule',
  // },
  {
    key: 'attached_groups',
    header: 'Attached Groups',
  },
  // {
  //   key: 'status',
  //   header: 'Status',
  // },
  {
    key: 'enabled',
    header: 'Enabled',
  },
];

export const batchActionClick = (selectedRows) => () =>
  action('batch action click')(selectedRows);
