/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import PropTypes from 'prop-types';
import { usePrefix } from '../../internal/usePrefix';

/**
 * Determines if the content of an element is truncated.
 *
 * Measures the element's dimensions with a local ref.
 *
 * @param deps - Dependencies that trigger a new truncation measurement.
 * @returns An object containing the truncation state and local ref.
 */
const useIsTruncated = (deps: unknown[] = []) => {
  const localRef = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const element = localRef.current;

    if (element) {
      const { offsetWidth, scrollWidth } = element;

      setIsTruncated(offsetWidth < scrollWidth);
    }
    // eslint-disable-next-line  react-hooks/exhaustive-deps -- https://github.com/carbon-design-system/carbon/issues/20452
  }, [localRef, ...deps]);

  return { isTruncated, ref: localRef };
};

export interface ListBoxMenuItemProps extends HTMLAttributes<HTMLLIElement> {
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

    const { isTruncated, ref: menuItemOptionRef } = useIsTruncated([children]);
    const className = cx(`${prefix}--list-box__menu-item`, {
      [`${prefix}--list-box__menu-item--active`]: isActive,
      [`${prefix}--list-box__menu-item--highlighted`]: isHighlighted,
    });

    return (
      <li
        {...rest}
        ref={forwardedRef}
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
