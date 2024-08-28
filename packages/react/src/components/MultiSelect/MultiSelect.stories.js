/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef, useState } from 'react';
import { action } from '@storybook/addon-actions';

import { WithLayer } from '../../../.storybook/templates/WithLayer';
import mdx from './MultiSelect.mdx';

import MultiSelect from '.';
import FilterableMultiSelect from './FilterableMultiSelect';
import Button from '../Button';
import ButtonSet from '../ButtonSet';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';

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

export const Playground = (args) => {
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
          {...args}
        />
      </div>
    </div>
  );
};

Playground.args = {
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
};

Playground.argTypes = {
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

export const Default = () => {
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
      />
    </div>
  );
};

export const WithInitialSelectedItems = () => {
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
      />
    </div>
  );
};

export const Filterable = (args) => {
  return (
    <div
      style={{
        width: 300,
      }}>
      <FilterableMultiSelect
        id="carbon-multiselect-example-3"
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

Filterable.argTypes = {
  onChange: {
    action: 'onChange',
  },
};

export const WithLayerMultiSelect = () => (
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
        />
      </div>
    )}
  </WithLayer>
);

export const _FilterableWithLayer = () => (
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
        />
      </div>
    )}
  </WithLayer>
);

export const _Controlled = () => {
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
    <MultiSelect
      label="Multiselect Label"
      id="carbon-multiselect-example"
      titleText="Multiselect title"
      helperText="This is helper text"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      selectionFeedback="top-after-reopen"
      slug={aiLabel}
    />
  </div>
);

export const FilterableWithAILabel = () => (
  <div style={{ width: 400 }}>
    <FilterableMultiSelect
      label="Multiselect Label"
      id="carbon-multiselect-example"
      titleText="Multiselect title"
      helperText="This is helper text"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      selectionFeedback="top-after-reopen"
      slug={aiLabel}
    />
  </div>
);

export const ExperimentalAutoAlign = () => {
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
        />
      </div>
    </div>
  );
};
