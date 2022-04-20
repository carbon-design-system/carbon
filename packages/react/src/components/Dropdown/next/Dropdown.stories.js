/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { default as Dropdown, DropdownSkeleton } from '../';
import { Layer } from '../../Layer';
import mdx from '../Dropdown.mdx';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  subcomponents: {
    DropdownSkeleton,
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
  },
  parameters: {
    docs: {
      page: mdx,
    },
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

export const Default = (args) => (
  <div style={{ width: 400 }}>
    <Dropdown
      id="default"
      titleText="Dropdown label"
      helperText="This is some helper text"
      label="Dropdown menu options"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      {...args}
    />
  </div>
);

export const Inline = (args) => (
  <div style={{ width: 600 }}>
    <Dropdown
      id="inline"
      titleText="Inline dropdown label"
      label="Dropdown menu options"
      type="inline"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      {...args}
    />
  </div>
);

export const WithLayer = (args) => (
  <div style={{ width: 400 }}>
    <Dropdown
      id="default"
      titleText="First Layer"
      helperText="This is some helper text"
      label="Dropdown menu options"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      {...args}
    />
    <Layer>
      <Dropdown
        id="default"
        titleText="Second Layer"
        helperText="This is some helper text"
        label="Dropdown menu options"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        {...args}
      />
      <Layer>
        <Dropdown
          id="default"
          titleText="Third Layer"
          helperText="This is some helper text"
          label="Dropdown menu options"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          {...args}
        />
      </Layer>
    </Layer>
  </div>
);

export const InlineWithLayer = (args) => (
  <div style={{ width: 600 }}>
    <Dropdown
      id="inline"
      titleText="First Layer"
      label="Dropdown menu options"
      type="inline"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      {...args}
    />
    <Layer>
      <Dropdown
        id="inline"
        titleText="Second Layer"
        label="Dropdown menu options"
        type="inline"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        {...args}
      />
      <Layer>
        <Dropdown
          id="inline"
          titleText="Third Layer"
          label="Dropdown menu options"
          type="inline"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          {...args}
        />
      </Layer>
    </Layer>
  </div>
);

export const Skeleton = (args) => (
  <div style={{ width: 300 }}>
    <DropdownSkeleton {...args} />
  </div>
);
