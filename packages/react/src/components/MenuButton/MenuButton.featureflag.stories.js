/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { MenuItem } from '../Menu';
import { MenuButton } from '../MenuButton';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';

// eslint-disable-next-line storybook/csf-component
export default {
  title: 'Components/MenuButton/Feature Flag',
  component: MenuButton,
  tags: ['!autodocs'],
  decorators: [
    (Story) => (
      <WithFeatureFlags>
        <Story />
      </WithFeatureFlags>
    ),
  ],
  parameters: {
    controls: {
      include: ['label', 'menuAlignment'],
    },
  },
};

export const FloatingStyles = (args) => (
  <MenuButton {...args}>
    <MenuItem label="First action" />
    <MenuItem label="Second action that is a longer item to test overflow and title." />
    <MenuItem label="Third action" disabled />
  </MenuButton>
);

FloatingStyles.args = {
  label: 'Actions',
  menuAlignment: 'bottom',
};

FloatingStyles.argTypes = {
  label: {
    control: {
      type: 'text',
    },
  },
  menuAlignment: {
    options: ['top', 'bottom'],
    control: {
      type: 'radio',
    },
  },
};
