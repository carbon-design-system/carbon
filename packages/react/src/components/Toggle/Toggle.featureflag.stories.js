/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
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

const previewClassname = 'v12-toggle';

export const _Toggle = (args) => {
  const { toggled: toggledArg } = args;
  const [toggled, setToggled] = useState(toggledArg);

  useEffect(() => {
    setToggled(toggledArg);
  }, [toggledArg]);

  return (
    <div className={previewClassname}>
      <Toggle {...args} toggled={toggled} onToggle={setToggled} />
    </div>
  );
};

_Toggle.args = {
  defaultToggled: true,
  disabled: false,
  hideLabel: false,
  id: 'toggle-3',
  labelA: 'Off',
  labelB: 'On',
  labelText: 'Label',
  readOnly: false,
  size: 'md',
  toggled: true,
};

_Toggle.argTypes = {
  'aria-labelledby': {
    control: {
      type: 'text',
    },
  },
  defaultToggled: {
    control: {
      type: 'boolean',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  hideLabel: {
    control: {
      type: 'boolean',
    },
  },
  labelA: {
    control: {
      type: 'text',
    },
  },
  labelB: {
    control: {
      type: 'text',
    },
  },
  labelText: {
    control: {
      type: 'text',
    },
  },
  readOnly: {
    control: {
      type: 'boolean',
    },
  },
  size: {
    control: {
      type: 'radio',
    },
    options: ['sm', 'md'],
  },
  toggled: {
    control: {
      type: 'boolean',
    },
  },
};
