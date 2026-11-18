/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef } from 'react';
import cx from 'classnames';
import { usePrefix } from '../../../internal/usePrefix';
import type { SidePanelNavBarProps } from './SidePanel.types';

/**
 * ----------------
 * SidePanelNavBar
 * ----------------
 *
 * Placeholder shell. Sticky positioning is implemented in a follow-up issue.
 */
const SidePanelNavBar = forwardRef<HTMLDivElement, SidePanelNavBarProps>(
  ({ children, className }, ref) => {
    const prefix = usePrefix();
    const blockClass = `${prefix}--side-panel__next`;

    return (
      <div ref={ref} className={cx(`${blockClass}__navigation-bar`, className)}>
        {children}
      </div>
    );
  }
);
SidePanelNavBar.displayName = 'SidePanelNavBar';

export default SidePanelNavBar;
