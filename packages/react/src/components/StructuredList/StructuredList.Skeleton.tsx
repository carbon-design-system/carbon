/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

export interface StructuredListSkeletonProps {
  /**
   * Specify an optional className to add.
   */
  className?: string;

  /**
   * number of table rows
   */
  rowCount?: number;
}

export default function StructuredListSkeleton({
  rowCount = 5,
  className,
  ...rest
}: StructuredListSkeletonProps) {
  const prefix = usePrefix();
  const classNames = cx(
    `${prefix}--skeleton`,
    `${prefix}--structured-list`,
    className
  );

  const rows = new Array(rowCount).fill(null).map((_, i) => (
    <div className={`${prefix}--structured-list-row`} key={i}>
      <div className={`${prefix}--structured-list-td`} />
      <div className={`${prefix}--structured-list-td`} />
      <div className={`${prefix}--structured-list-td`} />
    </div>
  ));

  return (
    <div className={classNames} {...rest}>
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
}

StructuredListSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * number of table rows
   */
  rowCount: PropTypes.number,
};
