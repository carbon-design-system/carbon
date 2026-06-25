/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MenuButton, MenuButtonProps, MenuItem } from '@carbon/react';
import React, {
  forwardRef,
  ReactElement,
  ReactNode,
  useRef,
  useState,
} from 'react';
import { useIsomorphicEffect } from '../../../global/js/hooks';
import { blockClass } from './context';
import { createOverflowHandler } from '@carbon/utilities';
import cx from 'classnames';
/**
 * ----------------
 * TearsheetHeaderActions
 * ----------------
 */
type EnhancedChild = React.ReactElement<{ id: string; menuItemLabel: string }>;
export interface TearsheetHeaderActionsProps {
  /**
   * Provide child elements to be rendered inside TearsheetHeaderActions.
   */
  children: EnhancedChild[];
  /**
   * Specify an optional className to be added to your TearsheetHeaderActions
   */
  className?: string;
  /**
   * The PageHeaderContent's page actions collapsible Menu button label
   */
  menuButtonProps?: MenuButtonProps;
}
export const TearsheetHeaderActions = forwardRef<
  HTMLDivElement,
  TearsheetHeaderActionsProps
>(({ className, children, menuButtonProps }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef<HTMLDivElement>(null);
  const menuButtonContainerRef = useRef<HTMLDivElement>(null);
  const [menuButtonVisibility, setMenuButtonVisibility] = useState(false);
  const [hiddenItems, setHiddenItems] = useState<ReactElement[]>([]);

  const hasOtherChildType = useRef(false);

  // need to set the grid columns width based on the menu button's width
  // to avoid overlapping when resizing
  useIsomorphicEffect(() => {
    if (menuButtonVisibility && offsetRef.current) {
      const width = offsetRef.current.offsetWidth;
      document.documentElement.style.setProperty(
        '--tearsheet-header-title-grid-width',
        `${width}px`
      );
    }
  }, [menuButtonVisibility]);

  const items = React.Children.toArray(children).filter((child) => {
    if (
      React.isValidElement(child) &&
      child.type !== TearsheetHeaderActionItem
    ) {
      hasOtherChildType.current = true;
    }
    return React.isValidElement(child);
  });
  useIsomorphicEffect(() => {
    //Menu button will be rendered only if they pass the items in TearsheetHeaderActionItem
    if (!containerRef.current || hasOtherChildType.current) {
      return;
    }
    createOverflowHandler({
      container: containerRef.current,
      onChange: (visible, hidden) => {
        setHiddenItems(items?.slice(visible.length));
        if (hidden.length > 0) {
          setMenuButtonVisibility(true);
        }
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef.current]);

  return (
    <div
      className={`${blockClass}__content__header-actions  ${className}`}
      ref={containerRef}
    >
      {children}

      {!hasOtherChildType.current && (
        <span
          data-offset
          data-hidden
          ref={offsetRef}
          className={cx(`${blockClass}__header-actions-menuButton`, {
            [`${blockClass}__header-actions-menuButton--hidden`]:
              hiddenItems.length === 0,
          })}
        >
          <MenuButton
            ref={menuButtonContainerRef}
            size="sm"
            {...menuButtonProps}
          >
            {hiddenItems.map((item) => {
              if (!React.isValidElement(item)) {
                return null;
              }

              const childProps = item.props as {
                id: string;
                overflowItemLabel: string;
                children?: {
                  props?: {
                    renderIcon?: React.ReactNode;
                    onClick?: () => void;
                  };
                };
              };
              return (
                <MenuItem
                  renderIcon={
                    childProps?.children?.props?.renderIcon ?? undefined
                  }
                  key={childProps.id}
                  onClick={childProps?.children?.props?.onClick}
                  label={childProps.overflowItemLabel}
                />
              );
            })}
          </MenuButton>
        </span>
      )}
    </div>
  );
});

TearsheetHeaderActions.displayName = 'TearsheetHeaderActions';

/**
 * ----------------
 * TearsheetHeaderActionsItem
 * ----------------
 */

export interface TearsheetHeaderActionItemProps {
  /**
   * Provide child elements to be rendered inside TearsheetHeaderActions.
   */
  children: ReactNode;
  /**
   * Specify an optional className to be added to your TearsheetHeaderActions
   */
  className?: string;
  /**
   * The PageHeaderContent's page actions collapsible Menu button label
   */
  overflowItemLabel?: string;

  id?: string;
}
export const TearsheetHeaderActionItem = ({
  children,
  className,
}: TearsheetHeaderActionItemProps) => {
  return (
    <div className={`${blockClass}__header-action-item  ${className}`}>
      {children}
    </div>
  );
};
