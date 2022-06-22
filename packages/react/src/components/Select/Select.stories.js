/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { default as Select, SelectSkeleton } from '../Select';
import SelectItem from '../SelectItem';
import SelectItemGroup from '../SelectItemGroup';
import { Layer } from '../Layer';

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
};

export const Default = () => {
  return (
    <div>
      <Select
        id="select-1"
        defaultValue="placeholder-item"
        labelText="Select an option"
        helperText="Optional helper text">
        <SelectItem
          disabled
          hidden
          value="placeholder-item"
          text="Choose an option"
        />
        <SelectItemGroup label="Category 1">
          <SelectItem value="option-1" text="Option 1" />
          <SelectItem value="option-2" text="Option 2" />
        </SelectItemGroup>
        <SelectItemGroup label="Category 2">
          <SelectItem value="option-3" text="Option 3" />
          <SelectItem value="option-4" text="Option 4" />
        </SelectItemGroup>
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
        defaultValue="placeholder-item"
        labelText="Select"
        helperText="Optional helper text">
        <SelectItem
          disabled
          hidden
          value="placeholder-item"
          text="Choose an option"
        />
        <SelectItemGroup label="Category 1">
          <SelectItem value="option-1" text="Option 1" />
          <SelectItem value="option-2" text="Option 2" />
        </SelectItemGroup>
        <SelectItemGroup label="Category 2">
          <SelectItem value="option-3" text="Option 3" />
          <SelectItem value="option-4" text="Option 4" />
        </SelectItemGroup>
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

export const WithLayer = () => {
  return (
    <>
      <Select
        id="select-1"
        defaultValue="placeholder-item"
        labelText=""
        helperText="First layer">
        <SelectItem
          disabled
          hidden
          value="placeholder-item"
          text="Choose an option"
        />
        <SelectItem value="option-1" text="Option 1" />
        <SelectItem value="option-2" text="Option 2" />
      </Select>
      <Layer>
        <Select
          id="select-1"
          defaultValue="placeholder-item"
          labelText=""
          helperText=" Second layer">
          <SelectItem
            disabled
            hidden
            value="placeholder-item"
            text="Choose an option"
          />
          <SelectItem value="option-1" text="Option 1" />
          <SelectItem value="option-2" text="Option 2" />
          <SelectItem value="option-3" text="Option 3" />
          <SelectItem value="option-4" text="Option 4" />
        </Select>
        <Layer>
          <Select
            id="select-1"
            defaultValue="placeholder-item"
            labelText=""
            helperText="Third layer">
            <SelectItem
              disabled
              hidden
              value="placeholder-item"
              text="Choose an option"
            />
            <SelectItem value="option-1" text="Option 1" />
            <SelectItem value="option-2" text="Option 2" />
            <SelectItem value="option-3" text="Option 3" />
            <SelectItem value="option-4" text="Option 4" />
          </Select>
        </Layer>
      </Layer>
    </>
  );
};

export const Playground = (args) => {
  return (
    <div>
      <Select
        id="select-1"
        defaultValue="placeholder-item"
        labelText="Select an option"
        helperText="Optional helper text"
        {...args}>
        <SelectItem
          disabled
          hidden
          value="placeholder-item"
          text="Choose an option"
        />
        <SelectItemGroup label="Category 1">
          <SelectItem value="option-1" text="Option 1" />
          <SelectItem value="option-2" text="Option 2" />
        </SelectItemGroup>
        <SelectItemGroup label="Category 2">
          <SelectItem value="option-3" text="Option 3" />
          <SelectItem value="option-4" text="Option 4" />
        </SelectItemGroup>
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
