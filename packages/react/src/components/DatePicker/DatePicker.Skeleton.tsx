/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { type HTMLAttributes } from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

export interface DatePickerSkeletonProps
  extends HTMLAttributes<HTMLDivElement> {
  // Specify whether the skeleton should be of range date picker.
  range?: boolean;

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel?: boolean;
}

const DatePickerSkeleton = ({
  range,
  id,
  hideLabel,
  className,
  ...rest
}: DatePickerSkeletonProps) => {
  const prefix = usePrefix();
  const dateInput = (
    <div className={`${prefix}--date-picker-container`}>
      {!hideLabel && <span className={`${prefix}--label`} id={id} />}
      <div className={`${prefix}--date-picker__input ${prefix}--skeleton`} />
    </div>
  );

  if (range) {
    return (
      <div className={`${prefix}--form-item`}>
        <div
          className={cx(
            `${prefix}--date-picker`,
            `${prefix}--date-picker--range`,
            `${prefix}--skeleton`,
            className
          )}
          {...rest}>
          {dateInput}
          {dateInput}
        </div>
      </div>
    );
  }

  return (
    <div className={`${prefix}--form-item`}>
      <div
        className={cx(
          `${prefix}--date-picker`,
          `${prefix}--date-picker--short`,
          `${prefix}--date-picker--simple`,
          `${prefix}--skeleton`,
          className
        )}
        {...rest}>
        {dateInput}
      </div>
    </div>
  );
};

DatePickerSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,

  /**
   * Specify the id to add.
   */
  id: PropTypes.string,

  /**
   * Specify whether the skeleton should be of range date picker.
   */
  range: PropTypes.bool,
};

export default DatePickerSkeleton;
export { DatePickerSkeleton };
