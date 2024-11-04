/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ComboButton } from '../ComboButton';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';
import { MenuItem } from '../Menu';

export default {
  title: 'Components/ComboButton/Feature Flag',
  component: ComboButton,
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

export const FloatingStyles = (args) => (
  <ComboButton menuAlignment={args.menuAlignment} label="Primary action">
    <MenuItem label="Second action with a long label description" />
    <MenuItem label="Third action" />
    <MenuItem label="Fourth action" disabled />
  </ComboButton>
);

FloatingStyles.args = {
  menuAlignment: 'bottom',
};

FloatingStyles.argTypes = {
  menuAlignment: {
    options: ['top', 'bottom'],
    control: {
      type: 'radio',
    },
  },
};
