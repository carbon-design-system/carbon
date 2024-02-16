/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';

import AiSkeletonIcon from './AiSkeletonIcon';

export default {
  title: 'Experimental/unstable__AiSkeleton/AiSkeletonIcon',
  component: AiSkeletonIcon,
};

const propsSkeleton = {
  style: {
    margin: '50px',
  },
};

const propsSkeleton2 = {
  style: {
    margin: '50px',
    width: '24px',
    height: '24px',
  },
};

export const Default = () => (
  <>
    <AiSkeletonIcon {...propsSkeleton} />
    <AiSkeletonIcon {...propsSkeleton2} />
  </>
);
