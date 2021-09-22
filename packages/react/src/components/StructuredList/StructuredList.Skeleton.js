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

const StructuredListSkeleton = ({ rowCount, border, className, ...rest }) => {
  const prefix = usePrefix();
  const StructuredListSkeletonClasses = cx(className, {
    [`${prefix}--skeleton`]: true,
    [`${prefix}--structured-list`]: true,
    [`${prefix}--structured-list--border`]: border,
  });

  const rows = [];
  for (var i = 0; i < rowCount; i++) {
    rows.push(
      <div className={`${prefix}--structured-list-row`} key={i}>
        <div className={`${prefix}--structured-list-td`} />
        <div className={`${prefix}--structured-list-td`} />
        <div className={`${prefix}--structured-list-td`} />
      </div>
    );
  }

  return (
    <div className={StructuredListSkeletonClasses} {...rest}>
      <div className={`${prefix}--structured-list-thead`}>
        <div
          className={`${prefix}--structured-list-row ${prefix}--structured-list-row--header-row`}>
          <div className={`${prefix}--structured-list-th`}>
            <span />
          </div>
          <div className={`${prefix}--structured-list-th`}>
            <span />
          </div>
          <div className={`${prefix}--structured-list-th`}>
            <span />
          </div>
        </div>
      </div>
      <div className={`${prefix}--structured-list-tbody`}>{rows}</div>
    </div>
  );
};

StructuredListSkeleton.propTypes = {
  /**
   * Specify whether a border should be added to your StructuredListSkeleton
   */
  border: PropTypes.bool,

  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * number of table rows
   */
  rowCount: PropTypes.number,
};

StructuredListSkeleton.defaultProps = {
  rowCount: 5,
  border: false,
};

export default StructuredListSkeleton;
