/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';

import AiSkeletonPlaceholder from './AiSkeletonPlaceholder';

export default {
  title: 'Experimental/unstable__AiSkeleton/AiSkeletonPlaceholder',
  component: AiSkeletonPlaceholder,
};

export const Default = () => <AiSkeletonPlaceholder className="test" />;
