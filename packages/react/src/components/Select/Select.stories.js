/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';
import { default as Select, SelectSkeleton } from '../Select';
import SelectItem from '../SelectItem';
import SelectItemGroup from '../SelectItemGroup';
import Button from '../Button';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import mdx from './Select.mdx';

export default {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    light: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [(story) => <div style={{ width: '400px' }}>{story()}</div>],
  subcomponents: {
    SelectItem,
    SelectItemGroup,
    SelectSkeleton,
  },
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['id', 'defaultValue'],
    },
  },
};

const sharedArgTypes = {
  className: {
    control: 'text',
  },
  disabled: {
    control: 'boolean',
  },
  helperText: {
    control: 'text',
  },
  hideLabel: {
    control: 'boolean',
  },
  inline: {
    control: 'boolean',
  },
  invalid: {
    control: 'boolean',
  },
  invalidText: {
    control: 'text',
  },
  labelText: {
    control: 'text',
  },
  onChange: {
    action: 'onChange',
  },
  readOnly: {
    control: 'boolean',
  },
  size: {
    control: 'select',
    options: ['xs', 'sm', 'md', 'lg'],
  },
  warn: {
    control: 'boolean',
  },
  warnText: {
    control: 'text',
  },
};

const sharedArgs = {
  className: '',
  disabled: false,
  helperText: 'Select the region where your resources will be hosted.',
  hideLabel: false,
  inline: false,
  invalid: false,
  invalidText: 'Select a deployment region.',
  labelText: 'Deployment region',
  readOnly: false,
  size: 'md',
  warn: false,
  warnText: 'This region has limited availability.',
};

const sharedControls = Object.keys(sharedArgTypes);
const nonInlineArgTypes = {
  ...sharedArgTypes,
  inline: {
    ...sharedArgTypes.inline,
    table: { readonly: true },
  },
};

const selectItems = (
  <>
    <SelectItem value="" text="Choose a region" />
    <SelectItem value="us-south" text="Dallas (us-south)" />
    <SelectItem value="us-east" text="Washington, DC (us-east)" />
    <SelectItem value="eu-de" text="Frankfurt (eu-de)" />
    <SelectItem value="au-syd" text="Sydney (au-syd)" />
  </>
);

export const Inline = (args) => {
  return (
    <div>
      <Select inline id="select-1" {...args}>
        {selectItems}
      </Select>
    </div>
  );
};

Inline.args = {
  ...sharedArgs,
  inline: true,
};

Inline.argTypes = {
  ...sharedArgTypes,
  inline: {
    ...sharedArgTypes.inline,
    table: { readonly: true },
  },
};

Inline.parameters = {
  controls: { include: sharedControls },
};

export const Skeleton = (args) => {
  return <SelectSkeleton {...args} />;
};

Skeleton.args = {
  hideLabel: false,
};

Skeleton.argTypes = {
  hideLabel: {
    control: 'boolean',
  },
};

Skeleton.parameters = {
  controls: { include: ['hideLabel'] },
};

export const _WithLayer = (args) => (
  <WithLayer>
    {(layer) => (
      <Select id={`select-${layer}`} {...args}>
        {selectItems}
      </Select>
    )}
  </WithLayer>
);

_WithLayer.args = {
  ...sharedArgs,
};

_WithLayer.argTypes = {
  ...nonInlineArgTypes,
};

_WithLayer.parameters = {
  controls: { include: sharedControls },
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
            This recommendation is based on current service availability and the
            location of your existing resources.
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

  return (
    <div>
      <Select id="select-1" decorator={aiLabel} {...args}>
        {selectItems}
      </Select>
    </div>
  );
};

withAILabel.args = {
  ...sharedArgs,
};

withAILabel.argTypes = {
  ...nonInlineArgTypes,
};

withAILabel.parameters = {
  controls: { include: sharedControls },
};

export const Default = (args) => {
  return (
    <div>
      <Select id="select-1" {...args}>
        {selectItems}
      </Select>
    </div>
  );
};

Default.args = {
  ...sharedArgs,
};

Default.argTypes = {
  ...sharedArgTypes,
};

Default.parameters = {
  controls: { include: sharedControls },
};
