/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import SkeletonText from '../SkeletonText';
import { usePrefix } from '../../internal/usePrefix';

function PaginationSkeleton({ className, ...rest }) {
  const prefix = usePrefix();
  return (
    <div
      className={cx(`${prefix}--pagination`, `${prefix}--skeleton`, className)}
      {...rest}>
      <div className={`${prefix}--pagination__left`}>
        <SkeletonText width="70px" />
        <SkeletonText width="35px" />
        <SkeletonText width="105px" />
      </div>
      <div
        className={`${prefix}--pagination__right ${prefix}--pagination--inline`}>
        <SkeletonText width="70px" />
      </div>
    </div>
  );
}

PaginationSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,
};

export default PaginationSkeleton;
export { PaginationSkeleton };
