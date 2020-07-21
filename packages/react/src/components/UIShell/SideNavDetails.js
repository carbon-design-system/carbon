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

const { prefix } = settings;

const SideNavDetails = ({ children, className: customClassName, title }) => {
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
   * Optionally provide a custom class to apply to the underlying <li> node
   */
  className: PropTypes.string,

  /**
   * Provide optional children to render in `SideNavDetails`. Useful for
   * rendering the `SideNavSwitcher` component.
   */
  children: PropTypes.node,

  /**
   * Provide the text that will be rendered as the title in the component
   */
  title: PropTypes.string.isRequired,
};

export default SideNavDetails;
