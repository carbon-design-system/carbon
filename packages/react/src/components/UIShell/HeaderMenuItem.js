/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import Link, { LinkPropTypes } from './Link';
import { usePrefix } from '../../internal/usePrefix';

const HeaderMenuItem = React.forwardRef(function HeaderMenuItem(
  {
    className,
    isCurrentPage,
    'aria-current': ariaCurrent,
    children,
    role,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();
  const linkClassName = cx({
    [`${prefix}--header__menu-item`]: true,
    // We set the current class only if `isCurrentPage` is passed in and we do
    // not have an `aria-current="page"` set for the breadcrumb item
    [`${prefix}--header__menu-item--current`]:
      isCurrentPage && ariaCurrent !== 'page',
  });

  return (
    <li className={className} role={role}>
      <Link
        {...rest}
        aria-current={ariaCurrent}
        className={linkClassName}
        ref={ref}
        tabIndex={0}>
        <span className={`${prefix}--text-truncate--end`}>{children}</span>
      </Link>
    </li>
  );
});

HeaderMenuItem.displayName = 'HeaderMenuItem';
HeaderMenuItem.propTypes = {
  /**
   * Pass in a valid `element` to replace the underlying `<a>` tag with a
   * custom `Link` element
   */
  ...LinkPropTypes,

  /**
   * Pass in children that are either a string or can be read as a string by
   * screen readers
   */
  children: PropTypes.node.isRequired,

  /**
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  className: PropTypes.string,

  /**
   * Applies selected styles to the item if a user sets this to true and aria-current !== 'page'.
   */
  isCurrentPage: PropTypes.bool,

  /**
   * Optionally supply a role for the underlying `<li>` node. Useful for resetting
   * `<ul>` semantics for menus.
   */
  role: PropTypes.string,
};

export default HeaderMenuItem;
