/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef } from 'react';
import { useFeatureFlag } from '../FeatureFlags';
import type { OverflowMenuProps } from './OverflowMenu';

import { OverflowMenu as OverflowMenuV12 } from './next';

import { OverflowMenu as OverflowMenuComponent } from './OverflowMenu';
import { createClassWrapper } from '../../internal/createClassWrapper';

const OverflowMenuV11 = createClassWrapper(OverflowMenuComponent);

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

export default OverflowMenu;
export { OverflowMenu, type OverflowMenuProps };
