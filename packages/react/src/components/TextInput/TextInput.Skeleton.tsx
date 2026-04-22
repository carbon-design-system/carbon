/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

export interface TextInputSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Specify an optional className to add to the form item wrapper.
   */
  className?: string;

  /**
   * Specify whether the label should be hidden or not.
   */
  hideLabel?: boolean;

  /**
   * Specify the size of the TextInputSkeleton
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const TextInputSkeleton = ({
  hideLabel,
  className,
  size,
  ...rest
}: TextInputSkeletonProps) => {
  const prefix = usePrefix();
  return (
    <div
      className={cx(`${prefix}--form-item`, className, {
        [`${prefix}--layout--size-${size}`]: size,
      })}
      {...rest}>
      {!hideLabel && (
        <span className={`${prefix}--label ${prefix}--skeleton`} />
      )}
      <div className={`${prefix}--skeleton ${prefix}--text-input`} />
    </div>
  );
};

TextInputSkeleton.propTypes = {
  /**
   * Specify an optional className to add to the form item wrapper.
   */
  className: PropTypes.string,

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,

  /**
   * Specify the size of the TextInputSkeleton
   */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
};

export default TextInputSkeleton;
export { TextInputSkeleton };
