/**
 * Copyright IBM Corp. 2022, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';
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
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { Button } from '../Button';
import { Information, View, FolderOpen, Folders } from '@carbon/icons-react';
import mdx from './FluidMultiSelect.mdx';

export default {
  title: 'Components/Fluid Components/FluidMultiSelect',
  component: FluidMultiSelect,
  parameters: {
    docs: {
      page: mdx,
    },
  },
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

export const Default = ({ defaultWidth, ...multiSelectArgs }) => (
  <div style={{ width: defaultWidth }}>
    <FluidMultiSelect
      id="default"
      titleText="Label"
      label="Choose an option"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      {...multiSelectArgs}
    />
  </div>
);

const sharedArgTypes = {
  autoAlign: {
    control: { type: 'boolean' },
  },
  className: {
    control: {
      type: 'text',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  direction: {
    control: { type: 'select' },
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
  locale: {
    control: { type: 'text' },
  },
  onChange: {
    action: 'onChange',
  },
  onMenuChange: {
    action: 'onMenuChange',
  },
  readOnly: {
    control: { type: 'boolean' },
  },
  selectionFeedback: {
    control: { type: 'select' },
    options: ['top', 'fixed', 'top-after-reopen'],
  },
  size: {
    control: { type: 'select' },
    options: ['xs', 'sm', 'md', 'lg'],
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
  clearSelectionDescription: {
    control: { type: 'text' },
  },
  clearSelectionText: {
    control: { type: 'text' },
  },
  useTitleInItem: {
    control: { type: 'boolean' },
  },
};

const sharedArgs = {
  autoAlign: false,
  className: 'test-class',
  clearSelectionDescription: 'Total items selected: ',
  clearSelectionText: 'To clear selection, press Delete or Backspace.',
  direction: 'bottom',
  disabled: false,
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  label: 'Choose an option',
  locale: 'en',
  readOnly: false,
  selectionFeedback: 'top-after-reopen',
  size: 'md',
  titleText: 'Label',
  useTitleInItem: false,
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

const sharedControls = Object.keys(sharedArgTypes);
const filterableArgTypes = {
  ...sharedArgTypes,
  isFilterable: {
    control: { type: 'boolean' },
    table: { readonly: true },
  },
  onInputValueChange: {
    action: 'onInputValueChange',
  },
};
const condensedArgTypes = {
  ...sharedArgTypes,
  isCondensed: {
    control: { type: 'boolean' },
    table: { readonly: true },
  },
};
const widthArgType = {
  control: { type: 'range', min: 300, max: 800, step: 50 },
};

Default.args = {
  ...sharedArgs,
  defaultWidth: 400,
};

Default.argTypes = {
  ...sharedArgTypes,
  defaultWidth: widthArgType,
};

Default.parameters = {
  controls: { include: [...sharedControls, 'defaultWidth'] },
};

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

export const Filterable = ({ defaultWidth, ...multiSelectArgs }) => (
  <div style={{ width: defaultWidth }}>
    <FluidMultiSelect
      initialSelectedItem={items[2]}
      id="default"
      titleText="Label"
      label="Choose an option"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      {...multiSelectArgs}
    />
  </div>
);

Filterable.args = {
  ...sharedArgs,
  defaultWidth: 400,
  isFilterable: true,
};

Filterable.argTypes = {
  ...filterableArgTypes,
  defaultWidth: widthArgType,
};

Filterable.parameters = {
  controls: {
    include: [...Object.keys(filterableArgTypes), 'defaultWidth'],
  },
};

export const _FilterableWithLayer = ({ defaultWidth, ...multiSelectArgs }) => (
  <WithLayer>
    {(layer) => (
      <div style={{ width: defaultWidth }}>
        <FluidMultiSelect
          id={`carbon-multiselect-example-${layer}`}
          titleText="Multiselect title"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          selectionFeedback="top-after-reopen"
          {...multiSelectArgs}
        />
      </div>
    )}
  </WithLayer>
);

_FilterableWithLayer.args = {
  ...sharedArgs,
  defaultWidth: 300,
  isFilterable: true,
  label: '',
  titleText: 'Multiselect title',
};

_FilterableWithLayer.argTypes = Filterable.argTypes;
_FilterableWithLayer.parameters = Filterable.parameters;

export const Condensed = ({ defaultWidth, ...multiSelectArgs }) => (
  <div style={{ width: defaultWidth }}>
    <FluidMultiSelect
      id="default"
      titleText="Label"
      label="Choose an option"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      {...multiSelectArgs}
    />
  </div>
);

Condensed.args = {
  ...sharedArgs,
  defaultWidth: 400,
  isCondensed: true,
};

Condensed.argTypes = {
  ...condensedArgTypes,
  defaultWidth: widthArgType,
};

Condensed.parameters = {
  controls: {
    include: [...Object.keys(condensedArgTypes), 'defaultWidth'],
  },
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

export const withAILabel = ({ defaultWidth, ...multiSelectArgs }) => (
  <div style={{ width: defaultWidth }}>
    <FluidMultiSelect
      initialSelectedItem={items[2]}
      id="default"
      titleText="Label"
      label="Choose an option"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      decorator={aiLabel}
      {...multiSelectArgs}
    />
  </div>
);

withAILabel.args = {
  ...sharedArgs,
  defaultWidth: 400,
};

withAILabel.argTypes = {
  ...sharedArgTypes,
  defaultWidth: widthArgType,
};

withAILabel.parameters = {
  controls: { include: [...sharedControls, 'defaultWidth'] },
};

export const Skeleton = ({ defaultWidth }) => (
  <div style={{ width: defaultWidth }}>
    <FluidMultiSelectSkeleton />
  </div>
);

Skeleton.args = {
  defaultWidth: 400,
};

Skeleton.argTypes = {
  defaultWidth: widthArgType,
};

Skeleton.parameters = {
  controls: { include: ['defaultWidth'] },
};
