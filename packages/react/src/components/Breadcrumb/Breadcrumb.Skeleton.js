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

const item = (
  <div className={`${prefix}--breadcrumb-item`}>
    <span className={`${prefix}--link`}>&nbsp;</span>
  </div>
);

function BreadcrumbSkeleton({ className: customClassName, ...rest }) {
  const className = cx(
    `${prefix}--breadcrumb`,
    `${prefix}--skeleton`,
    customClassName
  );

  return (
    <div className={className} {...rest}>
      {item}
      {item}
      {item}
    </div>
  );
}

BreadcrumbSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,
};

export default BreadcrumbSkeleton;
