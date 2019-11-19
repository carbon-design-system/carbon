/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const TabContent = props => {
  const { className, selected, children, ...other } = props;
  const tabContentClasses = classNames(`${prefix}--tab-content`, {
    [className]: className,
  });
  return (
    <div
      {...other}
      className={tabContentClasses}
      selected={selected}
      hidden={!selected}>
      {children}
    </div>
  );
};

TabContent.propTypes = {
  /**
   * Provide a className for the tab content container
   */
  className: PropTypes.string,

  /**
   * Specify whether the TabContent is selected
   */
  selected: PropTypes.bool,

  /**
   * Pass in content to render inside of the TabContent
   */
  children: PropTypes.node,
};

TabContent.defaultProps = {
  selected: false,
};

export default TabContent;
