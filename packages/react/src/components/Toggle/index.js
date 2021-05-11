/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import ToggleNext from './next/Toggle';
import ToggleClassic from './Toggle';

import { useFeatureFlag } from '../FeatureFlags';

function Toggle(props) {
  const enabled = useFeatureFlag('enable-2021-release');
  if (enabled) {
    return <ToggleNext {...props} />;
  }
  return <ToggleClassic {...props} />;
}

export { default as ToggleSkeleton } from './Toggle.Skeleton';
export default Toggle;
