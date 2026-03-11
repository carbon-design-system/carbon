/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { MultiSelect } from '../MultiSelect';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Components/MultiSelect/Feature Flag',
  component: MultiSelect,
  tags: ['!autodocs'],
  decorators: [
    (Story) => (
      <WithFeatureFlags>
        <Story />
      </WithFeatureFlags>
    ),
  ],
  argTypes: {
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
    disabled: {
      control: { type: 'boolean' },
    },
    invalid: {
      control: { type: 'boolean' },
    },
    light: {
      table: {
        disable: true,
      },
    },
    warn: {
      control: { type: 'boolean' },
    },
    helperText: {
      control: { type: 'text' },
    },
    invalidText: {
      control: { type: 'text' },
    },
    label: {
      control: { type: 'text' },
    },
    warnText: {
      control: { type: 'text' },
    },
  },
  parameters: {
    controls: {
      exclude: [
        'filterItems',
        'translateWithId',
        'titleText',
        'open',
        'selectedItems',
        'itemToString',
        'itemToElement',
        'locale',
        'items',
        'id',
        'initialSelectedItems',
        'sortItems',
        'compareItems',
        'downshiftProps',
      ],
    },
  },
};

const comboBoxItems = [
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

const sharedArgs = {
  size: 'md',
  autoAlign: false,
  type: 'default',
  titleText: 'Multiselect title',
  disabled: false,
  hideLabel: false,
  invalid: false,
  warn: false,
  helperText: 'This is helper text',
  warnText: 'whoopsie!',
  invalidText: 'whoopsie!',
  label: 'Multiselect Label',
  clearSelectionDescription: 'Total items selected: ',
  useTitleInItem: false,
  clearSelectionText: 'To clear selection, press Delete or Backspace,',
};
export const FloatingStyles = (args) => (
  <MultiSelect
    id="carbon-multiselect-example"
    items={comboBoxItems}
    itemToString={(item) => (item ? item.text : '')}
    selectionFeedback="top-after-reopen"
    {...args}
  />
);

FloatingStyles.args = {
  ...sharedArgs,
  direction: 'bottom',
};

FloatingStyles.argTypes = {
  direction: {
    options: ['top', 'bottom'],
    control: {
      type: 'radio',
    },
  },
};
