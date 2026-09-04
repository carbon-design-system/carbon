/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { FolderOpen, Folders, Information, View } from '@carbon/icons-react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import { default as Dropdown, DropdownSkeleton } from './';
import Button from '../Button';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import {
  Toggletip,
  ToggletipActions,
  ToggletipButton,
  ToggletipContent,
  ToggletipLabel,
} from '../Toggletip';
import { IconButton } from '../IconButton';
import mdx from './Dropdown.mdx';
import Link from '../Link';

const items = [
  {
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    text: 'Option 1',
  },
  {
    text: 'Option 2',
  },
  {
    text: 'Option 3',
    disabled: true,
  },
  {
    text: 'Option 4',
  },
  {
    text: 'Option 5',
  },
  {
    text: 'Option 6',
  },
  {
    text: 'Option 7',
  },
  {
    text: 'Option 8',
  },
];

const sharedArgs = {
  'aria-label': '',
  autoAlign: false,
  direction: 'bottom',
  disabled: false,
  helperText: 'Helper text',
  hideLabel: false,
  invalid: false,
  invalidText: 'Error message goes here',
  label: 'Choose an option',
  readOnly: false,
  size: 'md',
  titleText: 'Label',
  type: 'default',
  warn: false,
  warnText: 'Warning message goes here',
};

const sharedArgTypes = {
  'aria-label': {
    control: 'text',
  },
  autoAlign: {
    control: 'boolean',
  },
  direction: {
    control: 'select',
    options: ['top', 'bottom'],
  },
  invalid: {
    control: 'boolean',
  },
  invalidText: {
    control: 'text',
  },
  disabled: {
    control: 'boolean',
  },
  hideLabel: {
    control: 'boolean',
  },
  helperText: {
    control: 'text',
  },
  label: {
    control: 'text',
  },
  onChange: {
    action: 'onChange',
  },
  readOnly: {
    control: 'boolean',
  },
  warn: {
    control: 'boolean',
  },
  warnText: {
    control: 'text',
  },
  titleText: {
    control: 'text',
    type: {
      required: true,
    },
  },
  size: {
    options: ['xs', 'sm', 'md', 'lg'],
    control: 'select',
  },
  type: {
    control: 'select',
    options: ['default', 'inline'],
  },
};

const skeletonArgs = {
  hideLabel: false,
  size: 'md',
};

const skeletonArgTypes = {
  hideLabel: { control: 'boolean' },
  size: {
    control: 'select',
    options: ['xs', 'sm', 'md', 'lg'],
  },
};

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  subcomponents: {
    DropdownSkeleton,
  },
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      include: Object.keys(sharedArgTypes),
    },
  },
};

export const Default = (args) => {
  const items = [
    {
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      text: 'Option 1',
    },
    {
      text: 'Option 2',
    },
    {
      text: 'Option 3',
      disabled: true,
    },
    {
      text: 'Option 4',
    },
    {
      text: 'Option 5',
    },
    {
      text: 'Option 6',
    },
    {
      text: 'Option 7',
    },
    {
      text: 'Option 8',
    },
  ];

  return (
    <div style={{ width: 400 }}>
      <Dropdown
        id="default"
        titleText="Label"
        helperText="Helper text"
        label="Choose an option"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        {...args}
      />
    </div>
  );
};

Default.args = {
  ...sharedArgs,
};

Default.argTypes = {
  ...sharedArgTypes,
};

export const ExperimentalAutoAlign = (args) => {
  const items = [
    {
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      text: 'Option 1',
    },
    {
      text: 'Option 2',
    },
    {
      text: 'Option 3',
      disabled: true,
    },
    {
      text: 'Option 4',
    },
    {
      text: 'Option 5',
    },
    {
      text: 'Option 6',
    },
    {
      text: 'Option 7',
    },
    {
      text: 'Option 8',
    },
  ];
  return (
    <div style={{ width: 400 }}>
      <div style={{ height: 300 }}></div>
      <Dropdown
        autoAlign={true}
        id="default"
        titleText="Label"
        helperText="Helper text"
        initialSelectedItem={items[1]}
        label="Option 1"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        direction="top"
        {...args}
      />
      <div style={{ height: 800 }}></div>
    </div>
  );
};

ExperimentalAutoAlign.argTypes = {
  ...sharedArgTypes,
};

ExperimentalAutoAlign.args = {
  ...sharedArgs,
  autoAlign: true,
  direction: 'top',
  label: 'Option 1',
};

export const Inline = (args) => {
  const items = [
    {
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      text: 'Option 1',
    },
    {
      text: 'Option 2',
    },
    {
      text: 'Option 3',
      disabled: true,
    },
    {
      text: 'Option 4',
    },
    {
      text: 'Option 5',
    },
    {
      text: 'Option 6',
    },
    {
      text: 'Option 7',
    },
    {
      text: 'Option 8',
    },
  ];
  return (
    <div style={{ width: 600 }}>
      <Dropdown
        id="inline"
        titleText="Label"
        initialSelectedItem={items[1]}
        label="Option 1"
        type="inline"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        {...args}
      />
    </div>
  );
};

