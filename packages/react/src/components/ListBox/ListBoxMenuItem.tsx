/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React, { ForwardedRef, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { usePrefix } from '../../internal/usePrefix';
import { ForwardRefReturn, ReactAttr } from '../../types/common';

function useIsTruncated(ref) {
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    const { offsetWidth, scrollWidth } =
      element.lastElementChild?.lastElementChild || element;
    setIsTruncated(offsetWidth < scrollWidth);
  }, [ref, setIsTruncated]);

  return isTruncated;
}

export interface ListBoxMenuItemProps extends ReactAttr<HTMLLIElement> {
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
    { children, isActive, isHighlighted, title, ...rest }: ListBoxMenuItemProps,
    forwardedRef: ListBoxMenuItemForwardedRef
  ) {
    const prefix = usePrefix();
    const ref = useRef(null);
    const isTruncated = useIsTruncated(forwardedRef?.menuItemOptionRef || ref);
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
          ref={forwardedRef?.menuItemOptionRef || ref}>
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
  isActive: PropTypes.bool.isRequired,

  /**
   * Specify whether the current menu item is "highlighted".
   */
  isHighlighted: PropTypes.bool.isRequired,

  /**
   * Provide an optional tooltip for the ListBoxMenuItem
   */
  title: PropTypes.string,
};

ListBoxMenuItem.defaultProps = {
  isActive: false,
  isHighlighted: false,
};

export default ListBoxMenuItem as ListBoxMenuItemComponent;
