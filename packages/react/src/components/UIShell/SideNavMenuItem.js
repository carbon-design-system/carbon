/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import SideNavLinkText from './SideNavLinkText';
import Link from './Link';

const { prefix } = settings;

const SideNavMenuItem = React.forwardRef(function SideNavMenuItem(props, ref) {
  const { children, className: customClassName, isActive, ...rest } = props;
  const className = cx(`${prefix}--side-nav__menu-item`, customClassName);
  const linkClassName = cx({
    [`${prefix}--side-nav__link`]: true,
    [`${prefix}--side-nav__link--current`]: isActive,
  });

  return (
    <li className={className} role="none">
      <Link {...rest} className={linkClassName} role="menuitem" ref={ref}>
        <SideNavLinkText>{children}</SideNavLinkText>
      </Link>
    </li>
  );
});

SideNavMenuItem.propTypes = {
  /**
   * Specify the childrento be rendered inside of the `SideNavMenuItem`
   */
  children: PropTypes.node,

  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Optionally specify whether the link is "active". An active link is one that
   * has an href that is the same as the current page. Can also pass in
   * `aria-current="page"`, as well.
   */
  isActive: PropTypes.bool,
};

export default SideNavMenuItem;
