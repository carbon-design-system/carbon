/**
 * Copyright IBM Corp. 2016, 2023
 *dropdow.stor
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';

import { default as Dropdown, DropdownSkeleton } from './';
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
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    text: 'Option 1',
  },
  {
    text: 'Option 2',
  },
  {
    text: 'Option 3 - a disabled item',
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

export const ExperimentalAutoAlign = () => (
  <div style={{ width: 400 }}>
    <div style={{ height: 300 }}></div>
    <Dropdown
      autoAlign={true}
      id="default"
      titleText="Dropdown label"
      helperText="This is some helper text"
      initialSelectedItem={items[1]}
      label="Option 1"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      direction="top"
    />
    <div style={{ height: 800 }}></div>
  </div>
);

export const Playground = (args) => (
  <div style={{ width: 400 }}>
    <Dropdown
      id="default"
      titleText="Dropdown label"
      helperText="This is some helper text"
      initialSelectedItem={items[1]}
      label="Option 1"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      {...args}
    />
  </div>
);

Playground.args = {
  invalid: false,
  invalidText: 'invalid selection',
  disabled: false,
  hideLabel: false,
  label: 'This is an example label',
  warn: false,
  warnText: 'please notice the warning',
  titleText: 'This is an example title',
  type: 'default',
};

Playground.argTypes = {
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
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  hideLabel: {
    control: {
      type: 'boolean',
    },
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
  titleText: {
    control: {
      type: 'text',
    },
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
  },
  type: {
    control: { type: 'select' },
    options: ['default', 'inline'],
  },
};

export const Default = () => (
  <div style={{ width: 400 }}>
    <Dropdown
      id="default"
      titleText="Dropdown label"
      helperText="This is some helper text"
      initialSelectedItem={items[1]}
      label="Option 1"
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
      initialSelectedItem={items[1]}
      label="Option 1"
      type="inline"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
    />
  </div>
);

export const _WithLayer = () => (
  <WithLayer>
    {(layer) => (
      <div style={{ width: 400 }}>
        <Dropdown
          id={`default-${layer}`}
          titleText="Dropdown label"
          helperText="This is some helper text"
          initialSelectedItem={items[1]}
          label="Option 1"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
        />
      </div>
    )}
  </WithLayer>
);

export const InlineWithLayer = () => (
  <WithLayer>
    {(layer) => (
      <div style={{ width: 600 }}>
        <Dropdown
          id={`inline-${layer}`}
          titleText="Inline dropdown label"
          initialSelectedItem={items[1]}
          label="Option 1"
          type="inline"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
        />
      </div>
    )}
  </WithLayer>
);

export const Skeleton = () => (
  <div style={{ width: 300 }}>
    <DropdownSkeleton />
  </div>
);
