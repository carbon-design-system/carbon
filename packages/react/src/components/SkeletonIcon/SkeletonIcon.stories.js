/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import SkeletonIcon from '.';
import mdx from './SkeletonIcon.mdx';

export default {
  title: 'Components/Skeleton/SkeletonIcon',
  component: SkeletonIcon,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
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
  return (
    <>
      <SkeletonIcon {...propsSkeleton} />
      <SkeletonIcon {...propsSkeleton2} />
    </>
  );
};
