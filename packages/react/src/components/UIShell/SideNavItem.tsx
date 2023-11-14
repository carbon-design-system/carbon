/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { usePrefix } from '../../internal/usePrefix';

interface SideNavItemProps {
  /**
   * Provide a single icon as the child to `SideNavItem` to render in the
   * container
   */
  children: React.ReactNode;

  /**
   * Provide an optional class to be applied to the containing node
   */
  className?: string;

  /**
   * Specify if this is a large variation of the SideNavItem
   */
  large?: boolean;
}

const SideNavItem: React.FC<SideNavItemProps> = ({
  className: customClassName,
  children,
  large = false,
}: SideNavItemProps) => {
  const prefix = usePrefix();
  const className = cx({
    [`${prefix}--side-nav__item`]: true,
    [`${prefix}--side-nav__item--large`]: large,
    [customClassName as string]: !!customClassName,
  });
  return <li className={className}>{children}</li>;
};

SideNavItem.propTypes = {
  /**
   * Provide a single icon as the child to `SideNavItem` to render in the
   * container
   */
  children: PropTypes.node.isRequired,

  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Specify if this is a large variation of the SideNavItem
   */
  large: PropTypes.bool,
};

export default SideNavItem;
