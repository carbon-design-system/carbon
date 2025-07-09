/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useRef } from 'react';

import { WithLayer } from '../../../.storybook/templates/WithLayer';
import ComboBox from '../ComboBox';
import Button from '../Button';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import { action } from 'storybook/actions';
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
    onChange: { action: 'onChange' },
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const sharedArgTypes = {
  ['aria-label']: {
    table: {
      disable: true,
    },
  },
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
    action: 'onChange',
  },
  onToggleClick: {
    action: 'clicked',
  },
  onInputChange: {
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

export const Default = (args) => {
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
  return (
    <div style={{ width: 300 }}>
      <ComboBox
        id="carbon-combobox"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        titleText="ComboBox title"
        helperText="Combobox helper text"
        onChange={action('onChange')}
        {...args}
      />
    </div>
  );
};

Default.argTypes = { ...sharedArgTypes };

export const AllowCustomValue = (args) => {
  const filterItems = (menu) => {
    return menu?.item?.toLowerCase().includes(menu?.inputValue?.toLowerCase());
  };
  return (
    <div style={{ width: 300 }}>
      <ComboBox
        allowCustomValue
        shouldFilterItem={filterItems}
        onChange={args.onChange}
        id="carbon-combobox"
        items={['Apple', 'Orange', 'Banana', 'Pineapple', 'Raspberry', 'Lime']}
        titleText="ComboBox title"
        helperText="Combobox helper text"
      />
    </div>
  );
};

export const AutocompleteWithTypeahead = (args) => {
  return (
    <div style={{ width: 300 }}>
      <ComboBox
        allowCustomValue
        onChange={args.onChange}
        helperText="Combobox helper text"
        id="carbon-combobox"
        items={[
          'Apple',
          'Apricot',
          'Avocado',
          'Banana',
          'Blackberry',
          'Blueberry',
          'Cantaloupe',
        ]}
        titleText="ComboBox title"
        typeahead
      />
    </div>
  );
};
export const ExperimentalAutoAlign = (args) => (
  <div style={{ width: 400 }}>
    <div style={{ height: 300 }}></div>
    <ComboBox
      onChange={() => {}}
      id="carbon-combobox"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      titleText="ComboBox title"
      helperText="Combobox helper text"
      autoAlign={true}
      {...args}
    />
    <div style={{ height: 800 }}></div>
  </div>
);

ExperimentalAutoAlign.argTypes = { ...sharedArgTypes };

AllowCustomValue.argTypes = {
  onChange: { action: 'onChange' },
};

export const _WithLayer = (args) => (
  <WithLayer>
    {(layer) => (
      <div style={{ width: 300 }}>
        <ComboBox
          onChange={() => {}}
          id={`carbon-combobox-${layer}`}
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          titleText="ComboBox title"
          helperText="Combobox helper text"
          {...args}
        />
      </div>
    )}
  </WithLayer>
);

_WithLayer.argTypes = { ...sharedArgTypes };

export const withAILabel = (args) => {
  const aiLabel = (
    <AILabel className="ai-label-container">
      <AILabelContent>
        <div>
          <p className="secondary">AI Explained</p>
          <h2 className="ai-label-heading">84%</h2>
          <p className="secondary bold">Confidence score</p>
          <p className="secondary">
            Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
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
  return (
    <div style={{ width: 300 }}>
      <ComboBox
        onChange={action('onChange')}
        id="carbon-combobox"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        titleText="ComboBox title"
        helperText="Combobox helper text"
        decorator={aiLabel}
        {...args}
      />
    </div>
  );
};

withAILabel.argTypes = { ...sharedArgTypes };

export const UndefinedChecksTesting = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const filterItems = (menu) => {
    return menu?.item?.toLowerCase().includes(menu?.inputValue?.toLowerCase());
  };
  return (
    <div style={{ width: 300 }}>
      <ComboBox
        shouldFilterItem={filterItems}
        onChange={(event) => {
          console.log(event);
          setSelectedItem(event.selectedItem);
        }}
        selectedItem={selectedItem}
        id="carbon-combobox"
        items={['Apple', 'Orange', 'Banana', 'Pineapple', 'Raspberry', 'Lime']}
        titleText="ComboBox title"
        helperText="Combobox helper text"
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {' '}
        <Button onClick={() => setSelectedItem(null)}>Reset</Button>
        <Button onClick={() => setSelectedItem('Apple')}>Apple</Button>
        <Button onClick={() => setSelectedItem('Orange')}>Orange</Button>
        <Button onClick={() => setSelectedItem('Pineapple')}>Pineapple</Button>
      </div>
    </div>
  );
};

export const UndefinedChecksWithAllowCustomValue = () => {
  const [selectedItem, setSelectedItem] = useState('');
  const filterItems = (menu) => {
    return menu?.item?.toLowerCase().includes(menu?.inputValue?.toLowerCase());
  };
  return (
    <div style={{ width: 300 }}>
      <ComboBox
        allowCustomValue
        shouldFilterItem={filterItems}
        onChange={(event) => {
          console.log(event);
          setSelectedItem(event.selectedItem);
        }}
        selectedItem={selectedItem}
        id="carbon-combobox"
        items={['Apple', 'Orange', 'Banana', 'Pineapple', 'Raspberry', 'Lime']}
        titleText="ComboBox title"
        helperText="Combobox helper text"
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {' '}
        <Button onClick={() => setSelectedItem(null)}>Reset</Button>
        <Button onClick={() => setSelectedItem('Apple')}>Apple</Button>
        <Button onClick={() => setSelectedItem('Orange')}>Orange</Button>
        <Button onClick={() => setSelectedItem('Pineapple')}>Pineapple</Button>
      </div>
    </div>
  );
};

export const _fullyControlled = (args) => {
  const options = [
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
      text: 'Option 3',
    },
  ];
  const [value, setValue] = React.useState(options[0]);
  const onChange = ({ selectedItem }) => {
    setValue(selectedItem);
  };

  return (
    <div>
      <ComboBox
        {...args}
        onChange={onChange}
        id="carbon-combobox"
        items={options}
        selectedItem={value}
        itemToString={(item) => (item ? item.text : '')}
        titleText="Fully Controlled ComboBox title"
        helperText="Combobox helper text"
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Button onClick={() => setValue(null)}>Reset</Button>
        <Button onClick={() => setValue(options[0])}>Option 1</Button>
        <Button onClick={() => setValue(options[1])}>Option 2</Button>
        <Button onClick={() => setValue(options[2])}>Option 3</Button>
      </div>
    </div>
  );
};

_fullyControlled.argTypes = { ...sharedArgTypes };

AutocompleteWithTypeahead.argTypes = {
  onChange: { action: 'onChange' },
};
