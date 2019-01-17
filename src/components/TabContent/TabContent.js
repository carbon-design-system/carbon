/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';

const TabContent = props => {
  const { selected, children, ...other } = props;

  return (
    <div {...other} selected={selected} hidden={!selected}>
      {children}
    </div>
  );
};

TabContent.propTypes = {
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
