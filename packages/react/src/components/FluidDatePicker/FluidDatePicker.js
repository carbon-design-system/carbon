/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import DatePicker from '../DatePicker';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm/FormContext';

const FluidDatePicker = React.forwardRef(function FluidDatePicker(
  { className, children, invalid, invalidText, warn, warnText, ...other },
  ref
) {
  const prefix = usePrefix();
  const classNames = classnames(className, {
    [`${prefix}--date-picker--fluid`]: true,
    [`${prefix}--date-picker--fluid--invalid`]: invalid,
    [`${prefix}--date-picker--fluid--warn`]: warn,
  });

  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <DatePicker
        invalid={invalid}
        invalidText={invalidText}
        warn={warn}
        warnText={warnText}
        className={classNames}
        ref={ref}
        {...other}>
        {children}
      </DatePicker>
    </FormContext.Provider>
  );
});

FluidDatePicker.propTypes = {
  /**
   * The child node(s)
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the outer FluidForm wrapper
   */
  className: PropTypes.string,

  /**
   * Specify whether or not the control is invalid
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in error state
   */
  invalidText: PropTypes.node,

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};

export default FluidDatePicker;
