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
import classNames from 'classnames';

export interface SliderSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Specify an optional className to add to the form item wrapper.
   */
  className?: string;

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel?: boolean;

  /**
   * Turn the slider into a range slider.
   */
  twoHandles?: boolean;
}

const SliderSkeleton = ({
  hideLabel,
  className,
  twoHandles,
  ...rest
}: SliderSkeletonProps) => {
  const prefix = usePrefix();
  const containerClasses = classNames(
    `${prefix}--slider-container`,
    `${prefix}--skeleton`,
    {
      [`${prefix}--slider-container--two-handles`]: twoHandles,
    }
  );
  const lowerThumbClasses = classNames(`${prefix}--slider__thumb`, {
    [`${prefix}--slider__thumb--lower`]: twoHandles,
  });
  const upperThumbClasses = classNames(`${prefix}--slider__thumb`, {
    [`${prefix}--slider__thumb--upper`]: twoHandles,
  });
  return (
    <div className={cx(`${prefix}--form-item`, className)} {...rest}>
      {!hideLabel && (
        <span className={`${prefix}--label ${prefix}--skeleton`} />
      )}
      <div className={containerClasses}>
        <span className={`${prefix}--slider__range-label`} />
        <div className={`${prefix}--slider`}>
          <div className={`${prefix}--slider__track`} />
          <div className={`${prefix}--slider__filled-track`} />
          <div className={lowerThumbClasses} />
          {twoHandles ? <div className={upperThumbClasses} /> : undefined}
        </div>
        <span className={`${prefix}--slider__range-label`} />
      </div>
    </div>
  );
};

SliderSkeleton.propTypes = {
  /**
   * Specify an optional className to add to the form item wrapper.
   */
  className: PropTypes.string,

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,

  /**
   * Turn the slider into a range slider.
   */
  twoHandles: PropTypes.bool,
};

export default SliderSkeleton;
export { SliderSkeleton };
