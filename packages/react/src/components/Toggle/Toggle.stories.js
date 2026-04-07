/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

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
  return <Toggle {...args} />;
};

Default.args = {
  labelText: 'Label',
  defaultToggled: true,
  id: 'toggle-3',
};

Default.argTypes = {
  'aria-labelledby': {
    control: {
      type: 'text',
    },
  },
  defaultToggled: {
    control: false,
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
  id: {
    control: {
      type: 'text',
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
  onClick: {
    control: false,
    action: 'clicked',
  },
  onToggle: {
    control: false,
    action: 'toggled',
  },
  readOnly: {
    control: {
      type: 'boolean',
    },
  },
  size: {
    options: ['sm', 'md'],
    control: { type: 'select' },
  },
  toggled: {
    control: false,
  },
};

export const SmallToggle = (args) => {
  return <Toggle {...args} />;
};

SmallToggle.args = {
  size: 'sm',
  labelText: 'Label',
  defaultToggled: true,
  id: 'toggle-2',
};

SmallToggle.argTypes = {
  ...Default.argTypes,
};

SmallToggle.parameters = {
  controls: {
    exclude: ['size'],
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
