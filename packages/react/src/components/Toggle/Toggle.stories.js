/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';

import { VStack } from '../Stack';
import Toggle, { ToggleSkeleton } from '../Toggle';
import mdx from './Toggle.mdx';

export default {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => {
  const { toggled: toggledArg } = args;
  const [toggled, setToggled] = useState(toggledArg);

  useEffect(() => {
    setToggled(toggledArg);
  }, [toggledArg]);

  return <Toggle {...args} toggled={toggled} onToggle={setToggled} />;
};

Default.args = {
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

Default.argTypes = {
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

export const SmallToggle = (args) => {
  const { toggled: toggledArg } = args;
  const [toggled, setToggled] = useState(toggledArg);

  useEffect(() => {
    setToggled(toggledArg);
  }, [toggledArg]);

  return <Toggle {...args} toggled={toggled} onToggle={setToggled} />;
};

SmallToggle.args = {
  ...Default.args,
  id: 'toggle-2',
  size: 'sm',
};

SmallToggle.argTypes = {
  ...Default.argTypes,
  size: {
    control: false,
  },
};

export const WithAccessibleLabels = () => {
  return (
    <VStack gap={7}>
      <Toggle id="toggle-4" labelText="Label" />

      <Toggle id="toggle-5" labelText="Label" hideLabel />

      <div>
        <div id="toggle-6-label" style={{ marginBlockEnd: '0.5rem' }}>
          Internal aria-label toggle
        </div>
        <Toggle aria-labelledby="toggle-6-label" id="toggle-6" />
      </div>

      <div>
        <label
          id="toggle-7-label"
          htmlFor="toggle-7"
          style={{ display: 'block', marginBlockEnd: '0.5rem' }}>
          External toggle label
        </label>
        <Toggle aria-labelledby="toggle-7-label" id="toggle-7" />
      </div>
    </VStack>
  );
};

export const Skeleton = (args) => {
  return (
    <div>
      <ToggleSkeleton />
    </div>
  );
};

Skeleton.parameters = {
  controls: { include: ['className'] },
};
