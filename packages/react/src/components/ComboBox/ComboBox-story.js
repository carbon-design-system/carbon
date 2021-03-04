/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import ComboBox from '../ComboBox';
import mdx from './ComboBox.mdx';

const items = [
  {
    id: 'option-0',
    text:
      'An example option that is really long to show what should be done to handle long text',
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
    text: 'Option 3',
    selected: true,
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

const sizes = {
  'Extra large size (xl)': 'xl',
  'Default size': undefined,
  'Small size (sm)': 'sm',
};

const directions = {
  'Bottom (default)': 'bottom',
  'Top ': 'top',
};

export default {
  title: 'Components/ComboBox',
  component: ComboBox,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const combobox = () => (
  <div style={{ width: 300 }}>
    <ComboBox
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      placeholder="Filter..."
      titleText="ComboBox title"
      helperText="Combobox helper text"
    />
  </div>
);

const props = () => ({
  id: text('Combobox ID (id)', 'carbon-combobox-example'),
  placeholder: text('Placeholder text (placeholder)', 'Filter...'),
  titleText: text('Title (titleText)', 'Combobox title'),
  helperText: text('Helper text (helperText)', 'Optional helper text here'),
  light: boolean('Light (light)', false),
  disabled: boolean('Disabled (disabled)', false),
  invalid: boolean('Invalid (invalid)', false),
  invalidText: text('Invalid text (invalidText)', 'A valid value is required'),
  size: select('Field size (size)', sizes, undefined) || undefined,
  direction: select('Dropdown direction (direction)', directions, 'bottom'),
  onChange: action('onChange'),
  onToggleClick: action('onClick'),
  warn: boolean('Show warning state (warn)', false),
  warnText: text(
    'Warning state text (warnText)',
    'This mode may perform worse on older machines'
  ),
});

export const Playground = () => (
  <div style={{ width: 300 }}>
    <ComboBox
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      {...props()}
    />
  </div>
);

export const disabled = () => (
  <div style={{ width: 300 }}>
    <ComboBox
      disabled
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      placeholder="Filter..."
      titleText="ComboBox title"
      helperText="Combobox helper text"
    />
  </div>
);

export const light = () => (
  <div style={{ width: 300 }}>
    <ComboBox
      light
      items={items}
      itemToString={(item) => (item ? item.text : '')}
      placeholder="Filter..."
      titleText="ComboBox title"
      helperText="Combobox helper text"
    />
  </div>
);
