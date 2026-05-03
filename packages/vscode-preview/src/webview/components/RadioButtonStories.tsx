/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { RadioButton, RadioButtonGroup, Stack } from '@carbon/react';

export const stories = [
  {
    name: 'Default',
    render: () => (
      <RadioButtonGroup
        legendText="Radio button group"
        name="radio-default"
        defaultSelected="radio-1">
        <RadioButton
          id="radio-default-1"
          labelText="Option 1"
          value="radio-1"
        />
        <RadioButton
          id="radio-default-2"
          labelText="Option 2"
          value="radio-2"
        />
        <RadioButton
          id="radio-default-3"
          labelText="Option 3"
          value="radio-3"
        />
      </RadioButtonGroup>
    ),
  },
  {
    name: 'Disabled',
    render: () => (
      <RadioButtonGroup
        legendText="Radio button group"
        name="radio-disabled"
        defaultSelected="radio-disabled-2">
        <RadioButton
          id="radio-disabled-1"
          labelText="Disabled unselected"
          value="radio-disabled-1"
          disabled
        />
        <RadioButton
          id="radio-disabled-2"
          labelText="Disabled selected"
          value="radio-disabled-2"
          disabled
        />
      </RadioButtonGroup>
    ),
  },
  {
    name: 'Orientation',
    render: () => (
      <Stack gap={6}>
        <RadioButtonGroup
          legendText="Vertical group"
          name="radio-vertical"
          defaultSelected="vertical-1"
          orientation="vertical">
          <RadioButton
            id="radio-vertical-1"
            labelText="First option"
            value="vertical-1"
          />
          <RadioButton
            id="radio-vertical-2"
            labelText="Second option"
            value="vertical-2"
          />
        </RadioButtonGroup>

        <RadioButtonGroup
          legendText="Horizontal group"
          name="radio-horizontal"
          defaultSelected="horizontal-1"
          orientation="horizontal">
          <RadioButton
            id="radio-horizontal-1"
            labelText="First option"
            value="horizontal-1"
          />
          <RadioButton
            id="radio-horizontal-2"
            labelText="Second option"
            value="horizontal-2"
          />
        </RadioButtonGroup>
      </Stack>
    ),
  },
  {
    name: 'Invalid',
    render: () => (
      <RadioButtonGroup
        legendText="Radio button group"
        name="radio-invalid"
        defaultSelected="radio-invalid-1"
        invalid
        invalidText="Select a valid option">
        <RadioButton
          id="radio-invalid-1"
          labelText="Option 1"
          value="radio-invalid-1"
        />
        <RadioButton
          id="radio-invalid-2"
          labelText="Option 2"
          value="radio-invalid-2"
        />
      </RadioButtonGroup>
    ),
  },
];

// Made with Bob