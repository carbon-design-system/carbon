/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { prefix } = settings;

const DatePickerSkeleton = ({ range, id }) => {
  const dateInput = (
    <div className={`${prefix}--date-picker-container`}>
      {
        /* eslint-disable jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control */
        <label className={`${prefix}--label`} htmlFor={id} />
      }
      <div className={`${prefix}--date-picker__input ${prefix}--skeleton`} />
    </div>
  );

  if (range) {
    return (
      <div className={`${prefix}--form-item`}>
        <div
          className={`${prefix}--date-picker ${prefix}--date-picker--range ${prefix}--skeleton`}>
          {dateInput}
          {dateInput}
        </div>
      </div>
    );
  }

  return (
    <div className={`${prefix}--form-item`}>
      <div
        className={`${prefix}--date-picker ${prefix}--date-picker--short ${prefix}--date-picker--simple ${prefix}--skeleton`}>
        {dateInput}
      </div>
    </div>
  );
};

DatePickerSkeleton.propTypes = {
  /**
   * Specify whether the skeleton should be of range date picker.
   */
  range: PropTypes.bool,
};

export default DatePickerSkeleton;
