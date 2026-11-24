/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { forwardRef } from 'react';
import cx from 'classnames';
import { usePrefix } from '../../../internal/usePrefix';
import type {
  SidePanelHeaderActionItemProps,
  SidePanelHeaderActionsProps,
} from './SidePanel.types';

export const SidePanelHeaderActions = forwardRef<
  HTMLDivElement,
  SidePanelHeaderActionsProps
>(({ children, className }, ref) => {
  const prefix = usePrefix();
  const blockClass = `${prefix}--side-panel__next`;

  return (
    <div ref={ref} className={cx(`${blockClass}__header-actions`, className)}>
      {children}
    </div>
  );
});
SidePanelHeaderActions.displayName = 'SidePanelHeaderActions';

export const SidePanelHeaderActionItem = ({
  children,
  className,
}: SidePanelHeaderActionItemProps) => {
  const prefix = usePrefix();
  const blockClass = `${prefix}--side-panel__next`;

  return (
    <div className={cx(`${blockClass}__header-action-item`, className)}>
      {children}
    </div>
  );
};
SidePanelHeaderActionItem.displayName = 'SidePanelHeaderActionItem';
