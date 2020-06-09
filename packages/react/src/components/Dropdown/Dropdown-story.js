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
  {
    id: 'option-5',
    text:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae, aliquam. Blanditiis quia nemo enim voluptatibus quos ducimus porro molestiae nesciunt error cumque quaerat, tempore vero unde eum aperiam eligendi repellendus.',
  },
];

const stringItems = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae, aliquam. Blanditiis quia nemo enim voluptatibus quos ducimus porro molestiae nesciunt error cumque quaerat, tempore vero unde eum aperiam eligendi repellendus.',
];

const sizes = {
  'Extra large size (xl)': 'xl',
  'Default size': undefined,
  'Small size (sm)': 'sm',
};

const directions = {
  'Bottom (default)': 'bottom',
  'Top ': 'top',
};

const props = () => ({
  id: text('Dropdown ID (id)', 'carbon-dropdown-example'),
  size: select('Field size (size)', sizes, undefined) || undefined,
  direction: select('Dropdown direction (direction)', directions, 'bottom'),
  label: text('Label (label)', 'Dropdown menu options'),
  ariaLabel: text('Aria Label (ariaLabel)', 'Dropdown'),
  disabled: boolean('Disabled (disabled)', false),
  light: boolean('Light variant (light)', false),
  titleText: text('Title (titleText)', 'This is a dropdown title.'),
  helperText: text('Helper text (helperText)', 'This is some helper text.'),
  invalid: boolean('Show form validation UI (invalid)', false),
  invalidText: text(
    'Form validation UI content (invalidText)',
    'A valid value is required'
  ),
});

storiesOf('Dropdown', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    () => (
      <div style={{ width: 300 }}>
        <Dropdown
          {...props()}
          items={items}
          itemToString={(item) => (item ? item.text : '')}
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
    'inline',
    () => (
      <div style={{ width: 600 }}>
        <Dropdown
          {...props()}
          type="inline"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
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
      <div style={props.inline ? { width: 500 } : { width: 300 }}>
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
    'fully controlled',
    () => (
      <WithState initialState={{ selectedItem: items[0] }}>
        {({ state, setState }) => (
          <div style={{ width: 300 }}>
            <Dropdown
              {...props()}
              items={items}
              itemToString={(item) => (item ? item.text : '')}
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
