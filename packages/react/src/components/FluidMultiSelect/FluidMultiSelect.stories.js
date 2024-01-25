/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  FluidMultiSelect,
  FluidMultiSelectSkeleton,
} from '../FluidMultiSelect';
import {
  ToggletipLabel,
  Toggletip,
  ToggletipButton,
  ToggletipContent,
} from '../Toggletip';
import { Information } from '@carbon/icons-react';

export default {
  title: 'Experimental/Fluid Components/unstable__FluidMultiSelect',
  component: FluidMultiSelect,
  subcomponents: {
    FluidMultiSelectSkeleton,
  },
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
    <FluidMultiSelect
      onChange={() => {}}
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
    <FluidMultiSelect
      onChange={() => {}}
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
    <FluidMultiSelect
      onChange={() => {}}
      id="default"
      titleText="Label"
      label="Choose an option"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      {...args}
    />
    <br />
    <FluidMultiSelect
      {...args}
      onChange={() => {}}
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
    <FluidMultiSelectSkeleton />
  </div>
);

Playground.args = {
  playgroundWidth: 400,
  className: 'test-class',
  isCondensed: false,
  isFilterable: false,
  disabled: false,
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  label: 'Choose an option',
  titleText: 'Label',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

Playground.argTypes = {
  playgroundWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  className: {
    control: {
      type: 'text',
    },
  },
  isCondensed: {
    control: {
      type: 'boolean',
    },
  },
  isFilterable: {
    control: {
      type: 'boolean',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  invalid: {
    control: {
      type: 'boolean',
    },
  },
  invalidText: {
    control: {
      type: 'text',
    },
  },
  label: {
    control: {
      type: 'text',
    },
  },
  titleText: {
    control: {
      type: 'text',
    },
  },
  warn: {
    control: {
      type: 'boolean',
    },
  },
  warnText: {
    control: {
      type: 'text',
    },
  },
};
