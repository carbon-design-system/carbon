/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const tab = (
  <li className={`${prefix}--tabs--scrollable__nav-item`}>
    <div className={`${prefix}--tabs__nav-link`}>
      <span></span>
    </div>
  </li>
);

function TabsSkeleton({ className, type, ...rest }) {
  const tabClasses = cx(
    className,
    `${prefix}--tabs`,
    `${prefix}--skeleton`,
    `${prefix}--tabs--scrollable`,
    {
      [`${prefix}--tabs--scrollable--container`]: type === 'container',
    }
  );
  return (
    <div className={tabClasses} {...rest}>
      <ul className={`${prefix}--tabs--scrollable__nav`}>
        {tab}
        {tab}
        {tab}
        {tab}
        {tab}
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
  type: PropTypes.oneOf(['', 'default', 'container']),
};

export default TabsSkeleton;
