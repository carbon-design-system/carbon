/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { VStack } from '../Stack';
import Toggle, { ToggleSkeleton } from '../Toggle';

export default {
  title: 'Components/Toggle',
  component: Toggle,
};

export const Default = (args) => (
  <Toggle
    labelText="Label"
    labelA="Off"
    labelB="On"
    defaultToggled
    id="toggle-3"
    {...args}
  />
);

Default.argTypes = {
  className: {
    control: false,
  },
  defaultToggled: {
    control: false,
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  hideLabel: {
    control: {
      type: 'boolean',
    },
  },
  id: {
    control: false,
  },
  labelA: {
    control: false,
  },
  labelB: {
    control: false,
  },
  labelText: {
    control: false,
  },
  onClick: {
    control: false,
  },
  onToggle: {
    control: false,
  },
  size: {
    size: {
      options: ['sm', 'md'],
      control: { type: 'select' },
    },
  },
};

export const SmallToggle = () => (
  <Toggle
    size="sm"
    labelText="Label"
    labelA="Off"
    labelB="On"
    defaultToggled
    id="toggle-2"
  />
);

export const WithAccessibleLabels = () => (
  <VStack gap={7}>
    <Toggle id="toggle-4" labelText="Label" />

    <Toggle id="toggle-5" labelText="Label" hideLabel />

    <div>
      <div id="toggle-6-label" style={{ marginBlockEnd: '0.5rem' }}>
        Internal aria-label toggle
      </div>
      <Toggle aria-labelledby="toggle-6-label" id="toggle-6" />
    </div>

    <div>
      <label
        id="toggle-7-label"
        htmlFor="toggle-7"
        style={{ display: 'block', marginBlockEnd: '0.5rem' }}>
        External toggle label
      </label>
      <Toggle aria-labelledby="toggle-7-label" id="toggle-7" />
    </div>
  </VStack>
);

export const Skeleton = () => (
  <div>
    <ToggleSkeleton />
  </div>
);
