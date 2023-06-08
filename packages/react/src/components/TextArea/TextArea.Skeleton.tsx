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

export interface TextAreaSkeletonProps
  extends React.InputHTMLAttributes<HTMLDivElement> {
  /**
   * Specify an optional className to add to the form item wrapper.
   */
  className?: string;

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel?: boolean;
}
const TextAreaSkeleton = (props: TextAreaSkeletonProps) => {
  const { className, hideLabel, ...rest } = props;
  const prefix = usePrefix();
  return (
    <div className={cx(`${prefix}--form-item`, className)} {...rest}>
      {!hideLabel && (
        <span className={`${prefix}--label ${prefix}--skeleton`} />
      )}
      <div className={`${prefix}--skeleton ${prefix}--text-area`} />
    </div>
  );
};

TextAreaSkeleton.propTypes = {
  /**
   * Specify an optional className to add to the form item wrapper.
   */
  className: PropTypes.string,

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,
};

export default TextAreaSkeleton;
export { TextAreaSkeleton };
