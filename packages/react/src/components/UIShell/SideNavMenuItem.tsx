/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { ElementType, ForwardedRef, HTMLAttributes, Ref } from 'react';
import SideNavLinkText from './SideNavLinkText';
import Link from './Link';
import { usePrefix } from '../../internal/usePrefix';

interface SideNavMenuItemProps extends HTMLAttributes<HTMLElement> {
  /**
   * Specify the children to be rendered inside of the `SideNavMenuItem`
   */
  children?: React.ReactNode;

  /**
   * Provide an optional class to be applied to the containing node
   */
  className?: string;

  /**
   * Optionally specify whether the link is "active". An active link is one that
   * has an href that is the same as the current page. Can also pass in
   * `aria-current="page"`, as well.
   */
  isActive?: boolean;

  /**
   * Optionally provide an href for the underlying li`
   */
  href?: string;
}

const SideNavMenuItem = React.forwardRef<HTMLElement, SideNavMenuItemProps>(
  function SideNavMenuItem(props, ref: ForwardedRef<HTMLElement>) {
    const prefix = usePrefix();
    const {
      children,
      className: customClassName,
      isActive,
      href,
      ...rest
    } = props;
    const className = cx(`${prefix}--side-nav__menu-item`, customClassName);
    const linkClassName = cx({
      [`${prefix}--side-nav__link`]: true,
      [`${prefix}--side-nav__link--current`]: isActive,
    });

    return (
      <li className={className}>
        <Link
          href={href}
          {...rest}
          className={linkClassName}
          ref={ref as Ref<ElementType>}>
          <SideNavLinkText>{children}</SideNavLinkText>
        </Link>
      </li>
    );
  }
);

SideNavMenuItem.displayName = 'SideNavMenuItem';
SideNavMenuItem.propTypes = {
  /**
   * Specify the children to be rendered inside of the `SideNavMenuItem`
   */
  children: PropTypes.node,

  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Optionally provide an href for the underlying li`
   */
  href: PropTypes.string,

  /**
   * Optionally specify whether the link is "active". An active link is one that
   * has an href that is the same as the current page. Can also pass in
   * `aria-current="page"`, as well.
   */
  isActive: PropTypes.bool,
};

export default SideNavMenuItem;
