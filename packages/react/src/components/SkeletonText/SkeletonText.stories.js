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
const Defaultargs = {
  heading: false,
  paragraph: false,
  width: '100%',
  lineCount: 3,
  theme: 'g10',
};

const DefaultargTypes = {
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
  theme: {
    options: ['white', 'g10', 'g90', 'g100'],
    control: { type: 'select' },
    description: 'The theme to apply to the component.',
  },
};
export default {
  title: 'Components/Skeleton/SkeletonText',
  component: SkeletonText,
  argTypes: DefaultargTypes,
  args: Defaultargs,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => {
  return <SkeletonText {...args} />;
};
