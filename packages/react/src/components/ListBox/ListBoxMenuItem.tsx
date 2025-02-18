/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React, {
  ForwardedRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';
import PropTypes from 'prop-types';
import { usePrefix } from '../../internal/usePrefix';
import { ForwardRefReturn, ReactAttr } from '../../types/common';

const useIsTruncated = <T extends HTMLElement>(
  ref: RefObject<T>,
  deps: any[] = []
) => {
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (element) {
      setIsTruncated(element.offsetWidth < element.scrollWidth);
    }
  }, [ref, ...deps]);

  return isTruncated;
};

export interface ListBoxMenuItemProps extends ReactAttr<HTMLLIElement> {
  /**
   * Specify any children nodes that should be rendered inside of the ListBox
   * Menu Item
   */
  children?: ReactNode;
  /**
   * Specify whether the current menu item is "active".
   */
  isActive?: boolean;

  /**
   * Specify whether the current menu item is "highlighted".
   */
  isHighlighted?: boolean;

  /**
   * Specify whether the item should be disabled
   */
  disabled?: boolean;

  /**
   * Provide an optional tooltip for the ListBoxMenuItem
   */
  title?: string;
}

export type ListBoxMenuItemForwardedRef =
  | (ForwardedRef<HTMLLIElement> & {
      menuItemOptionRef?: React.Ref<HTMLDivElement>;
    })
  | null;

export type ListBoxMenuItemComponent = ForwardRefReturn<
  ListBoxMenuItemForwardedRef,
  ListBoxMenuItemProps
>;

/**
 * `ListBoxMenuItem` is a helper component for managing the container class
 * name, alongside any classes for any corresponding states, for a generic list
 * box menu item.
 */
const ListBoxMenuItem = React.forwardRef<HTMLLIElement, ListBoxMenuItemProps>(
  function ListBoxMenuItem(
    { children, isActive = false, isHighlighted = false, title, ...rest },
    forwardedRef: ListBoxMenuItemForwardedRef
  ) {
    const prefix = usePrefix();
    const localRef = useRef<HTMLDivElement>(null);

    // Try to get a RefObject from `forwardedRef.menuItemOptionRef`.
    // If it's a callback ref (or not provided), fall back to `localRef`.
    let menuItemOptionRef: React.RefObject<HTMLDivElement> = localRef;
    if (
      forwardedRef &&
      typeof forwardedRef !== 'function' &&
      forwardedRef.menuItemOptionRef
    ) {
      const candidate = forwardedRef.menuItemOptionRef;
      if (typeof candidate !== 'function') {
        menuItemOptionRef = candidate;
      }
    }

    const isTruncated = useIsTruncated(menuItemOptionRef, [children]);
    const className = cx(`${prefix}--list-box__menu-item`, {
      [`${prefix}--list-box__menu-item--active`]: isActive,
      [`${prefix}--list-box__menu-item--highlighted`]: isHighlighted,
    });

    return (
      <li
        {...rest}
        className={className}
        title={isTruncated ? title : undefined}>
        <div
          className={`${prefix}--list-box__menu-item__option`}
          ref={menuItemOptionRef}>
          {children}
        </div>
      </li>
    );
  }
);

ListBoxMenuItem.displayName = 'ListBoxMenuItem';
ListBoxMenuItem.propTypes = {
  /**
   * Specify any children nodes that should be rendered inside of the ListBox
   * Menu Item
   */
  children: PropTypes.node,

  /**
   * Specify if the item should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify whether the current menu item is "active".
   */
  isActive: PropTypes.bool,

  /**
   * Specify whether the current menu item is "highlighted".
   */
  isHighlighted: PropTypes.bool,

  /**
   * Provide an optional tooltip for the ListBoxMenuItem
   */
  title: PropTypes.string,
};

export default ListBoxMenuItem as ListBoxMenuItemComponent;
