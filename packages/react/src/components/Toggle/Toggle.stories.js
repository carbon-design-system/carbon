/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Toggle from '../Toggle';

export default {
  title: 'Components/Toggle',
  component: Toggle,
};

export const Default = () => (
  <Toggle
    labelText="Toggle element label"
    labelA="Off"
    labelB="On"
    defaultToggled
    id="toggle-1"
  />
);

export const SmallToggle = () => (
  <Toggle
    size="sm"
    labelText="Toggle element label"
    labelA="Off"
    labelB="On"
    defaultToggled
    id="toggle-2"
  />
);

export const Playground = (args) => (
  <Toggle labelA="Off" labelB="On" defaultToggled id="toggle-1" {...args} />
);

Playground.argTypes = {
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
