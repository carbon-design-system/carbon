/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef, type Ref } from 'react';
import { useFeatureFlag } from '../FeatureFlags';
import {
  OverflowMenu as OverflowMenuV12,
  type OverflowMenuProps as OverflowMenuV12Props,
} from './next';
import {
  OverflowMenu as OverflowMenuV11,
  type OverflowMenuProps,
} from './OverflowMenu';

const OverflowMenu = forwardRef<HTMLDivElement, OverflowMenuProps>(
  (props, ref) => {
    const enableV12OverflowMenu = useFeatureFlag('enable-v12-overflowmenu');

    return enableV12OverflowMenu ? (
      // The two implementations have different prop shapes and different host
      // elements (v12 renders a div, v11 a button), so neither branch is
      // assignable from the shared v11-typed props. The v11 branch already
      // casts its ref for the same reason.
      <OverflowMenuV12
        {...(props as unknown as OverflowMenuV12Props)}
        ref={ref}
      />
    ) : (
      <OverflowMenuV11 {...props} ref={ref as Ref<HTMLButtonElement>} />
    );
  }
);

OverflowMenu.displayName = 'OverflowMenu';
OverflowMenu.propTypes = OverflowMenuV11.propTypes;

export default OverflowMenu;
export { OverflowMenu, type OverflowMenuProps };
