/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import Dropdown from '../Dropdown';
import DropdownSkeleton from './Dropdown.Skeleton';
import WithState from '../../tools/withState';

const items = [
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
  {
    id: 'option-4',
    text: 'Option 4',
  },
];

const stringItems = ['Option 1', 'Option 2', 'Option 3'];

const types = {
  'Default (default)': 'default',
  'Inline (inline)': 'inline',
};

const sizes = {
  'Extra large size (xl)': 'xl',
  'Regular size (lg)': '',
  'Small size (sm)': 'sm',
};

const props = () => ({
  id: text('Dropdown ID (id)', 'carbon-dropdown-example'),
  type: select('Dropdown type (type)', types, 'default'),
  size: select('Field size (size)', sizes, '') || undefined,
  label: text('Label (label)', 'Dropdown menu options'),
  ariaLabel: text('Aria Label (ariaLabel)', 'Dropdown'),
  disabled: boolean('Disabled (disabled)', false),
  light: boolean('Light variant (light)', false),
  titleText: text('Title (titleText)', 'This is not a dropdown title.'),
  helperText: text('Helper text (helperText)', 'This is not some helper text.'),
  invalid: boolean('Show form validation UI (invalid)', false),
  invalidText: text(
    'Form validation UI content (invalidText)',
    'A valid value is required'
  ),
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

storiesOf('Dropdown', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    () => (
      <div style={{ width: 300 }}>
        <Dropdown
          {...props()}
          items={items}
          itemToString={item => (item ? item.text : '')}
          onChange={action('onChange')}
        />
      </div>
    ),
    {
      info: {
        text: 'Dropdown',
      },
    }
  )
  .add(
    'items as strings',
    () => (
      <div style={{ width: 300 }}>
        <Dropdown
          {...props()}
          items={stringItems}
          onChange={action('onChange')}
        />
      </div>
    ),
    {
      info: {
        text: 'Rendering an array of strings as `items`',
      },
    }
  )
  .add(
    'items as components',
    () => (
      <div style={{ width: 300 }}>
        <Dropdown
          {...props()}
          items={items}
          itemToString={item => (item ? item.text : '')}
          itemToElement={itemToElement}
          onChange={action('onChange')}
        />
      </div>
    ),
    {
      info: {
        text: `Rendering items as custom components`,
      },
    }
  )
  .add(
    'fully controlled',
    () => (
      <WithState initialState={{ selectedItem: items[0] }}>
        {({ state, setState }) => (
          <div style={{ width: 300 }}>
            <Dropdown
              {...props()}
              items={items}
              itemToString={item => (item ? item.text : '')}
              onChange={({ selectedItem }) =>
                setTimeout(() => setState({ selectedItem }), 1000)
              }
              selectedItem={state.selectedItem}
            />
          </div>
        )}
      </WithState>
    ),
    {
      info: {
        text: `
            Sometimes you want to control everything.
          `,
      },
    }
  )
  .add(
    'skeleton',
    () => (
      <div style={{ width: 300 }}>
        <DropdownSkeleton />
        &nbsp;
        <DropdownSkeleton inline />
      </div>
    ),
    {
      info: {
        text: `
            Placeholder skeleton state to use when content is loading.
          `,
      },
    }
  );
