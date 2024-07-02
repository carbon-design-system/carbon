/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';

import AiSkeletonText from './AiSkeletonText';

export default {
  title: 'Experimental/unstable__AiSkeleton/AiSkeletonText',
  component: AiSkeletonText,
};

export const Default = () => <AiSkeletonText />;

export const Playground = (args) => <AiSkeletonText {...args} />;

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
