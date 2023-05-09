/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React, { type ReactNode } from 'react';
import PropTypes from 'prop-types';
import { usePrefix } from '../../internal/usePrefix';

interface HeaderSideNavItemsProps {
  className?: string | undefined;
  children?: ReactNode;
  hasDivider?: boolean | undefined;
}

export default function HeaderSideNavItems({
  className: customClassName,
  children,
  hasDivider = false,
}: HeaderSideNavItemsProps) {
  const prefix = usePrefix();
  const className = cx(
    {
      [`${prefix}--side-nav__header-navigation`]: true,
      [`${prefix}--side-nav__header-divider`]: hasDivider,
    },
    customClassName
  );
  return <ul className={className}>{children}</ul>;
}

HeaderSideNavItems.propTypes = {
  /**
   * The child nodes to be rendered
   */
  children: PropTypes.node,

  /**
   * Optionally provide a custom class name that is applied to the underlying
   * button
   */
  className: PropTypes.string,

  /**
   * Optionally specify if container will have a bottom divider to differentiate
   * between original sidenav items and header menu items. False by default.
   */
  hasDivider: PropTypes.bool,
};
