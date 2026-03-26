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

export const Default = () => {
  return <Toggle labelText="Label" defaultToggled id="toggle-3" />;
};

Default.argTypes = {
  'aria-labelledby': {
    control: {
      type: 'text',
    },
    description:
      'Specify the id of the element that should be used as the label',
  },
  defaultToggled: {
    control: false,
    description: 'Specify whether the toggle should be on by default',
  },
  disabled: {
    control: {
      type: 'boolean',
    },
    description: 'Whether the toggle should be disabled',
  },
  hideLabel: {
    control: {
      type: 'boolean',
    },
    description: 'Whether to hide the label text',
  },
  id: {
    control: false,
    description: 'The unique identifier for the toggle',
  },
  labelA: {
    control: {
      type: 'text',
    },
    description: 'The label for the "on" state',
  },
  labelB: {
    control: {
      type: 'text',
    },
    description: 'The label for the "off" state',
  },
  labelText: {
    control: {
      type: 'text',
    },
    description: 'The text label for the toggle',
  },
  onClick: {
    control: false,
    action: 'clicked',
    description: 'Callback function when toggle is clicked',
  },
  onToggle: {
    control: false,
    action: 'toggled',
    description: 'Callback function when toggle state changes',
  },
  readOnly: {
    control: {
      type: 'boolean',
    },
    description: 'Whether the toggle is read-only',
  },
  size: {
    options: ['sm', 'md'],
    control: { type: 'select' },
    description: 'Specify the size of the toggle',
  },
  toggled: {
    control: {
      type: 'boolean',
    },
    description: 'Whether the toggle is currently on',
  },
};

export const SmallToggle = () => {
  return <Toggle size="sm" labelText="Label" defaultToggled id="toggle-2" />;
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
