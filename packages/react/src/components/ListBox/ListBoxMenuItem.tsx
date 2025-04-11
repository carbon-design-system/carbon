/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React, {
  forwardRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type Ref,
} from 'react';
import PropTypes from 'prop-types';
import { usePrefix } from '../../internal/usePrefix';
import { ReactAttr } from '../../types/common';
import { useMergedRefs } from '../../internal/useMergedRefs';

/**
 * Determines if the content of an element is truncated.
 *
 * Merges a forwarded ref with a local ref to check the element's dimensions.
 *
 * @template T
 * @param forwardedRef - A ref passed from the parent component.
 * @param deps - Dependencies to re-run the truncation check.
 * @returns An object containing the truncation state and the merged ref.
 */
const useIsTruncated = <T extends HTMLElement>(
  forwardedRef?: Ref<T>,
  deps: any[] = []
) => {
  const localRef = useRef<T>(null);
  const mergedRef = useMergedRefs([
    ...(forwardedRef ? [forwardedRef] : []),
    localRef,
  ]);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const element = localRef.current;

    if (element) {
      const { offsetWidth, scrollWidth } = element;

      setIsTruncated(offsetWidth < scrollWidth);
    }
  }, [localRef, ...deps]);

  return { isTruncated, ref: mergedRef };
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

/**
 * `ListBoxMenuItem` is a helper component for managing the container class
 * name, alongside any classes for any corresponding states, for a generic list
 * box menu item.
 */
const ListBoxMenuItem = forwardRef<HTMLLIElement, ListBoxMenuItemProps>(
  (
    { children, isActive = false, isHighlighted = false, title, ...rest },
    forwardedRef
  ) => {
    const prefix = usePrefix();

    const menuItemOptionRefProp =
      forwardedRef && typeof forwardedRef !== 'function'
        ? (
            forwardedRef as MutableRefObject<HTMLLIElement | null> & {
              menuItemOptionRef?: Ref<HTMLDivElement>;
            }
          ).menuItemOptionRef
        : undefined;

    const { isTruncated, ref: menuItemOptionRef } = useIsTruncated(
      menuItemOptionRefProp,
      [children]
    );
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

export default ListBoxMenuItem;
