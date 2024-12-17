/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { FluidSearch, FluidSearchSkeleton } from '.';

export default {
  title: 'Experimental/Fluid Components/unstable__FluidSearch',
  component: FluidSearch,
  subcomponents: {
    FluidSearchSkeleton,
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
  className: {
    table: {
      disable: true,
    },
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
  id: {
    table: {
      disable: true,
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
};
