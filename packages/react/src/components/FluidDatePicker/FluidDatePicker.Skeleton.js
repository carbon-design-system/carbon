/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm/FormContext';
import { Calendar } from '@carbon/icons-react';

function FluidDatePickerSkeleton({
  className,
  datePickerType = 'single',
  ...other
}) {
  const prefix = usePrefix();

  const classNames = classnames(
    className,
    `${prefix}--form-item ${prefix}--date-picker--fluid__skeleton`,
    {
      [`${prefix}--date-picker--fluid__skeleton--range`]:
        datePickerType === 'range',
    }
  );

  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <div className={classNames} {...other}>
        <div className={`${prefix}--date-picker--fluid__skeleton--container`}>
          <span className={`${prefix}--label ${prefix}--skeleton`} />
          <div className={`${prefix}--skeleton ${prefix}--text-input`} />
          {datePickerType !== 'simple' && (
            <Calendar
              className={`${prefix}--date-picker__icon`}
              role="img"
              aria-hidden="true"></Calendar>
          )}
        </div>
        {datePickerType === 'range' && (
          <div className={`${prefix}--date-picker--fluid__skeleton--container`}>
            <span className={`${prefix}--label ${prefix}--skeleton`} />
            <div className={`${prefix}--skeleton ${prefix}--text-input`} />
            <Calendar
              className={`${prefix}--date-picker__icon`}
              role="img"
              aria-hidden="true"></Calendar>
          </div>
        )}
      </div>
    </FormContext.Provider>
  );
}

FluidDatePickerSkeleton.propTypes = {
  /**
   * Specify an optional className to be applied to the outer FluidForm wrapper
   */
  className: PropTypes.string,

  /**
   * Specify which variant of the DatePicker the skeleton should mimic
   */
  datePickerType: PropTypes.oneOf(['simple', 'single', 'range']),
};

export default FluidDatePickerSkeleton;
