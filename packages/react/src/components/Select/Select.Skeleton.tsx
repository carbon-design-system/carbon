/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { HTMLAttributes } from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

export interface SelectSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Specify an optional className to add to the form item wrapper.
   */
  className?: string;

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel?: boolean;
}

const SelectSkeleton = ({
  hideLabel,
  className,
  ...rest
}: SelectSkeletonProps) => {
  const prefix = usePrefix();
  return (
    <div className={cx(`${prefix}--form-item`, className)} {...rest}>
      {!hideLabel && (
        <span className={`${prefix}--label ${prefix}--skeleton`} />
      )}
      <div className={`${prefix}--select ${prefix}--skeleton`}>
        <div className={`${prefix}--select-input`} />
      </div>
    </div>
  );
};

SelectSkeleton.propTypes = {
  /**
   * Specify an optional className to add to the form item wrapper.
   */
  className: PropTypes.string,

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,
};

export default SelectSkeleton;
export { SelectSkeleton };
