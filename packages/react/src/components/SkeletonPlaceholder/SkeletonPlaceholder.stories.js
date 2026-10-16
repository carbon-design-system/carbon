/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import SkeletonPlaceholder from '.';
import mdx from './SkeletonPlaceholder.mdx';

export default {
  title: 'Components/Skeleton/SkeletonPlaceholder',
  component: SkeletonPlaceholder,
  argTypes: {
    className: {
      control: {
        type: 'text',
      },
    },
    height: {
      control: {
        type: 'range',
        min: 16,
        max: 400,
        step: 4,
      },
    },
    width: {
      control: {
        type: 'range',
        min: 16,
        max: 400,
        step: 4,
      },
    },
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => {
  return (
    <SkeletonPlaceholder
      className={args.className}
      style={{ height: args.height, width: args.width }}
    />
  );
};

Default.args = {
  className: '',
  height: 100,
  width: 100,
};
