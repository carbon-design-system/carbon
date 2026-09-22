/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { HTMLAttributes } from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

export interface NumberInputSkeletonProps
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * Specify an optional className to add to the form item wrapper.
   */
  className?: string;

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel?: boolean;

  /**
   * Specify the size of the Number Input.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';
}
function NumberInputSkeleton({
  hideLabel,
  className,
  size,
  ...rest
}: NumberInputSkeletonProps) {
  const prefix = usePrefix();
  return (
    <div className={cx(`${prefix}--form-item`, className)} {...rest}>
      {!hideLabel && (
        <span className={`${prefix}--label ${prefix}--skeleton`} />
      )}
      <div
        className={cx(`${prefix}--number`, `${prefix}--skeleton`, {
          // TODO: V12 - Remove `${prefix}--number--${size}` class
          [`${prefix}--number--${size}`]: size,
          [`${prefix}--layout--size-${size}`]: size,
        })}
      />
    </div>
  );
}

NumberInputSkeleton.propTypes = {
  /**
   * Specify an optional className to add to the form item wrapper.
   */
  className: PropTypes.string,

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,

  /**
   * Specify the size of the Number Input.
   */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
};

export default NumberInputSkeleton;
