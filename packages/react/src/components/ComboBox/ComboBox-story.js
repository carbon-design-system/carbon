/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import ComboBox from '../ComboBox';
import Button from '../Button';
import WithState from '../../tools/withState';

const items = [
  {
    id: 'option-0',
    text: 'Option 1',
  },
  {
    id: 'option-1',
    text: 'Option 2',
  },
  {
    id: 'option-2',
    text: 'Option 3',
    selected: true,
  },
  {
    id: 'option-3',
    text: 'Option 4',
  },
  {
    id: 'option-4',
    text:
      'An example option that is really long to show what should be done to handle long text',
  },
];

const sizes = {
  'Extra large size (xl)': 'xl',
  'Regular size (lg)': '',
  'Small size (sm)': 'sm',
};

const props = () => ({
  id: text('Combobox ID (id)', 'carbon-combobox-example'),
  placeholder: text('Placeholder text (placeholder)', 'Filter...'),
  titleText: text('Title (titleText)', 'Combobox title'),
  helperText: text('Helper text (helperText)', 'Optional helper text here'),
  light: boolean('Light (light)', false),
  disabled: boolean('Disabled (disabled)', false),
  invalid: boolean('Invalid (invalid)', false),
  invalidText: text('Invalid text (invalidText)', 'A valid value is required'),
  size: select('Field size (size)', sizes, '') || undefined,
  onChange: action('onChange'),
});

const itemToElement = item => {
  const itemAsArray = item.text.split(' ');
  return (
    <div>
      <span>{itemAsArray[0]}</span>
      <span style={{ color: 'blue' }}> {itemAsArray[1]}</span>
    </div>
  );
};

const ControlledComboBoxApp = props => {
  const [selectedItem, setSelectedItem] = useState(items[0]);
  let uid = items.length;
  return (
    <>
      <ComboBox
        {...props}
        items={items}
        itemToString={item => (item ? item.text : '')}
        onChange={({ selectedItem }) => setSelectedItem(selectedItem)}
        initialSelectedItem={items[0]}
        selectedItem={selectedItem}
      />
      <Button
        style={{ marginTop: '1rem' }}
        onClick={() => {
          items.push({
            id: `id-${uid++}`,
            text: `Option ${uid}`,
          });
          setSelectedItem(items[items.length - 1]);
        }}>
        Add new item
      </Button>
    </>
  );
};
ControlledComboBoxApp.__docgenInfo = {
  ...ComboBox.__docgenInfo,
  props: {
    ...ComboBox.__docgenInfo.props,
  },
};

storiesOf('ComboBox', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => (
      <div style={{ width: 300 }}>
        <ComboBox
          items={items}
          itemToString={item => (item ? item.text : '')}
          {...props()}
        />
      </div>
    ),
    {
      info: {
        text: 'ComboBox',
      },
    }
  )
  .add(
    'items as components',
    () => (
      <div style={{ width: 300 }}>
        <ComboBox
          items={items}
          itemToString={item => (item ? item.text : '')}
          itemToElement={itemToElement}
          {...props()}
        />
      </div>
    ),
    {
      info: {
        text: 'ComboBox',
      },
    }
  )
  .add(
    'custom text input handling',
    () => (
      <WithState initialState={{ inputText: '' }}>
        {({ state, setState }) => (
          <div style={{ width: 300 }}>
            <ComboBox
              items={items}
              itemToString={item =>
                item ? `${item.text} queried with ${state.inputText}` : ''
              }
              shouldFilterItem={() => true}
              onInputChange={text => setState({ inputText: text })}
              {...props()}
            />
          </div>
        )}
      </WithState>
    ),
    {
      info: {
        text: `Sometimes you want to perform an async action to trigger a backend call on input change.`,
      },
    }
  )
  .add(
    'application-level control for selection',
    () => <ControlledComboBoxApp {...props()} />,
    {
      info: {
        text: `Controlled ComboBox example application`,
      },
    }
  );
