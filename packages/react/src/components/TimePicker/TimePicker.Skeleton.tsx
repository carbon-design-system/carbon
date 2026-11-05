/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { type HTMLAttributes } from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { TextInputSkeleton } from '../TextInput';
import { SelectSkeleton } from '../Select';

export interface TimePickerSkeletonProps
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * Specify an optional className to add.
   */
  className?: string;
  /**
   * Specify if there are only two TimePicker elements
   */
  isOnlyTwo?: boolean;
}

const TimePickerSkeleton = ({
  className,
  isOnlyTwo,
  ...rest
}: TimePickerSkeletonProps) => {
  const prefix = usePrefix();
  const wrapperClasses = cx(className, `${prefix}--time-picker--skeleton`, {
    [`${prefix}--time-picker--equal-width`]: isOnlyTwo,
  });

  return (
    <div className={wrapperClasses} {...rest}>
      <TextInputSkeleton />
      <SelectSkeleton hideLabel />
      {!isOnlyTwo ? <SelectSkeleton hideLabel /> : null}
    </div>
  );
};

TimePickerSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * Specify if there are only two TimePicker elements
   */
  isOnlyTwo: PropTypes.bool,
};

export default TimePickerSkeleton;
export { TimePickerSkeleton };
