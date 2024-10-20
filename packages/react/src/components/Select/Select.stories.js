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
  args: {
    disabled: false,
    inline: false,
    noLabel: false,
    hideLabel: false,
    invalid: false,
    warn: false,
    size: 'md',
  },
  argTypes: {
    onChange: {
      action: 'onChange',
      table: {
        disable: true,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
    defaultValue: {
      table: {
        disable: true,
      },
    },
    id: {
      table: {
        disable: true,
      },
    },
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
  },
};

export const Default = () => {
  return (
    <div>
      <Select
        id="select-1"
        labelText="Select an option"
        helperText="Optional helper text">
        <SelectItem value="" text="" />
        <SelectItem
          value="An example option that is really long to show what should be done to handle long text"
          text="An example option that is really long to show what should be done to handle long text"
        />
        <SelectItem value="Option 2" text="Option 2" />
        <SelectItem value="Option 3" text="Option 3" />
        <SelectItem value="Option 4" text="Option 4" />
      </Select>
    </div>
  );
};

export const Inline = () => {
  return (
    <div>
      <Select
        inline
        id="select-1"
        labelText="Select"
        helperText="Optional helper text">
        <SelectItem value="" text="" />
        <SelectItem value="Option 1" text="Option 1" />
        <SelectItem value="Option 2" text="Option 2" />
        <SelectItem value="Option 3" text="Option 3" />
        <SelectItem value="Option 4" text="Option 4" />
      </Select>
    </div>
  );
};

export const Skeleton = () => <SelectSkeleton />;

export const _WithLayer = () => (
  <WithLayer>
    {(layer) => (
      <Select
        id={`select-${layer}`}
        labelText=""
        helperText="Optional helper text">
        <SelectItem value="" text="" />
        <SelectItem
          value="An example option that is really long to show what should be done to handle long text"
          text="An example option that is really long to show what should be done to handle long text"
        />
        <SelectItem value="Option 2" text="Option 2" />
      </Select>
    )}
  </WithLayer>
);

const aiLabel = (
  <AILabel className="slug-container">
    <AILabelContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h1>84%</h1>
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

export const withAILabel = () => (
  <div style={{ width: 400 }}>
    <Select
      id="select-1"
      labelText="Select an option"
      helperText="Optional helper text"
      slug={aiLabel}>
      <SelectItem value="" text="" />
      <SelectItem
        value="An example option that is really long to show what should be done to handle long text"
        text="An example option that is really long to show what should be done to handle long text"
      />
      <SelectItem value="Option 2" text="Option 2" />
      <SelectItem value="Option 3" text="Option 3" />
      <SelectItem value="Option 4" text="Option 4" />
    </Select>
  </div>
);

export const Playground = (args) => {
  return (
    <div>
      <Select
        id="select-1"
        labelText="Select an option"
        helperText="Optional helper text"
        {...args}>
        <SelectItem value="" text="" />
        <SelectItem
          value="An example option that is really long to show what should be done to handle long text"
          text="An example option that is really long to show what should be done to handle long text"
        />
        <SelectItem value="Option 2" text="Option 2" />
        <SelectItem value="Option 3" text="Option 3" />
        <SelectItem value="Option 4" text="Option 4" />
      </Select>
    </div>
  );
};

Playground.argTypes = {
  helperText: {
    control: 'text',
  },
  invalidText: { control: 'text' },
  labelText: { control: 'text' },
  warnText: { control: 'text' },
};