Inline.argTypes = {
  ...sharedArgTypes,
  type: {
    ...sharedArgTypes.type,
    table: { readonly: true },
  },
};

Inline.args = {
  ...sharedArgs,
  helperText: '',
  label: 'Option 1',
  type: 'inline',
};

export const _WithLayer = (args) => (
  <WithLayer>
    {(layer) => (
      <div style={{ width: 400 }}>
        <Dropdown
          id={`default-${layer}`}
          titleText="Label"
          helperText="Helper text"
          initialSelectedItem={items[1]}
          label="Option 1"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          {...args}
        />
      </div>
    )}
  </WithLayer>
);

_WithLayer.argTypes = {
  ...sharedArgTypes,
};

_WithLayer.args = {
  ...sharedArgs,
  label: 'Option 1',
};

export const InlineWithLayer = (args) => (
  <WithLayer>
    {(layer) => (
      <div style={{ width: 600 }}>
        <Dropdown
          id={`inline-${layer}`}
          titleText="Label"
          initialSelectedItem={items[1]}
          label="Option 1"
          type="inline"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          {...args}
        />
      </div>
    )}
  </WithLayer>
);

InlineWithLayer.argTypes = {
  ...sharedArgTypes,
  type: {
    ...sharedArgTypes.type,
    table: { readonly: true },
  },
};

InlineWithLayer.args = {
  ...sharedArgs,
  helperText: '',
  label: 'Option 1',
  type: 'inline',
};

export const Skeleton = (args) => {
  return (
    <div style={{ width: 300 }}>
      <DropdownSkeleton {...args} />
    </div>
  );
};

Skeleton.args = { ...skeletonArgs };
Skeleton.argTypes = { ...skeletonArgTypes };
Skeleton.parameters = {
  controls: { include: Object.keys(skeletonArgTypes) },
};

export const withAILabel = (args) => {
  const aiLabel = (
    <AILabel className="ai-label-container">
      <AILabelContent>
        <div>
          <p className="secondary">AI Explained</p>
          <h2 className="ai-label-heading">84%</h2>
          <p className="secondary bold">Confidence score</p>
          <p className="secondary">
            Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
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
  const items = [
    {
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      text: 'Option 1',
    },
    {
      text: 'Option 2',
    },
    {
      text: 'Option 3',
      disabled: true,
    },
    {
      text: 'Option 4',
    },
    {
      text: 'Option 5',
    },
    {
      text: 'Option 6',
    },
    {
      text: 'Option 7',
    },
    {
      text: 'Option 8',
    },
  ];

  return (
    <div style={{ width: 400 }}>
      <Dropdown
        id="default"
        titleText="Label"
        helperText="Helper text"
        initialSelectedItem={items[1]}
        label="Option 1"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        decorator={aiLabel}
        {...args}
      />
    </div>
  );
};

withAILabel.argTypes = {
  ...sharedArgTypes,
};

withAILabel.args = {
  ...sharedArgs,
  label: 'Option 1',
};

export const withToggletipLabel = ({ titleText, ...args }) => {
  return (
    <div style={{ width: 400 }}>
      <Dropdown
        {...args}
        id="dropdown"
        label="placeholder"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        titleText={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ToggletipLabel>{titleText}</ToggletipLabel>
            <Toggletip>
              <ToggletipButton label="Show information">
                <Information />
              </ToggletipButton>
              <ToggletipContent>
                <p>
                  Lorem ipsum dolor sit amet, di os consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut fsil labore et dolore
                  magna aliqua.
                </p>
                <ToggletipActions>
                  <Link href="#">Link action</Link>
                  <Button size="sm">Button</Button>
                </ToggletipActions>
              </ToggletipContent>
            </Toggletip>
          </div>
        }
      />
    </div>
  );
};

withToggletipLabel.args = {
  ...sharedArgs,
  helperText: '',
  label: 'placeholder',
};
withToggletipLabel.argTypes = { ...sharedArgTypes };

// Hidden Test-Only Story. This story tests for a bug where the invalid-text would overlap with components below it. #19960
export const TestInvalidTextNoOverlap = () => {
  const items = [
    {
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    },
  ];

  return (
    <div style={{ width: 400 }}>
      <Dropdown
        id="test-1"
        titleText="Label"
        helperText="Helper text"
        label="Choose an option"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        invalid
        invalidText="Error message goes here"
      />
      <Dropdown
        titleText="Label"
        label="Choose an option"
        itemToString={(item) => (item ? item.text : '')}
        id="test-2"
        items={items}
      />
    </div>
  );
};
/*
 * This story will:
 * - Be excluded from the docs page
 * - Removed from the sidebar navigation
 * - Still be a tested variant
 */
TestInvalidTextNoOverlap.tags = ['!dev', '!autodocs'];
