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

const SideNavDetails = ({ children, className: customClassName, title }) => {
  const prefix = usePrefix();
  const className = cx(`${prefix}--side-nav__details`, customClassName);
  return (
    <div className={className}>
      <h2 className={`${prefix}--side-nav__title`} title={title}>
        {title}
      </h2>
      {children}
    </div>
  );
};

SideNavDetails.propTypes = {
  /**
   * Provide optional children to render in `SideNavDetails`. Useful for
   * rendering the `SideNavSwitcher` component.
   */
  children: PropTypes.node,

  /**
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  className: PropTypes.string,

  /**
   * Provide the text that will be rendered as the title in the component
   */
  title: PropTypes.string.isRequired,
};

export default SideNavDetails;
