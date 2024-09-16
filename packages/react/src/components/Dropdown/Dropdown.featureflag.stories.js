/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { default as Dropdown } from '.';
import { action } from '@storybook/addon-actions';
import mdx from '../Popover/Popover.featureflag.mdx';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Experimental/Feature Flags/Dynamic floating styles/Dropdown',
  component: Dropdown,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  decorators: [
    (Story) => (
      <WithFeatureFlags>
        <Story />
      </WithFeatureFlags>
    ),
  ],
  args: {
    kind: 'error',
    lowContrast: false,
    hideCloseButton: false,
    ['aria-label']: 'closes notification',
    statusIconDescription: 'notification',
    onClose: action('onClose'),
    onCloseButtonClick: action('onCloseButtonClick'),
  },
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

export const Default = () => (
  <Dropdown
    id="default"
    titleText="Dropdown label"
    helperText="This is some helper text"
    initialSelectedItem={items[1]}
    label="Option 1"
    items={items}
    itemToString={(item) => (item ? item.text : '')}
    direction="bottom"
  />
);

Default.argTypes = {
  hasFocus: {
    table: {
      disable: true,
    },
  },
};
