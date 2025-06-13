/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef, useState } from 'react';
import { View, FolderOpen, Folders, Information } from '@carbon/icons-react';
import { action } from 'storybook/actions';

import { WithLayer } from '../../../.storybook/templates/WithLayer';
import mdx from './MultiSelect.mdx';

import { FilterableMultiSelect, MultiSelect } from '.';
import Button from '../Button';
import ButtonSet from '../ButtonSet';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import {
  Toggletip,
  ToggletipActions,
  ToggletipButton,
  ToggletipContent,
  ToggletipLabel,
} from '../Toggletip';
import Link from '../Link';
import TextInput from '../TextInput';

export default {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  subcomponents: {
    FilterableMultiSelect,
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
    light: {
      table: {
        disable: true,
      },
    },
    locale: {
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
    titleText: {
      table: { disable: true },
    },
    translateWithId: {
      table: { disable: true },
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

const sharedArgs = {
  size: 'md',
  autoAlign: false,
  type: 'default',
  titleText: 'This is a MultiSelect Title',
  disabled: false,
  hideLabel: false,
  invalid: false,
  warn: false,
  open: false,
  warnText: 'whoopsie!',
  invalidText: 'whoopsie!',
  label: 'This is a label',
  clearSelectionDescription: 'Total items selected: ',
  useTitleInItem: false,
  clearSelectionText: 'To clear selection, press Delete or Backspace,',
  selectAll: false,
  selectAllItemText: 'All options',
};

const sharedArgTypes = {
  selectionFeedback: {
    options: ['top', 'fixed', 'top-after-reopen'],
    control: { type: 'select' },
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
  },
  direction: {
    options: ['top', 'bottom'],
    control: { type: 'radio' },
  },
  type: {
    options: ['inline', 'default'],
    control: { type: 'radio' },
  },
  titleText: {
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
  invalid: {
    control: {
      type: 'boolean',
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
  invalidText: {
    control: {
      type: 'text',
    },
  },
  label: {
    control: {
      type: 'text',
    },
  },
  clearSelectionDescription: {
    control: {
      type: 'text',
    },
  },
  useTitleInItem: {
    control: {
      type: 'text',
    },
  },
  clearSelectionText: {
    control: {
      type: 'text',
    },
  },
  readOnly: {
    control: { type: 'boolean' },
  },
};

export const Default = (args) => {
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
  return (
    <div
      style={{
        width: 300,
      }}>
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

Default.args = { ...sharedArgs };
Default.argTypes = { ...sharedArgTypes };

export const WithInitialSelectedItems = (args) => {
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
  return (
    <div
      style={{
        width: 300,
      }}>
      <MultiSelect
        label="Multiselect Label"
        id="carbon-multiselect-example-2"
        titleText="Multiselect title"
        helperText="This is helper text"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        initialSelectedItems={[items[0], items[1]]}
        selectionFeedback="top-after-reopen"
        {...args}
      />
    </div>
  );
};

export const Filterable = (args) => {
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
  return (
    <div
      style={{
        width: 300,
      }}>
      <FilterableMultiSelect
        id="carbon-multiselect-example-3"
        titleText="FilterableMultiSelect title"
        helperText="This is helper text"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        selectionFeedback="top-after-reopen"
        {...args}
      />
    </div>
  );
};

Filterable.argTypes = {
  onChange: {
    action: 'onChange',
  },
  onMenuChange: {
    action: 'onMenuChange',
  },
};

export const WithLayerMultiSelect = (args) => (
  <WithLayer>
    {(layer) => (
      <div style={{ width: 300 }}>
        <MultiSelect
          label="Multiselect Label"
          id={`carbon-multiselect-example-${layer}`}
          titleText="Multiselect title"
          helperText="This is helper text"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          selectionFeedback="top-after-reopen"
          {...args}
        />
      </div>
    )}
  </WithLayer>
);

export const _FilterableWithLayer = (args) => (
  <WithLayer>
    {(layer) => (
      <div style={{ width: 300 }}>
        <FilterableMultiSelect
          id={`carbon-multiselect-example-${layer}`}
          titleText="Multiselect title"
          helperText="This is helper text"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          selectionFeedback="top-after-reopen"
          {...args}
        />
      </div>
    )}
  </WithLayer>
);

export const _Controlled = (args) => {
  const [selectedItems, setSelectedItems] = useState(
    items.filter((item) => item.id === 'downshift-1-item-0')
  );

  const onSelectionChanged = (value) => {
    action('changed items')(value);
    setSelectedItems(value);
  };

  return (
    <div style={{ width: 300 }}>
      <MultiSelect
        id="carbon-multiselect-example-controlled"
        titleText="Multiselect title"
        label="Multiselect label"
        items={items}
        selectedItems={selectedItems}
        onChange={(data) => onSelectionChanged(data.selectedItems)}
        itemToString={(item) => (item ? item.text : '')}
        selectionFeedback="top-after-reopen"
        {...args}
      />
      <br />
      <ButtonSet>
        <Button
          id="all"
          onClick={() =>
            setSelectedItems(items.filter((item) => !item.disabled))
          }>
          Select all
        </Button>
        <Button
          id="clear"
          kind="secondary"
          onClick={() => setSelectedItems([])}>
          Clear
        </Button>
      </ButtonSet>
    </div>
  );
};

const itemsWithSelectAll = [
  {
    id: 'downshift-1-item-0',
    text: 'Editor',
  },
  {
    id: 'downshift-1-item-1',
    text: 'Owner',
  },
  {
    id: 'downshift-1-item-2',
    text: 'Uploader',
  },
  {
    id: 'downshift-1-item-3',
    text: 'Reader - a disabled item',
    disabled: true,
  },
  {
    id: 'select-all',
    text: 'All roles',
    isSelectAll: true,
  },
];

export const SelectAll = (args) => {
  const [label, setLabel] = useState('Choose options');

  const onChange = (value) => {
    if (value.selectedItems.length == 1) {
      setLabel('Option selected');
    } else if (value.selectedItems.length > 1) {
      setLabel('Options selected');
    } else {
      setLabel('Choose options');
    }
  };

  return (
    <div style={{ width: 300 }}>
      <MultiSelect
        label={label}
        id="carbon-multiselect-example"
        titleText="Multiselect title"
        helperText="This is helper text"
        items={itemsWithSelectAll}
        itemToString={(item) => (item ? item.text : '')}
        selectionFeedback="top-after-reopen"
        onChange={onChange}
        {...args}
      />
    </div>
  );
};

const aiLabel = (
  <AILabel className="ai-label-container">
    <AILabelContent>
      <div>
        <p className="secondary">AI Explained</p>
        <h2 className="ai-label-heading">84%</h2>
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
    <MultiSelect
      label="Multiselect Label"
      id="carbon-multiselect-example"
      titleText="Multiselect title"
      helperText="This is helper text"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      selectionFeedback="top-after-reopen"
      decorator={aiLabel}
    />
  </div>
);

export const FilterableWithAILabel = (args) => (
  <div style={{ width: 400 }}>
    <FilterableMultiSelect
      label="Multiselect Label"
      id="carbon-multiselect-example"
      titleText="Multiselect title"
      helperText="This is helper text"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      selectionFeedback="top-after-reopen"
      decorator={aiLabel}
      {...args}
    />
  </div>
);

export const ExperimentalAutoAlign = (args) => {
  const ref = useRef();
  useEffect(() => {
    ref?.current?.scrollIntoView({ block: 'center', inline: 'center' });
  });
  return (
    <div style={{ width: '5000px', height: '5000px' }}>
      <div
        style={{
          position: 'absolute',
          top: '2500px',
          left: '2500px',
          width: 300,
        }}>
        <MultiSelect
          label="Multiselect Label"
          id="carbon-multiselect-example"
          titleText="Multiselect title"
          helperText="This is helper text"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          selectionFeedback="top-after-reopen"
          ref={ref}
          autoAlign
          {...args}
        />
      </div>
    </div>
  );
};

ExperimentalAutoAlign.argTypes = { ...sharedArgTypes };

export const withToggletipLabel = (args) => {
  return (
    <div>
      <MultiSelect
        label="Multiselect Label"
        id="carbon-multiselect-example"
        titleText={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ToggletipLabel>Multiselect title</ToggletipLabel>
            <Toggletip>
              <ToggletipButton label="Show information">
                <Information />
              </ToggletipButton>
              <ToggletipContent>
                <p>
                  Lorem ipsum dolor sit amet, di os consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut fsil labore et dolore
                  magna aliqua.
                </p>
                <ToggletipActions>
                  <Link href="#">Link action</Link>
                  <Button size="sm">Button</Button>
                </ToggletipActions>
              </ToggletipContent>
            </Toggletip>
          </div>
        }
        helperText="This is helper text"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        selectionFeedback="top-after-reopen"
        {...args}
      />
    </div>
  );
};

export const SelectAllWithDynamicItems = () => {
  const [label, setLabel] = useState('Choose options');
  const [items, setItems] = useState(itemsWithSelectAll);

  const onChange = (value) => {
    if (value.selectedItems.length == 1) {
      setLabel('Option selected');
    } else if (value.selectedItems.length > 1) {
      setLabel('Options selected');
    } else {
      setLabel('Choose options');
    }
  };

  function addItems() {
    setItems((prevItems) => {
      const now = Date.now();
      return [
        ...prevItems,
        {
          id: `item-added-via-button-1${now}`,
          text: `item-added-via-button-1${now}`,
        },
        {
          id: `item-added-via-button-2${now}`,
          text: `item-added-via-button-2${now}`,
        },
      ];
    });
  }

  return (
    <div style={{ width: 300 }}>
      <MultiSelect
        label={label}
        id="carbon-multiselect-example"
        titleText="Multiselect title"
        helperText="This is helper text"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        selectionFeedback="top-after-reopen"
        onChange={onChange}
      />
      <Button onClick={addItems}>Add 2 items to the list</Button>
    </div>
  );
};
