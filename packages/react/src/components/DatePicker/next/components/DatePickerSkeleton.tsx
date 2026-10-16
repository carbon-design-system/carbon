/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { usePrefix } from '../../../../internal/usePrefix';

export interface DatePickerSkeletonProps {
  /**
   * Specify whether the skeleton should be a range date picker
   */
  range?: boolean;

  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * DatePickerSkeleton component for loading states
 */
export const DatePickerSkeleton: React.FC<DatePickerSkeletonProps> = ({
  range = false,
  className,
}) => {
  const prefix = usePrefix();

  return (
    <div className={`${prefix}--form-item`}>
      <div
        className={`${prefix}--date-picker ${prefix}--date-picker--next ${prefix}--date-picker--${
          range ? 'range' : 'single'
        } ${prefix}--skeleton ${className || ''}`}>
        <div className={`${prefix}--date-picker-container`}>
          <span className={`${prefix}--label ${prefix}--skeleton`} />
          <div
            className={`${prefix}--date-picker__input ${prefix}--skeleton`}
          />
        </div>
        {range && (
          <div className={`${prefix}--date-picker-container`}>
            <span className={`${prefix}--label ${prefix}--skeleton`} />
            <div
              className={`${prefix}--date-picker__input ${prefix}--skeleton`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePickerSkeleton;
