/**
 * Copyright IBM Corp. 2016, 2018
 *dropdow.stor
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { default as Dropdown, DropdownSkeleton } from './';
import { Layer } from '../Layer';
import mdx from './Dropdown.mdx';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  subcomponents: {
    DropdownSkeleton,
  },
  argTypes: {
    items: {
      table: { disable: true },
    },
    initialSelectedItem: {
      table: { disable: true },
    },
    itemToElement: {
      table: { disable: true },
    },
    className: {
      table: { disable: true },
    },
    id: {
      table: { disable: true },
    },
    light: {
      table: {
        disable: true,
      },
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

export const Playground = (args) => (
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

Playground.argTypes = {
  invalid: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  invalidText: {
    control: {
      type: 'text',
    },
    defaultValue: 'invalid selection',
  },
  disabled: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  hideLabel: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  helperText: {
    control: {
      type: 'text',
    },
  },
  label: {
    control: {
      type: 'text',
    },
    defaultValue: 'this is an example label',
  },
  warn: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  warnText: {
    control: {
      type: 'text',
    },
    defaultValue: 'please notice the warning',
  },
  titleText: {
    control: {
      type: 'text',
    },
    defaultValue: 'this is an example title',
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
  },
  type: {
    control: { type: 'select' },
    options: ['default', 'inline'],
    defaultValue: 'default',
  },
};

export const Default = () => (
  <div style={{ width: 400 }}>
    <Dropdown
      id="default"
      titleText="Dropdown label"
      helperText="This is some helper text"
      initialSelectedItem={items[0]}
      label="Dropdown menu options"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
    />
  </div>
);

export const Inline = () => (
  <div style={{ width: 600 }}>
    <Dropdown
      id="inline"
      titleText="Inline dropdown label"
      initialSelectedItem={items[0]}
      label="Dropdown menu options"
      type="inline"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
    />
  </div>
);

export const WithLayer = () => (
  <div style={{ width: 400 }}>
    <Dropdown
      id="default"
      titleText="First Layer"
      helperText="This is some helper text"
      initialSelectedItem={items[0]}
      label="Dropdown menu options"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
    />
    <Layer>
      <Dropdown
        id="default"
        titleText="Second Layer"
        helperText="This is some helper text"
        initialSelectedItem={items[0]}
        label="Dropdown menu options"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
      />
      <Layer>
        <Dropdown
          id="default"
          titleText="Third Layer"
          helperText="This is some helper text"
          initialSelectedItem={items[0]}
          label="Dropdown menu options"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
        />
      </Layer>
    </Layer>
  </div>
);

export const InlineWithLayer = () => (
  <div style={{ width: 600 }}>
    <Dropdown
      id="inline"
      titleText="First Layer"
      initialSelectedItem={items[0]}
      label="Dropdown menu options"
      type="inline"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
    />
    <Layer>
      <Dropdown
        id="inline"
        titleText="Second Layer"
        initialSelectedItem={items[0]}
        label="Dropdown menu options"
        type="inline"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
      />
      <Layer>
        <Dropdown
          id="inline"
          titleText="Third Layer"
          initialSelectedItem={items[0]}
          label="Dropdown menu options"
          type="inline"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
        />
      </Layer>
    </Layer>
  </div>
);

export const Skeleton = () => (
  <div style={{ width: 300 }}>
    <DropdownSkeleton />
  </div>
);
