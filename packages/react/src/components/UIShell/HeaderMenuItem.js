/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import PropTypes from 'prop-types';
import React from 'react';
import Link, { LinkPropTypes } from './Link';

const { prefix } = settings;

const HeaderMenuItem = React.forwardRef(function HeaderMenuItem(
  { className, children, role, ...rest },
  ref
) {
  return (
    <li className={className} role={role}>
      <Link
        {...rest}
        className={`${prefix}--header__menu-item`}
        ref={ref}
        role="menuitem"
        tabIndex={0}>
        <span className={`${prefix}--text-truncate--end`}>{children}</span>
      </Link>
    </li>
  );
});

HeaderMenuItem.propTypes = {
  /**
   * Pass in a valid `element` to replace the underlying `<a>` tag with a
   * custom `Link` element
   */
  ...LinkPropTypes,

  /**
   * Optionally provide a custom class to apply to the underlying <li> node
   */
  className: PropTypes.string,

  /**
   * Pass in children that are either a string or can be read as a string by
   * screen readers
   */
  children: PropTypes.node.isRequired,

  /**
   * Optionally supply a role for the underlying <li> node. Useful for resetting
   * <ul> semantics for menus.
   */
  role: PropTypes.string,
};

export default HeaderMenuItem;
