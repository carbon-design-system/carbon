/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import FluidTextInput from '../FluidTextInput';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm/FormContext';

const FluidTimePicker = React.forwardRef(function FluidTimePicker(
  { className, children, ...other },
  ref
) {
  const prefix = usePrefix();
  const classNames = classnames(className, {
    [`${prefix}--time-picker--fluid`]: true,
    [`${prefix}--time-picker--equal-width`]: children.length !== 2,
  });

  console.log(typeof children);

  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <div className={classNames}>
        <div className={`${prefix}--time-picker__input`}>
          <FluidTextInput ref={ref} {...other} />
        </div>
        {children}
      </div>
    </FormContext.Provider>
  );
});

FluidTimePicker.propTypes = {
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
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: PropTypes.node.isRequired,

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};

export default FluidTimePicker;
