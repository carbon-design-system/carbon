/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { Dropdown } from '../Dropdown';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';

const defaultArgs = {
  'aria-label': '',
  autoAlign: false,
  direction: 'bottom',
  disabled: false,
  helperText: 'Helper text',
  hideLabel: false,
  invalid: false,
  invalidText: 'Error message goes here',
  label: 'Option 1',
  readOnly: false,
  size: 'md',
  titleText: 'Label',
  type: 'default',
  warn: false,
  warnText: 'Warning message goes here',
};

const argTypes = {
  'aria-label': { control: 'text' },
  autoAlign: { control: 'boolean' },
  direction: {
    control: 'radio',
    options: ['top', 'bottom'],
  },
  disabled: { control: 'boolean' },
  helperText: { control: 'text' },
  hideLabel: { control: 'boolean' },
  invalid: { control: 'boolean' },
  invalidText: { control: 'text' },
  label: { control: 'text' },
  onChange: { action: 'onChange' },
  readOnly: { control: 'boolean' },
  size: {
    control: 'select',
    options: ['xs', 'sm', 'md', 'lg'],
  },
  titleText: { control: 'text' },
  type: {
    control: 'select',
    options: ['default', 'inline'],
  },
  warn: { control: 'boolean' },
  warnText: { control: 'text' },
};

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Components/Dropdown/Feature Flag',
  component: Dropdown,
  tags: ['!autodocs'],
  parameters: {
    controls: { include: Object.keys(argTypes) },
  },
  decorators: [
    (Story) => (
      <WithFeatureFlags
        flags={{
          'enable-v12-dynamic-floating-styles': true,
        }}>
        <Story />
      </WithFeatureFlags>
    ),
  ],
};

export const FloatingStyles = (args) => {
  const items = [
    {
      text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      text: 'Option 1',
    },
    {
      text: 'Option 2',
    },
    {
      text: 'Option 3',
      disabled: true,
    },
    {
      text: 'Option 4',
    },
    {
      text: 'Option 5',
    },
    {
      text: 'Option 6',
    },
    {
      text: 'Option 7',
    },
    {
      text: 'Option 8',
    },
  ];

  return (
    <div style={{ width: 400 }}>
      <Dropdown
        id="default"
        titleText="Label"
        helperText="Helper text"
        initialSelectedItem={items[1]}
        label="Option 1"
        items={items}
        itemToString={(item) => (item ? item.text : '')}
        {...args}
      />
    </div>
  );
};

FloatingStyles.args = {
  ...defaultArgs,
};

FloatingStyles.argTypes = { ...argTypes };
