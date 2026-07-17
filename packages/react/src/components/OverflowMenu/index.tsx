/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef, type Ref } from 'react';
import { useFeatureFlag } from '../FeatureFlags';
import { OverflowMenu as OverflowMenuV12 } from './next';
import {
  OverflowMenu as OverflowMenuV11,
  type OverflowMenuProps,
} from './OverflowMenu';

/**
 * Overflow menu component.
 *
 * @featureFlag enable-v12-overflowmenu - Switches to the newer `Menu`-based
 * implementation. **Will be on by default in v12.**
 *
 * Enable in your app:
 * ```jsx
 * import { FeatureFlags } from '@carbon/react';
 *
 * <FeatureFlags enableV12Overflowmenu>
 *   <OverflowMenu />
 * </FeatureFlags>
 * ```
 *
 * @see https://github.com/carbon-design-system/carbon/blob/main/docs/feature-flags.md
 */
const OverflowMenu = forwardRef<HTMLDivElement, OverflowMenuProps>(
  (props, ref) => {
    const enableV12OverflowMenu = useFeatureFlag('enable-v12-overflowmenu');

    return enableV12OverflowMenu ? (
      <OverflowMenuV12 {...props} ref={ref} />
    ) : (
      <OverflowMenuV11 {...props} ref={ref as Ref<HTMLButtonElement>} />
    );
  }
);

OverflowMenu.displayName = 'OverflowMenu';
OverflowMenu.propTypes = OverflowMenuV11.propTypes;

export default OverflowMenu;
export { OverflowMenu, type OverflowMenuProps };
