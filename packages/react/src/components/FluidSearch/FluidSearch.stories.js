/**
 * Copyright IBM Corp. 2016, 2026
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
  args: {
    autoComplete: 'off',
    closeButtonLabelText: 'Clear search input',
    defaultWidth: 400,
    disabled: false,
    labelText: 'Search',
    placeholder: 'Prompt text',
    role: 'searchbox',
    type: 'search',
  },
  argTypes: {
    autoComplete: {
      control: { type: 'text' },
    },
    closeButtonLabelText: {
      control: { type: 'text' },
    },
    defaultValue: {
      control: { type: 'text' },
    },
    defaultWidth: {
      control: { type: 'range', min: 300, max: 800, step: 50 },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    labelText: {
      control: { type: 'text' },
    },
    onChange: {
      action: 'onChange',
    },
    placeholder: {
      control: { type: 'text' },
    },
    role: {
      control: { type: 'text' },
    },
    type: {
      control: { type: 'text' },
    },
    value: {
      control: { type: 'text' },
    },
  },
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
};

export const Skeleton = ({ defaultWidth }) => (
  <div style={{ width: defaultWidth }}>
    <FluidSearchSkeleton />
  </div>
);

Skeleton.parameters = {
  controls: {
    include: ['defaultWidth'],
  },
};

export const Default = ({ defaultWidth, ...searchArgs }) => (
  <div style={{ width: defaultWidth }}>
    <FluidSearch {...searchArgs} />
  </div>
);
