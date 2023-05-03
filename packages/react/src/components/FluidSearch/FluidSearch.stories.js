/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { FluidSearch, FluidSearchSkeleton } from '.';

export default {
  title: 'Experimental/unstable__FluidSearch',
  component: FluidSearch,
  subcomponents: {
    FluidSearchSkeleton,
  },
};

export const Default = () => (
  <div style={{ width: '400px' }}>
    <FluidSearch
      size="lg"
      labelText="Search"
      closeButtonLabelText="Clear search input"
      id="fluid-search-1"
      placeholder="Prompt text"
    />
  </div>
);

export const Skeleton = () => (
  <div style={{ width: '400px' }}>
    <FluidSearchSkeleton />
  </div>
);

export const Playground = (args) => (
  <div style={{ width: args.playgroundWidth }}>
    <FluidSearch {...args} />
  </div>
);

Playground.argTypes = {
  playgroundWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
    defaultValue: 400,
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
    defaultValue: 'Clear search input',
  },
  disabled: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
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
    defaultValue: 'Search',
  },
  placeholder: {
    control: {
      type: 'text',
    },
    defaultValue: 'Prompt text',
  },
};
