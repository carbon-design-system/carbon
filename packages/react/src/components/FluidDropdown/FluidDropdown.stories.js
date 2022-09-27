/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { FluidDropdown, FluidDropdownSkeleton } from '../FluidDropdown';
import {
  ToggletipLabel,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
} from '../Toggletip';
import { Information } from '@carbon/icons-react';

export default {
  title: 'Experimental/unstable__FluidDropdown',
  component: FluidDropdown,
};

const items = [
  {
    id: 'option-0',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    id: 'option-1',
    text: 'Option 1',
  },
  {
    id: 'option-2',
    text: 'Option 2',
  },
  {
    id: 'option-3',
    text: 'Option 3 - a disabled item',
    disabled: true,
  },
  {
    id: 'option-4',
    text: 'Option 4',
  },
  {
    id: 'option-5',
    text: 'Option 5',
  },
];

const ToggleTip = (
  <>
    <ToggletipLabel>Label</ToggletipLabel>
    <Toggletip align="top-left">
      <ToggletipButton label="Show information">
        <Information />
      </ToggletipButton>
      <ToggletipContent>
        <p>Additional field information here.</p>
      </ToggletipContent>
    </Toggletip>
  </>
);

export const Default = () => (
  <div style={{ width: '400px' }}>
    <FluidDropdown
      initialSelectedItem={items[2]}
      id="default"
      titleText="Label"
      label="Choose an option"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
    />
  </div>
);

export const Condensed = () => (
  <div style={{ width: '400px' }}>
    <FluidDropdown
      id="default"
      isCondensed
      titleText="Label"
      label="Choose an option"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
    />
  </div>
);

export const Playground = (args) => (
  <div style={{ width: args.playgroundWidth }}>
    <FluidDropdown
      id="default"
      titleText="Label"
      label="Choose an option"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      {...args}
    />
    <br />
    <FluidDropdown
      {...args}
      id="default-3"
      titleText={ToggleTip}
      label="Choose an option"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
    />
  </div>
);

export const Skeleton = () => (
  <div style={{ width: 400 }}>
    <FluidDropdownSkeleton />
  </div>
);

Playground.argTypes = {
  playgroundWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
    defaultValue: 400,
  },
  className: {
    control: {
      type: 'text',
    },
    defaultValue: 'test-class',
  },
  isCondensed: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  disabled: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  invalid: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  invalidText: {
    control: {
      type: 'text',
    },
    defaultValue:
      'Error message that is really long can wrap to more lines but should not be excessively long.',
  },
  label: {
    control: {
      type: 'text',
    },
    defaultValue: 'Choose an option',
  },
  titleText: {
    control: {
      type: 'text',
    },
    defaultValue: 'Label',
  },
  warn: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  warnText: {
    control: {
      type: 'text',
    },
    defaultValue:
      'Warning message that is really long can wrap to more lines but should not be excessively long.',
  },
};
