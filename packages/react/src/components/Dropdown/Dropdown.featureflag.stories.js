/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { Dropdown } from '../Dropdown';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Components/Dropdown/Feature Flag',
  component: Dropdown,
  tags: ['!autodocs'],
  decorators: [
    (Story) => (
      <WithFeatureFlags>
        <Story />
      </WithFeatureFlags>
    ),
  ],
};

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
    text: 'Option 3 - a disabled item',
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

export const FloatingStyles = (args) => (
  <Dropdown
    id="default"
    titleText="Dropdown label"
    helperText="This is some helper text"
    initialSelectedItem={items[1]}
    label="Option 1"
    items={items}
    itemToString={(item) => (item ? item.text : '')}
    {...args}
  />
);

FloatingStyles.args = {
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
