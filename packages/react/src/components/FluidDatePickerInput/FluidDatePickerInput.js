/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import DatePickerInput from '../DatePickerInput';
import { FormContext } from '../FluidForm/FormContext';

const FluidDatePickerInput = React.forwardRef(function FluidDatePickerInput(
  { invalid, ...other },
  ref
) {
  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <DatePickerInput invalid={invalid} ref={ref} {...other} />
    </FormContext.Provider>
  );
});

FluidDatePickerInput.propTypes = {
  /**
   * Specify whether or not the control is invalid
   */
  invalid: PropTypes.boolean,
};

export default FluidDatePickerInput;
