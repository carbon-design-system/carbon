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

export const Skeleton = () => (
  <div
    aria-label="loading select"
    aria-live="assertive"
    role="status"
    tabIndex="0" // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
  >
    <SelectSkeleton />
  </div>
);

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
