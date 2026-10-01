/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState, useRef } from 'react';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';
import classnames from 'classnames';
import { MenuItem, type MenuItemProps } from '../Menu/MenuItem';
import { MenuButton } from '../MenuButton';
import { blockClass } from './utils';
import { createOverflowHandler } from '@carbon/utilities';
import { usePageHeader } from './context';
import { usePrefix } from '../../internal/usePrefix';

/**
 * ----------------
 * PageHeaderContentPageActions
 * ----------------
 */
export interface PageHeaderContentPageActionsProps {
  /**
   * Provide child elements to be rendered inside PageHeaderContentPageActions.
   */
  children?: React.ReactNode;
  /**
   * Specify an optional className to be added to your PageHeaderContentPageActions
   */
  className?: string;
  /**
   * The PageHeaderContent's page actions collapsible Menu button label
   */
  menuButtonLabel?: string;
  /**
   * The PageHeaderContent's page actions
   */
  actions?: React.ReactNode;
}

export const PageHeaderContentPageActions = ({
  className,
  children,
  menuButtonLabel = 'Actions',
  actions,
  ...other
}: PageHeaderContentPageActionsProps) => {
  const prefix = usePrefix();
  const {
    setRefs,
    observerState,
    isContentActionsInBreadcrumbBar: isInBreadcrumbBar,
    isFunctionalContentActions,
  } = usePageHeader();

  const classNames = classnames(
    `${blockClass}__content__page-actions`,
    {
      // When in BreadcrumbBar:
      // - If functional content actions: skip clipping logic (always show)
      // - Otherwise: use inverse of contentActionsClipped
      // When in Content: use contentActionsClipped directly
      [`${blockClass}__content__page-actions--clipped`]: isInBreadcrumbBar
        ? isFunctionalContentActions
          ? false
          : !observerState.contentActionsClipped
        : observerState.contentActionsClipped,
    },
    className
  );

  type action = {
    id: string;
    onClick?: () => void;
    body: React.ReactNode;
    menuItem: MenuItemProps;
  };

  const containerRef = useRef<HTMLUListElement>(null);
  const offsetRef = useRef<HTMLLIElement>(null);
  const [menuButtonVisibility, setMenuButtonVisibility] = useState(false);
  const [hiddenItems, setHiddenItems] = useState<action[]>([]);

  // need to set the grid columns width based on the menu button's width
  // to avoid overlapping when resizing
  useIsomorphicEffect(() => {
    if (menuButtonVisibility && offsetRef.current && containerRef.current) {
      const width = offsetRef.current.offsetWidth;
      // Walk up to find the PageHeader root element to scope the variable there
      const pageHeaderRoot = containerRef.current.closest(
        `.${blockClass}__next`
      ) as HTMLElement | null;
      const target = pageHeaderRoot ?? containerRef.current;
      target.style.setProperty(
        `--${prefix}-page-header-title-grid-width`,
        `${width}px`
      );
    }
  }, [menuButtonVisibility]);

  useEffect(() => {
    if (isInBreadcrumbBar) {
      setRefs((prev) => ({ ...prev, breadcrumbActions: containerRef }));
    } else {
      setRefs((prev) => ({ ...prev, contentActions: containerRef }));
    }
  }, [isInBreadcrumbBar, setRefs]);

  useEffect(() => {
    if (!containerRef.current || !Array.isArray(actions)) {
      return;
    }
    createOverflowHandler({
      container: containerRef.current,
      // exclude the hidden menu button from children
      maxVisibleItems: containerRef.current.children.length - 1,
      onChange: (visible, hidden) => {
        setHiddenItems(actions?.slice(visible.length));

        if (hidden.length > 0) {
          setMenuButtonVisibility(true);
        }
      },
    });
  }, [actions]);

  return (
    <ul className={classNames} ref={containerRef} {...other}>
      {Array.isArray(actions) && (
        <>
          {actions.map((action) => (
            <li key={action.id}>
              {React.cloneElement(action.body, {
                ...action.body.props,
                onClick: action.onClick,
              })}
            </li>
          ))}
          <li data-offset data-hidden ref={offsetRef}>
            <MenuButton
              menuAlignment="bottom-end"
              label={menuButtonLabel}
              size="md">
              {[...hiddenItems].reverse().map((item) => (
                <MenuItem
                  key={item.id}
                  onClick={item.onClick}
                  {...item.menuItem}
                />
              ))}
            </MenuButton>
          </li>
        </>
      )}
    </ul>
  );
};

PageHeaderContentPageActions.displayName = 'PageHeaderContentPageActions';
