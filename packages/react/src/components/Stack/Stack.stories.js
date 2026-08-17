/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Stack } from './Stack';

const args = {
  as: 'div',
  gap: 6,
  orientation: 'vertical',
};

const argTypes = {
  as: {
    control: {
      type: 'text',
    },
  },
  gap: {
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    control: {
      type: 'select',
    },
  },
  orientation: {
    options: ['horizontal', 'vertical'],
    control: {
      type: 'select',
    },
  },
};

export default {
  title: 'Layout/Stack',
  component: Stack,
  args,
  argTypes,
};

export const Horizontal = (args) => {
  return (
    <Stack {...args}>
      <div>Account settings</div>
      <div>Billing details</div>
      <div>Notification preferences</div>
    </Stack>
  );
};

Horizontal.args = {
  orientation: 'horizontal',
};

Horizontal.argTypes = {
  orientation: {
    ...argTypes.orientation,
    table: {
      readonly: true,
    },
  },
};

export const Default = (args) => {
  return (
    <Stack {...args}>
      <div>Account settings</div>
      <div>Billing details</div>
      <div>Notification preferences</div>
    </Stack>
  );
};
