/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import MultiSelect from '.';
import FilterableMultiSelect from './FilterableMultiSelect';
import { Layer } from '../Layer';

export default {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  subcomponents: {
    'MultiSelect.Filterable': MultiSelect.Filterable,
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    downshiftProps: {
      table: { disable: true },
    },
    compareItems: {
      table: { disable: true },
    },
    sortItems: {
      table: { disable: true },
    },
    initialSelectedItems: {
      table: { disable: true },
    },
    id: {
      table: { disable: true },
    },
    items: {
      table: { disable: true },
    },
    local: {
      table: { disable: true },
    },
    onChange: {
      table: { disable: true },
    },
    onMenuChange: {
      table: { disable: true },
    },
    itemToElement: {
      table: { disable: true },
    },
    itemToString: {
      table: { disable: true },
    },
    selectedItems: {
      table: { disable: true },
    },
    open: {
      table: { disable: true },
    },
    title: {
      table: { disable: true },
    },
    translateWithId: {
      table: { disable: true },
    },
  },
};

const items = [
  {
    id: 'downshift-1-item-0',
    text: 'Option 1',
  },
  {
    id: 'downshift-1-item-1',
    text: 'Option 2',
  },
  {
    id: 'downshift-1-item-2',
    text: 'Option 3 - a disabled item',
    disabled: true,
  },
  {
    id: 'downshift-1-item-3',
    text: 'Option 4',
  },
  {
    id: 'downshift-1-item-4',
    text: 'An example option that is really long to show what should be done to handle long text',
  },
  {
    id: 'downshift-1-item-5',
    text: 'Option 5',
  },
];

export const Playground = (args) => {
  return (
    <div style={{ width: 300 }}>
      <MultiSelect
        label="Multiselect Label"
        id="carbon-multiselect-example"
        titleText="Multiselect title"
        helperText="This is helper text"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        selectionFeedback="top-after-reopen"
        {...args}
      />
    </div>
  );
};

Playground.argTypes = {
  selectionFeedback: {
    options: ['top', 'fixed', 'top-after-reopen'],
    control: { type: 'select' },
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
    defaultValue: 'md',
  },
  direction: {
    options: ['top', 'bottom'],
    control: { type: 'radio' },
  },
  type: {
    options: ['inline', 'default'],
    control: { type: 'radio' },
    defaultValue: 'default',
  },
  titleText: {
    control: {
      type: 'text',
    },
    defaultValue: 'This is a MultiSelect Title',
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
  invalid: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  light: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
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
    defaultValue: 'whoopsie!',
  },
  invalidText: {
    control: {
      type: 'text',
    },
    defaultValue: 'whoopsie!',
  },
  label: {
    control: {
      type: 'text',
    },
    defaultValue: 'This is a label',
  },
  clearSelectionDescription: {
    control: {
      type: 'text',
    },
    defaultValue: 'Total items selected: ',
  },
  useTitleInItem: {
    control: {
      type: 'text',
    },
    defaultValue: 'this is the item title',
  },
  clearSelectionText: {
    control: {
      type: 'text',
    },
    defaultValue: 'To clear selection, press Delete or Backspace,',
  },
};

export const Default = () => {
  return (
    <div style={{ width: 300 }}>
      <MultiSelect
        label="Multiselect Label"
        id="carbon-multiselect-example"
        titleText="Multiselect title"
        helperText="This is helper text"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        selectionFeedback="top-after-reopen"
      />
    </div>
  );
};

export const WithInitialSelectedItems = () => {
  return (
    <div style={{ width: 300 }}>
      <MultiSelect
        id="carbon-multiselect-example-2"
        titleText="Multiselect title"
        helperText="This is helper text"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        initialSelectedItems={[items[0], items[1]]}
        selectionFeedback="top-after-reopen"
      />
    </div>
  );
};

export const _Filterable = () => {
  return (
    <div style={{ width: 300 }}>
      <FilterableMultiSelect
        id="carbon-multiselect-example-3"
        titleText="Multiselect title"
        helperText="This is helper text"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        selectionFeedback="top-after-reopen"
      />
    </div>
  );
};

export const WithLayer = () => {
  return (
    <div style={{ width: 300 }}>
      <MultiSelect
        label="First Layer"
        id="carbon-multiselect-example"
        titleText="Multiselect title"
        helperText="This is helper text"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        selectionFeedback="top-after-reopen"
      />
      <Layer>
        <MultiSelect
          label="Second Layer"
          id="carbon-multiselect-example"
          titleText="Multiselect title"
          helperText="This is helper text"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          selectionFeedback="top-after-reopen"
        />
        <Layer>
          <MultiSelect
            label="Third Layer"
            id="carbon-multiselect-example"
            titleText="Multiselect title"
            helperText="This is helper text"
            items={items}
            itemToString={(item) => (item ? item.text : '')}
            selectionFeedback="top-after-reopen"
          />
        </Layer>
      </Layer>
    </div>
  );
};

export const _FilterableWithLayer = () => {
  return (
    <div style={{ width: 300 }}>
      <FilterableMultiSelect
        id="carbon-multiselect-example-3"
        titleText="First Layer"
        helperText="This is helper text"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        selectionFeedback="top-after-reopen"
      />
      <Layer>
        <FilterableMultiSelect
          id="carbon-multiselect-example-3"
          titleText="Second Layer"
          helperText="This is helper text"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          selectionFeedback="top-after-reopen"
        />
        <Layer>
          <FilterableMultiSelect
            id="carbon-multiselect-example-3"
            titleText="Third Layer"
            helperText="This is helper text"
            items={items}
            itemToString={(item) => (item ? item.text : '')}
            selectionFeedback="top-after-reopen"
          />
        </Layer>
      </Layer>
    </div>
  );
};
