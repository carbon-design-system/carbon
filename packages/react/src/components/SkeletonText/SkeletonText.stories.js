/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';

import SkeletonText from '.';
import mdx from './SkeletonText.mdx';

export default {
  title: 'Components/Skeleton/SkeletonText',
  component: SkeletonText,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => <SkeletonText />;

export const Playground = (args) => <SkeletonText {...args} />;

Playground.args = {
  heading: false,
  paragraph: false,
  width: '100%',
  lineCount: 3,
};

Playground.argTypes = {
  className: {
    control: false,
  },
  heading: {
    control: {
      type: 'boolean',
    },
  },
  paragraph: {
    control: {
      type: 'boolean',
    },
  },
  width: {
    control: {
      type: 'text',
    },
  },
  lineCount: {
    control: {
      type: 'number',
    },
  },
};
