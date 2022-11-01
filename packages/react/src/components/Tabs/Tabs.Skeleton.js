/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

function Tab() {
  const prefix = usePrefix();
  return (
    <li className={`${prefix}--tabs__nav-item`}>
      <div className={`${prefix}--tabs__nav-link`}>
        <span></span>
      </div>
    </li>
  );
}

function TabsSkeleton({ className, contained, ...rest }) {
  const prefix = usePrefix();
  const tabClasses = cx(className, `${prefix}--tabs`, `${prefix}--skeleton`, {
    [`${prefix}--tabs--contained`]: contained,
  });
  return (
    <div className={tabClasses} {...rest}>
      <ul className={`${prefix}--tabs__nav`}>
        {Tab()}
        {Tab()}
        {Tab()}
        {Tab()}
        {Tab()}
      </ul>
    </div>
  );
}

TabsSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * Provide the type of Tab
   */
  contained: PropTypes.bool,
};

export default TabsSkeleton;
