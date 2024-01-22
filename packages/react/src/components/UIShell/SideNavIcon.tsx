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

interface SideNavIconProps {
  /**
   * Provide a single icon as the child to `SideNavIcon` to render in the
   * container
   */
  children: React.ReactNode;

  /**
   * Provide an optional class to be applied to the containing node
   */
  className?: string;

  /**
   * Specify whether the icon should be placed in a smaller bounding box
   * Since the 'small' prop is not provided, we make it optional and set a default value to `false`.
   */
  small?: boolean;
}

const SideNavIcon: React.FC<SideNavIconProps> = ({
  children,
  className: customClassName,
  small = false,
}) => {
  const prefix = usePrefix();
  const className = cx({
    [`${prefix}--side-nav__icon`]: true,
    [`${prefix}--side-nav__icon--small`]: small,
    [customClassName as string]: !!customClassName,
  });
  return <div className={className}>{children}</div>;
};

SideNavIcon.propTypes = {
  /**
   * Provide a single icon as the child to `SideNavIcon` to render in the
   * container
   */
  children: PropTypes.node.isRequired,

  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Specify whether the icon should be placed in a smaller bounding box
   */
  small: PropTypes.bool,
};

export default SideNavIcon;
