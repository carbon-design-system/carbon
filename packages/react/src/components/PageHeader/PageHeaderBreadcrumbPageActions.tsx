/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import Button from '../Button';
import { OverflowMenu } from '../OverflowMenu';
import { MenuItem } from '../Menu/MenuItem';
import { FeatureFlags } from '../FeatureFlags';
import { createOverflowHandler } from '@carbon/utilities';
import { blockClass } from './utils';

/**
 * --------------------------------
 * PageHeaderBreadcrumbPageActions
 * --------------------------------
 */

export interface PageHeaderBreadcrumbPageActionItem {
  /**
   * Unique identifier for the action item
   */
  id: string;
  /**
   * Label for the action (used for icon description and overflow menu item text)
   */
  label: string;
  /**
   * Icon component to render for the action button
   */
  renderIcon: React.ComponentType;
  /**
   * Click handler for the action
   */
  onClick?: () => void;
}

export interface PageHeaderBreadcrumbPageActionsProps {
  /**
   * Array of action items to display
   */
  actions: PageHeaderBreadcrumbPageActionItem[];
  /**
   * Specify an optional className to be added to the component
   */
  className?: string;
  /**
   * Aria label for the overflow menu
   */
  overflowMenuLabel?: string;
  /**
   * Size of the action buttons
   */
  buttonSize?: 'sm' | 'md' | 'lg';
  /**
   * Kind of the action buttons
   */
  buttonKind?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'ghost'
    | 'danger'
    | 'danger--tertiary'
    | 'danger--ghost';
}

export const PageHeaderBreadcrumbPageActions = ({
  actions,
  className,
  overflowMenuLabel = 'More page actions',
  buttonSize = 'md',
  buttonKind = 'ghost',
  ...other
}: PageHeaderBreadcrumbPageActionsProps) => {
  const containerRef = useRef<HTMLUListElement>(null);
  const [hiddenItems, setHiddenItems] = useState<
    PageHeaderBreadcrumbPageActionItem[]
  >([]);

  const classNames = classnames(
    `${blockClass}__breadcrumb-page-actions`,
    className
  );

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    const handler = createOverflowHandler({
      container: containerRef.current,
      onChange: (_visible, hidden) => {
        const hiddenIds = hidden.map((el) => el.dataset.id);
        setHiddenItems(actions.filter((item) => hiddenIds.includes(item.id)));
      },
    });
    return () => handler.disconnect();
  }, [actions]);

  return (
    <ul ref={containerRef} className={classNames} {...other}>
      {actions.map((item) => (
        <li key={item.id} data-id={item.id}>
          <Button
            renderIcon={item.renderIcon}
            iconDescription={item.label}
            hasIconOnly
            size={buttonSize}
            kind={buttonKind}
            onClick={item.onClick}
          />
        </li>
      ))}
      <li
        data-offset
        data-hidden
        data-floating-menu-container
        className={`${blockClass}__breadcrumb-page-actions__overflow-item`}>
        <FeatureFlags enableV12Overflowmenu>
          <OverflowMenu size={buttonSize} aria-label={overflowMenuLabel}>
            {hiddenItems.map((item) => (
              <MenuItem
                key={item.id}
                label={item.label}
                onClick={item.onClick}
              />
            ))}
          </OverflowMenu>
        </FeatureFlags>
      </li>
    </ul>
  );
};

PageHeaderBreadcrumbPageActions.displayName = 'PageHeaderBreadcrumbPageActions';
