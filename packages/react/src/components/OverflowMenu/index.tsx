/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef } from 'react';
import { useFeatureFlag } from '../FeatureFlags';
import { OverflowMenu as OverflowMenuV12 } from './next';
import {
  OverflowMenu as OverflowMenuV11,
  type OverflowMenuProps,
} from './OverflowMenu';

const OverflowMenu = forwardRef<HTMLDivElement, OverflowMenuProps>(
  (props, ref) => {
    const enableV12OverflowMenu = useFeatureFlag('enable-v12-overflowmenu');

    return enableV12OverflowMenu ? (
      <OverflowMenuV12 {...props} ref={ref} />
    ) : (
      <OverflowMenuV11
        {...props}
        ref={ref as React.LegacyRef<HTMLButtonElement>}
      />
    );
  }
);

OverflowMenu.displayName = 'OverflowMenu';
OverflowMenu.propTypes = OverflowMenuV11.propTypes;

export default OverflowMenu;
export { OverflowMenu, type OverflowMenuProps };
