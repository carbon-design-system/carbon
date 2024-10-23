/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ComboBox } from '../ComboBox';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';

export default {
  title: 'Components/ComboBox/Feature Flag',
  component: ComboBox,
  tags: ['!autodocs'],
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

export const FloatingStyles = (args) => (
  <ComboBox
    onChange={() => {}}
    id="carbon-combobox"
    items={comboBoxItems}
    itemToString={(item) => (item ? item.text : '')}
    titleText="ComboBox title"
    helperText="Combobox helper text"
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
