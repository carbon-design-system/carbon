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
  { className, children, ...other },
  ref
) {
  const prefix = usePrefix();
  const classNames = classnames(className, {
    [`${prefix}--date-picker--fluid`]: true,
  });

  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <DatePicker ref={ref} className={classNames} {...other}>
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
};

export default FluidDatePicker;
