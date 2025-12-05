/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { FluidSearch, FluidSearchSkeleton } from '.';
import mdx from './FluidSearch.mdx';

export default {
  title: 'Components/Fluid Components/FluidSearch',
  component: FluidSearch,
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['id'],
    },
  },
  subcomponents: {
    FluidSearchSkeleton,
  },
  args: {
    theme: 'g10',
  },
  argTypes: {
    theme: {
      options: ['white', 'g10', 'g90', 'g100'],
      control: { type: 'select' },
      description: 'The theme to apply to the component.',
    },
  },
};

export const Skeleton = () => (
  <div style={{ width: '400px' }}>
    <FluidSearchSkeleton />
  </div>
);

export const Default = (args) => (
  <div style={{ width: args.defaultWidth }}>
    <FluidSearch {...args} />
  </div>
);

Default.args = {
  defaultWidth: 400,
  closeButtonLabelText: 'Clear search input',
  disabled: false,
  labelText: 'Search',
  placeholder: 'Prompt text',
};

Default.argTypes = {
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  closeButtonLabelText: {
    control: {
      type: 'text',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  defaultValue: {
    control: {
      type: 'text',
    },
  },
  labelText: {
    control: {
      type: 'text',
    },
  },
  placeholder: {
    control: {
      type: 'text',
    },
  },
  theme: {
    options: ['white', 'g10', 'g90', 'g100'],
    control: { type: 'select' },
    description: 'The theme to apply to the component.',
  },
};
