/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ComboBox from '../ComboBox';
import { Layer } from '../Layer';
import mdx from './ComboBox.mdx';

const items = [
  {
    id: 'option-0',
    text: 'An example option that is really long to show what should be done to handle long text',
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

export default {
  title: 'Components/ComboBox',
  component: ComboBox,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
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

export const Default = () => (
  <div style={{ width: 300 }}>
    <ComboBox
      onChange={() => {}}
      id="carbon-combobox"
      items={items}
      downshiftProps={{
        onStateChange: () => {
          console.log('the state has changed');
        },
      }}
      itemToString={(item) => (item ? item.text : '')}
      placeholder="Filter..."
      titleText="ComboBox title"
      helperText="Combobox helper text"
    />
  </div>
);

export const WithLayer = () => (
  <div style={{ width: 300 }}>
    <ComboBox
      onChange={() => {}}
      id="carbon-combobox"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      placeholder="Filter..."
      titleText="First Layer"
      helperText="Combobox helper text"
    />
    <Layer>
      <ComboBox
        onChange={() => {}}
        id="carbon-combobox"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        placeholder="Filter..."
        titleText="Second Layer"
        helperText="Combobox helper text"
      />
      <Layer>
        <ComboBox
          onChange={() => {}}
          id="carbon-combobox"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          placeholder="Filter..."
          titleText="Third Layer"
          helperText="Combobox helper text"
        />
      </Layer>
    </Layer>
  </div>
);

export const Playground = (args) => (
  <div style={{ width: 300 }}>
    <ComboBox
      onChange={() => {}}
      id="carbon-combobox"
      items={items}
      downshiftProps={{
        onStateChange: () => {
          console.log('the state has changed');
        },
      }}
      itemToString={(item) => (item ? item.text : '')}
      placeholder="Filter..."
      titleText="ComboBox title"
      helperText="Combobox helper text"
      {...args}
    />
  </div>
);

Playground.argTypes = {
  ariaLabel: {
    table: {
      disable: true,
    },
  },
  className: {
    table: {
      disable: true,
    },
  },
  id: {
    table: {
      disable: true,
    },
  },
  downshiftProps: {
    table: {
      disable: true,
    },
  },
  initialSelectedItem: {
    table: {
      disable: true,
    },
  },
  invalidText: {
    control: 'text',
  },
  items: {
    table: {
      disable: true,
    },
  },
  itemToElement: {
    table: {
      disable: true,
    },
  },
  itemToString: {
    table: {
      disable: true,
    },
  },
  onChange: {
    action: 'clicked',
  },
  onClick: {
    action: 'clicked',
  },
  onInputChange: {
    table: {
      disable: true,
    },
  },
  onStateChange: {
    table: {
      disable: true,
    },
  },
  onToggleClick: {
    table: {
      disable: true,
    },
  },
  selectedItem: {
    table: {
      disable: true,
    },
  },
  shouldFilterItem: {
    table: {
      disable: true,
    },
  },
  translateWithId: {
    table: {
      disable: true,
    },
  },
  titleText: {
    table: {
      disable: true,
    },
  },
  type: {
    table: {
      disable: true,
    },
  },
  warnText: {
    control: 'text',
  },
};
