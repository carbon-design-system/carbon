/**
 * Copyright IBM Corp. 2022, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { FluidDropdown, FluidDropdownSkeleton } from '../FluidDropdown';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { Button } from '../Button';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import mdx from './FluidDropdown.mdx';

export default {
  title: 'Components/Fluid Components/FluidDropdown',
  component: FluidDropdown,
  decorators: [
    (Story) => (
      <div style={{ width: 400 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      page: mdx,
    },
  },
  subcomponents: {
    FluidDropdownSkeleton,
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

const sharedArgTypes = {
  autoAlign: {
    control: {
      type: 'boolean',
    },
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
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  direction: {
    control: {
      type: 'select',
    },
    options: ['top', 'bottom'],
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
  onChange: {
    action: 'onChange',
  },
  readOnly: {
    control: {
      type: 'boolean',
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

const sharedArgs = {
  autoAlign: false,
  className: 'test-class',
  direction: 'bottom',
  disabled: false,
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  isCondensed: false,
  label: 'Choose an option',
  readOnly: false,
  titleText: 'Label',
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

const sharedControls = Object.keys(sharedArgTypes);

export const Default = (dropdownArgs) => (
  <FluidDropdown
    id="default"
    titleText="Label"
    label="Choose an option"
    items={items}
    itemToString={(item) => (item ? item.text : '')}
    {...dropdownArgs}
  />
);

Default.args = {
  ...sharedArgs,
};

Default.argTypes = {
  ...sharedArgTypes,
};

Default.parameters = {
  controls: { include: sharedControls },
};

export const Condensed = (dropdownArgs) => (
  <FluidDropdown
    id="default"
    titleText="Label"
    label="Choose an option"
    items={items}
    itemToString={(item) => (item ? item.text : '')}
    {...dropdownArgs}
  />
);

Condensed.args = {
  ...sharedArgs,
  isCondensed: true,
};

Condensed.argTypes = {
  ...sharedArgTypes,
  isCondensed: {
    ...sharedArgTypes.isCondensed,
    table: { readonly: true },
  },
};

Condensed.parameters = {
  controls: { include: sharedControls },
};

const aiLabel = (
  <AILabel className="ai-label-container">
    <AILabelContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h2 className="ai-label-heading">84%</h2>
        <p className="secondary bold">Confidence score</p>
        <p className="secondary">
          Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
        </p>
        <hr />
        <p className="secondary">Model type</p>
        <p className="bold">Foundation model</p>
      </div>
      <AILabelActions>
        <IconButton kind="ghost" label="View">
          <View />
        </IconButton>
        <IconButton kind="ghost" label="Open Folder">
          <FolderOpen />
        </IconButton>
        <IconButton kind="ghost" label="Folders">
          <Folders />
        </IconButton>
        <Button>View details</Button>
      </AILabelActions>
    </AILabelContent>
  </AILabel>
);

export const withAILabel = (dropdownArgs) => (
  <FluidDropdown
    initialSelectedItem={items[2]}
    id="default"
    titleText="Label"
    label="Choose an option"
    items={items}
    itemToString={(item) => (item ? item.text : '')}
    decorator={aiLabel}
    {...dropdownArgs}
  />
);

withAILabel.args = {
  ...sharedArgs,
};

withAILabel.argTypes = {
  ...sharedArgTypes,
};

withAILabel.parameters = {
  controls: { include: sharedControls },
};

export const Skeleton = () => <FluidDropdownSkeleton />;
