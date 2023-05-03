/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import SkeletonIcon from '.';

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

export default {
  title: 'Components/Skeleton/SkeletonIcon',
  component: SkeletonIcon,
};

export const Default = () => (
  <>
    <SkeletonIcon {...propsSkeleton} />
    <SkeletonIcon {...propsSkeleton2} />
  </>
);
