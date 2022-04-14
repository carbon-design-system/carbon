/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { default as Select, SelectSkeleton } from '../';
import SelectItem from '../../SelectItem';
import SelectItemGroup from '../../SelectItemGroup';
import { Layer } from '../../Layer';

export default {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
  },
  args: {
    size: 'md',
  },
  decorators: [(story) => <div style={{ width: '400px' }}>{story()}</div>],
  subcomponents: {
    SelectItem,
    SelectItemGroup,
    SelectSkeleton,
  },
};

export const _Default = (args) => {
  return (
    <div>
      <Select
        {...args}
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

export const Inline = (args) => {
  return (
    <div>
      <Select
        {...args}
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

export const _Skeleton = () => (
  <div
    aria-label="loading select"
    aria-live="assertive"
    role="status"
    tabIndex="0" // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
  >
    <SelectSkeleton />
  </div>
);

export const WithLayer = (args) => {
  return (
    <>
      <Select
        {...args}
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
          {...args}
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
            {...args}
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
