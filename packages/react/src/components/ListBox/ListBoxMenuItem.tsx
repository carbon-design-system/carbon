/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React, {
  ForwardedRef,
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
import { ForwardRefReturn, ReactAttr } from '../../types/common';

/**
 * Combines multiple refs (forwarded and local) into a single ref.
 *
 * @template T
 * @param - One or more refs to combine.
 * @returns A combined ref that points to the same node.
 */
const useCombinedRefs = <T,>(...refs: (Ref<T> | undefined)[]) => {
  const targetRef = useRef<T>(null);

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        (ref as MutableRefObject<T | null>).current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
};

/**
 * Determines if the content of an element is truncated.
 *
 * This hook combines the forwarded ref with a local ref so that there's always
 * a valid ref to inspect. It then checks if the element's content is truncated
 * by comparing its `offsetWidth` with its `scrollWidth`.
 *
 * @template T
 * @param - A forwarded ref to an HTML element.
 * @param - Dependency array to re-run the truncation check.
 * @returns An object containing the truncation state and the combined ref.
 */
const useIsTruncated = <T extends HTMLElement>(
  forwardedRef?: Ref<T>,
  deps: any[] = []
) => {
  const ref = useCombinedRefs(forwardedRef);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (element) {
      const { offsetWidth, scrollWidth } = element;

      setIsTruncated(offsetWidth < scrollWidth);
    }
  }, [ref, ...deps]);

  return { isTruncated, ref };
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
      menuItemOptionRef?: Ref<HTMLDivElement>;
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

export default ListBoxMenuItem as ListBoxMenuItemComponent;
