/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { WithLayer } from '../../../.storybook/templates/WithLayer';
import ComboBox from '../ComboBox';
import Button from '../Button';
import { AILabel, AILabelContent, AILabelActions } from '../AILabel';
import { IconButton } from '../IconButton';
import { View, FolderOpen, Folders } from '@carbon/icons-react';
import mdx from './ComboBox.mdx';

const items = [
  {
    id: 'option-0',
    text: 'North America (United States, Canada, and Mexico)',
  },
  {
    id: 'option-1',
    text: 'Europe',
  },
  {
    id: 'option-2',
    text: 'Asia Pacific',
  },
  {
    id: 'option-3',
    text: 'South America',
    disabled: true,
  },
  {
    id: 'option-4',
    text: 'Middle East',
  },
  {
    id: 'option-5',
    text: 'Africa',
  },
];
export default {
  title: 'Components/ComboBox',
  component: ComboBox,
  argTypes: {
    size: {
      options: ['xs', 'sm', 'md', 'lg'],
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
    controls: {
      exclude: [
        'aria-label',
        'id',
        'downshiftProps',
        'initialSelectedItem',
        'items',
        'itemToElement',
        'itemToString',
        'selectedItem',
        'shouldFilterItem',
        'translateWithId',
        'type',
      ],
    },
  },
};

const sharedArgTypes = {
  allowCustomValue: {
    control: 'boolean',
  },
  autoAlign: {
    control: 'boolean',
  },
  direction: {
    control: 'select',
    options: ['top', 'bottom'],
  },
  disabled: {
    control: 'boolean',
  },
  helperText: {
    control: 'text',
  },
  invalid: {
    control: 'boolean',
  },
  onChange: {
    action: 'onChange',
  },
  onInputChange: {
    action: 'onInputChange',
  },
  onToggleClick: {
    action: 'onToggleClick',
  },
  invalidText: {
    control: 'text',
  },
  placeholder: {
    control: 'text',
  },
  readOnly: {
    control: 'boolean',
  },
  size: {
    control: 'select',
    options: ['xs', 'sm', 'md', 'lg'],
  },
  titleText: {
    control: 'text',
  },
  typeahead: {
    control: 'boolean',
  },
  warn: {
    control: 'boolean',
  },
  warnText: {
    control: 'text',
  },
};

const sharedArgs = {
  allowCustomValue: false,
  autoAlign: false,
  direction: 'bottom',
  disabled: false,
  helperText: 'Choose the region where your resources will be hosted.',
  invalid: false,
  invalidText: 'Select a deployment region.',
  placeholder: 'Select a region',
  readOnly: false,
  size: 'md',
  titleText: 'Deployment region',
  typeahead: false,
  warn: false,
  warnText: 'Confirm that this region meets your data residency requirements.',
};

const sharedControls = Object.keys(sharedArgTypes);

export const Default = (args) => {
  return (
    <div style={{ width: 300 }}>
      <ComboBox
        id="carbon-combobox"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        {...args}
      />
    </div>
  );
};

Default.args = { ...sharedArgs };
Default.argTypes = { ...sharedArgTypes };
Default.parameters = {
  controls: {
    include: sharedControls,
  },
};

export const AllowCustomValue = (args) => {
  const filterItems = (menu) => {
    return menu?.item?.toLowerCase().includes(menu?.inputValue?.toLowerCase());
  };
  return (
    <div style={{ width: 300 }}>
      <ComboBox
        shouldFilterItem={filterItems}
        id="carbon-combobox"
        items={['Apple', 'Orange', 'Banana', 'Pineapple', 'Raspberry', 'Lime']}
        {...args}
      />
    </div>
  );
};

AllowCustomValue.args = {
  ...sharedArgs,
  allowCustomValue: true,
  helperText: 'Enter a fruit or choose one from the list.',
  placeholder: 'Select or enter a fruit',
  titleText: 'Favorite fruit',
};
AllowCustomValue.argTypes = {
  ...sharedArgTypes,
  allowCustomValue: {
    ...sharedArgTypes.allowCustomValue,
    table: {
      readonly: true,
    },
  },
};
AllowCustomValue.parameters = {
  controls: {
    include: sharedControls,
  },
};

export const AutocompleteWithTypeahead = (args) => {
  return (
    <div style={{ width: 300 }}>
      <ComboBox
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
        {...args}
      />
    </div>
  );
};

AutocompleteWithTypeahead.argTypes = {
  ...sharedArgTypes,
  typeahead: {
    ...sharedArgTypes.typeahead,
    table: {
      readonly: true,
    },
  },
};
AutocompleteWithTypeahead.args = {
  ...sharedArgs,
  helperText: 'Start typing to narrow the available fruits.',
  placeholder: 'Search fruits',
  titleText: 'Fruit',
  typeahead: true,
};
AutocompleteWithTypeahead.parameters = {
  controls: {
    include: sharedControls,
  },
};

export const ExperimentalAutoAlign = (args) => (
  <div style={{ width: 400 }}>
    <div style={{ height: 300 }}></div>
    <ComboBox
      id="carbon-combobox"
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      {...args}
    />
    <div style={{ height: 800 }}></div>
  </div>
);

ExperimentalAutoAlign.args = {
  ...sharedArgs,
  autoAlign: true,
};
ExperimentalAutoAlign.argTypes = {
  ...sharedArgTypes,
  autoAlign: {
    ...sharedArgTypes.autoAlign,
    table: {
      readonly: true,
    },
  },
};
ExperimentalAutoAlign.parameters = {
  controls: {
    include: sharedControls,
  },
};

export const _WithLayer = (args) => (
  <WithLayer>
    {(layer) => (
      <div style={{ width: 300 }}>
        <ComboBox
          id={`carbon-combobox-${layer}`}
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          {...args}
        />
      </div>
    )}
  </WithLayer>
);

_WithLayer.args = { ...sharedArgs };
_WithLayer.argTypes = { ...sharedArgTypes };
_WithLayer.parameters = {
  controls: {
    include: sharedControls,
  },
};

export const withAILabel = (args) => {
  const aiLabel = (
    <AILabel className="ai-label-container">
      <AILabelContent>
        <div>
          <p className="secondary">AI Explained</p>
          <h2 className="ai-label-heading">84%</h2>
          <p className="secondary bold">Confidence score</p>
          <p className="secondary">
            This recommendation is based on service availability, latency, and
            your organization&apos;s data residency requirements.
          </p>
          <hr />
          <p className="secondary">Model type</p>
          <p className="bold">Regional placement model</p>
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
  return (
    <div style={{ width: 300 }}>
      <ComboBox
        id="carbon-combobox"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        decorator={aiLabel}
        {...args}
      />
    </div>
  );
};

withAILabel.args = { ...sharedArgs };
withAILabel.argTypes = { ...sharedArgTypes };
withAILabel.parameters = {
  controls: {
    include: sharedControls,
  },
};

export const Controlled = (args) => {
  const options = [
    {
      id: 'option-1',
      text: 'Europe',
    },
    {
      id: 'option-2',
      text: 'Asia Pacific',
    },
    {
      id: 'option-3',
      text: 'Middle East',
    },
  ];
  const [value, setValue] = React.useState(options[0]);
  const onChange = (data) => {
    const { selectedItem } = data;
    setValue(selectedItem);
    args.onChange?.(data);
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
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Button onClick={() => setValue(null)}>Clear</Button>
        <Button onClick={() => setValue(options[0])}>Europe</Button>
        <Button onClick={() => setValue(options[1])}>Asia Pacific</Button>
        <Button onClick={() => setValue(options[2])}>Middle East</Button>
      </div>
    </div>
  );
};

Controlled.args = { ...sharedArgs };
Controlled.argTypes = { ...sharedArgTypes };
Controlled.parameters = {
  controls: {
    include: sharedControls,
  },
};
