/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Dropdown, Stack } from '@carbon/react';

const items = [
  { id: 'option-1', text: 'Option 1' },
  { id: 'option-2', text: 'Option 2' },
  { id: 'option-3', text: 'Option 3' },
  { id: 'option-4', text: 'Option 4' },
];

export const stories = [
  {
    name: 'Default',
    render: () => (
      <Dropdown
        id="dropdown-default"
        titleText="Label"
        helperText="Helper text"
        label="Select an option"
        items={items}
        itemToString={(item: { text: string } | null) =>
          item ? item.text : ''
        }
      />
    ),
  },
  {
    name: 'Invalid',
    render: () => (
      <Dropdown
        id="dropdown-invalid"
        titleText="Label"
        label="Select an option"
        items={items}
        itemToString={(item: { text: string } | null) =>
          item ? item.text : ''
        }
        invalid
        invalidText="Please select an option"
      />
    ),
  },
  {
    name: 'Disabled',
    render: () => (
      <Dropdown
        id="dropdown-disabled"
        titleText="Label"
        label="Select an option"
        items={items}
        itemToString={(item: { text: string } | null) =>
          item ? item.text : ''
        }
        disabled
      />
    ),
  },
  {
    name: 'Sizes',
    render: () => (
      <Stack gap={6}>
        <Dropdown
          id="dropdown-sm"
          titleText="Small"
          label="Select an option"
          items={items}
          itemToString={(item: { text: string } | null) =>
            item ? item.text : ''
          }
          size="sm"
        />
        <Dropdown
          id="dropdown-md"
          titleText="Medium"
          label="Select an option"
          items={items}
          itemToString={(item: { text: string } | null) =>
            item ? item.text : ''
          }
          size="md"
        />
        <Dropdown
          id="dropdown-lg"
          titleText="Large"
          label="Select an option"
          items={items}
          itemToString={(item: { text: string } | null) =>
            item ? item.text : ''
          }
          size="lg"
        />
      </Stack>
    ),
  },
];

// Made with Bob
