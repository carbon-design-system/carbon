/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { usePrefix } from '../../internal/usePrefix';

const SideNavIcon = ({ children, className: customClassName, small }) => {
  const prefix = usePrefix();
  const className = cx({
    [`${prefix}--side-nav__icon`]: true,
    [`${prefix}--side-nav__icon--small`]: small,
    [customClassName]: !!customClassName,
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
  small: PropTypes.bool.isRequired,
};

SideNavIcon.defaultProps = {
  small: false,
};

export default SideNavIcon;
