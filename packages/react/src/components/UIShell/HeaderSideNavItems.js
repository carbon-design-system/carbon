/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { usePrefix } from '../../internal/usePrefix';

const HeaderSideNavItems = ({
  className: customClassName,
  children,
  hasDivider,
}) => {
  const prefix = usePrefix();
  const className = cx(
    {
      [`${prefix}--side-nav__header-navigation`]: true,
      [`${prefix}--side-nav__header-divider`]: hasDivider,
    },
    customClassName
  );
  return <div className={className}>{children}</div>;
};

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

HeaderSideNavItems.defaultProps = {
  hasDivider: false,
};

export default HeaderSideNavItems;
