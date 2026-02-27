/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { TextInput, Stack } from '@carbon/react';

export const stories = [
  {
    name: 'Default',
    render: () => (
      <TextInput
        id="text-input-default"
        labelText="Label text"
        placeholder="Placeholder text"
        helperText="Helper text"
      />
    ),
  },
  {
    name: 'Invalid',
    render: () => (
      <TextInput
        id="text-input-invalid"
        labelText="Label text"
        placeholder="Placeholder text"
        invalid
        invalidText="Error message goes here"
      />
    ),
  },
  {
    name: 'Warning',
    render: () => (
      <TextInput
        id="text-input-warn"
        labelText="Label text"
        placeholder="Placeholder text"
        warn
        warnText="Warning message that is really long can wrap to more lines."
      />
    ),
  },
  {
    name: 'Disabled',
    render: () => (
      <TextInput
        id="text-input-disabled"
        labelText="Label text"
        placeholder="Placeholder text"
        disabled
      />
    ),
  },
  {
    name: 'Read Only',
    render: () => (
      <TextInput
        id="text-input-readonly"
        labelText="Label text"
        value="Read only value"
        readOnly
      />
    ),
  },
  {
    name: 'Sizes',
    render: () => (
      <Stack gap={6}>
        <TextInput
          id="text-input-sm"
          labelText="Small"
          placeholder="Small input"
          size="sm"
        />
        <TextInput
          id="text-input-md"
          labelText="Medium"
          placeholder="Medium input"
          size="md"
        />
        <TextInput
          id="text-input-lg"
          labelText="Large"
          placeholder="Large input"
          size="lg"
        />
      </Stack>
    ),
  },
];

// Made with Bob
