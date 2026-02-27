/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Checkbox, CheckboxGroup } from '@carbon/react';

export const stories = [
  {
    name: 'Default',
    render: () => (
      <CheckboxGroup legendText="Checkbox group">
        <Checkbox id="checkbox-1" labelText="Checkbox label" />
        <Checkbox id="checkbox-2" labelText="Checkbox label" defaultChecked />
        <Checkbox id="checkbox-3" labelText="Checkbox label" />
      </CheckboxGroup>
    ),
  },
  {
    name: 'Indeterminate',
    render: () => (
      <CheckboxGroup legendText="Checkbox group">
        <Checkbox
          id="checkbox-ind-1"
          labelText="Checkbox label"
          indeterminate
        />
        <Checkbox
          id="checkbox-ind-2"
          labelText="Checkbox label"
          defaultChecked
        />
        <Checkbox id="checkbox-ind-3" labelText="Checkbox label" />
      </CheckboxGroup>
    ),
  },
  {
    name: 'Disabled',
    render: () => (
      <CheckboxGroup legendText="Checkbox group">
        <Checkbox id="checkbox-dis-1" labelText="Checkbox label" disabled />
        <Checkbox
          id="checkbox-dis-2"
          labelText="Checkbox label"
          disabled
          defaultChecked
        />
      </CheckboxGroup>
    ),
  },
  {
    name: 'Invalid',
    render: () => (
      <CheckboxGroup
        legendText="Checkbox group"
        invalid
        invalidText="Invalid selection">
        <Checkbox id="checkbox-inv-1" labelText="Checkbox label" />
        <Checkbox id="checkbox-inv-2" labelText="Checkbox label" />
      </CheckboxGroup>
    ),
  },
];

// Made with Bob
