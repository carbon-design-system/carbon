/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef } from 'react';
import cx from 'classnames';
import { usePrefix } from '../../../internal/usePrefix';
import type { SidePanelToolbarProps } from './SidePanel.types';

const SidePanelToolbar = forwardRef<HTMLDivElement, SidePanelToolbarProps>(
  ({ children, className, stickyToolbar = true }, ref) => {
    const prefix = usePrefix();
    const blockClass = `${prefix}--side-panel__next`;

    return (
      <div
        ref={ref}
        className={cx(`${blockClass}__toolbar`, className, {
          [`${blockClass}__toolbar--collapsible`]: !stickyToolbar,
        })}>
        {children}
      </div>
    );
  }
);
SidePanelToolbar.displayName = 'SidePanelToolbar';

export default SidePanelToolbar;
