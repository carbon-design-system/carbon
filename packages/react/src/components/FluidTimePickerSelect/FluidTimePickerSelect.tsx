/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import FluidSelect from '../FluidSelect';

const FluidTimePickerSelect = React.forwardRef(function FluidTimePickerSelect(
  { children, className, ...other },
  ref
) {
  return (
    <FluidSelect className={className} ref={ref} {...other}>
      {children}
    </FluidSelect>
  );
});

FluidTimePickerSelect.propTypes = {
  /**
   * Provide the contents of your Select
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the node containing the label and the select box
   */
  className: PropTypes.string,

  /**
   * Optionally provide the default value of the `<select>`
   */
  defaultValue: PropTypes.any,

  /**
   * Specify whether the control is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify a custom `id` for the `<select>`
   */
  id: PropTypes.string.isRequired,

  /**
   * Provide label text to be read by screen readers when interacting with the
   * control
   */
  labelText: PropTypes.node,

  /**
   * Provide an optional `onChange` hook that is called each time the value of
   * the underlying `<input>` changes
   */
  onChange: PropTypes.func,
};

export default FluidTimePickerSelect;
