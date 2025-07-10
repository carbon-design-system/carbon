/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Toggle } from '.';
import './toggle-story.scss';

import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';

export default {
  title: 'Components/Toggle/Feature Flag',
  component: Toggle,
  decorators: [
    (Story) => (
      <WithFeatureFlags>
        <Story />
      </WithFeatureFlags>
    ),
  ],
  tags: ['!autodocs'],
};

const experimentalClassname = 'v12-toggle';

export const _Toggle = (args) => {
  return (
    <div className={experimentalClassname}>
      <Toggle
        labelText="Label"
        labelA="Off"
        labelB="On"
        defaultToggled
        id="toggle-3"
        {...args}
      />
    </div>
  );
};

_Toggle.args = {
  disabled: false,
};

_Toggle.argTypes = {
  disabled: {
    control: {
      type: 'boolean',
    },
  },
};
