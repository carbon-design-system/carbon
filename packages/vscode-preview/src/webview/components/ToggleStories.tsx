/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Toggle, Stack } from '@carbon/react';

export const stories = [
  {
    name: 'Default',
    render: () => (
      <Toggle
        id="toggle-default"
        labelText="Toggle label"
        labelA="Off"
        labelB="On"
      />
    ),
  },
  {
    name: 'Checked',
    render: () => (
      <Toggle
        id="toggle-checked"
        labelText="Toggle label"
        labelA="Off"
        labelB="On"
        defaultToggled
      />
    ),
  },
  {
    name: 'Disabled',
    render: () => (
      <Stack gap={6}>
        <Toggle
          id="toggle-disabled-off"
          labelText="Toggle label"
          labelA="Off"
          labelB="On"
          disabled
        />
        <Toggle
          id="toggle-disabled-on"
          labelText="Toggle label"
          labelA="Off"
          labelB="On"
          disabled
          defaultToggled
        />
      </Stack>
    ),
  },
  {
    name: 'Sizes',
    render: () => (
      <Stack gap={6}>
        <Toggle
          id="toggle-sm"
          labelText="Small"
          labelA="Off"
          labelB="On"
          size="sm"
        />
        <Toggle
          id="toggle-md"
          labelText="Medium"
          labelA="Off"
          labelB="On"
          size="md"
        />
      </Stack>
    ),
  },
];

// Made with Bob
