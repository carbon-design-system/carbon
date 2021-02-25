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

const TabContent = (props) => {
  const {
    className,
    selected,
    children,
    hasNoFocusableContent,
    ...other
  } = props;
  const tabContentClasses = classNames(`${prefix}--tab-content`, {
    [className]: className,
  });
  return (
    <div
      role="tabpanel"
      {...other}
      className={tabContentClasses}
      selected={selected}
      hidden={!selected}
      tabIndex={hasNoFocusableContent ? 0 : undefined}>
      {children}
    </div>
  );
};

TabContent.propTypes = {
  /**
   * Pass in content to render inside of the TabContent
   */
  children: PropTypes.node,

  /**
   * Provide a className for the tab content container
   */
  className: PropTypes.string,

  /**
   * Specify if the tab content does not contain focusable content. The tabpanel instead will be included in the focusable dom order.
   */
  hasNoFocusableContent: PropTypes.bool,

  /**
   * Specify whether the TabContent is selected
   */
  selected: PropTypes.bool,
};

TabContent.defaultProps = {
  selected: false,
};

export default TabContent;
