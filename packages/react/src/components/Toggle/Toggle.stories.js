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
  return (
    <Toggle
      labelText="Label"
      labelA="Off"
      labelB="On"
      defaultToggled
      id="toggle-3"
      {...args}
    />
  );
};

Default.argTypes = {
  'aria-labelledby': {
    control: {
      type: 'text',
    },
    description:
      "Specify another element's id to be used as the label for this toggle",
  },
  className: {
    control: false,
  },
  defaultToggled: {
    control: false,
  },
  disabled: {
    control: {
      type: 'boolean',
    },
    description: 'Specify whether the toggle should be disabled',
  },
  hideLabel: {
    control: {
      type: 'boolean',
    },
    description:
      'If true, the side labels (labelA and labelB) will be replaced by labelText (if passed), so that the toggle doesn\'t render a top label',
  },
  id: {
    control: false,
  },
  labelA: {
    control: {
      type: 'text',
    },
    description: 'Specify the label for the "off" position',
  },
  labelB: {
    control: {
      type: 'text',
    },
    description: 'Specify the label for the "on" position',
  },
  labelText: {
    control: {
      type: 'text',
    },
    description:
      'Provide the text that will be read by a screen reader when visiting this control',
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
    description: 'Specify whether the toggle should be read-only',
  },
  size: {
    options: ['sm', 'md'],
    control: { type: 'select' },
    description:
      'Specify the size of the Toggle. Currently supports either sm or md (default)',
  },
  toggled: {
    control: {
      type: 'boolean',
    },
    description: 'Specify whether the control is toggled',
  },
};

export const SmallToggle = (args) => {
  return (
    <Toggle
      size="sm"
      labelText="Label"
      labelA="Off"
      labelB="On"
      defaultToggled
      id="toggle-2"
      {...args}
    />
  );
};

SmallToggle.argTypes = {
  ...Default.argTypes,
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
