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

function Item() {
  const prefix = usePrefix();

  return (
    <div className={`${prefix}--breadcrumb-item`}>
      <span className={`${prefix}--link`}>&nbsp;</span>
    </div>
  );
}

function BreadcrumbSkeleton({ className, ...rest }) {
  const prefix = usePrefix();
  const classes = cx(`${prefix}--breadcrumb`, `${prefix}--skeleton`, className);

  return (
    <div className={classes} {...rest}>
      <Item />
      <Item />
      <Item />
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
