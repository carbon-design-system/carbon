/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { useFeatureFlag } from '../FeatureFlags';

import { OverflowMenu as OverflowMenuV12 } from './next';

import { OverflowMenu as OverflowMenuComponent } from './OverflowMenu';
import { createClassWrapper } from '../../internal/createClassWrapper';

const OverflowMenuV11 = createClassWrapper(OverflowMenuComponent);

function OverflowMenu(props) {
  const enableV12OverflowMenu = useFeatureFlag('enable-v12-overflowmenu');

  return enableV12OverflowMenu ? (
    <OverflowMenuV12 {...props} />
  ) : (
    <OverflowMenuV11 {...props} />
  );
}

OverflowMenu.displayName = 'OverflowMenu';

export default OverflowMenu;
export { OverflowMenu };
