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
    const { offsetWidth, scrollWidth } = ref.current;
    setIsTruncated(offsetWidth < scrollWidth);
  }, [ref, setIsTruncated]);

  return isTruncated;
}

export interface ListBoxMenuItemProps extends ReactAttr<HTMLDivElement> {
  /**
   * Specify whether the current menu item is "active".
   */
  isActive?: boolean;

  /**
   * Specify whether the current menu item is "highlighted".
   */
  isHighlighted?: boolean;
}

export type ListBoxMenuItemForwardedRef =
  | (ForwardedRef<HTMLDivElement> & {
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
const ListBoxMenuItem = React.forwardRef<HTMLDivElement, ListBoxMenuItemProps>(
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
      <div
        {...rest}
        className={className}
        title={isTruncated ? title : undefined}
        tabIndex={-1}>
        <div
          className={`${prefix}--list-box__menu-item__option`}
          ref={forwardedRef?.menuItemOptionRef || ref}>
          {children}
        </div>
      </div>
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
