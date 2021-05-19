/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { default as OverflowMenuNext } from './next/OverflowMenu';
import { default as OverflowMenuClassic } from './OverflowMenu';

import { useFeatureFlag } from '../FeatureFlags';

const OverflowMenu = React.forwardRef(function OverflowMenu(props, ref) {
  const enabled = useFeatureFlag('enable-v11-release');
  if (enabled) {
    return <OverflowMenuNext {...props} />;
  }
  return <OverflowMenuClassic {...props} ref={ref} />;
});

export default OverflowMenu;
