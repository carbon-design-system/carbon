/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';

import SkeletonPlaceholder from '.';
import mdx from './SkeletonPlaceholder.mdx';

export default {
  title: 'Components/Skeleton/SkeletonPlaceholder',
  component: SkeletonPlaceholder,
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
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  return <SkeletonPlaceholder />;
};
