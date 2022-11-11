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
   * The child node(s)
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the outer FluidForm wrapper
   */
  className: PropTypes.string,
};

export default FluidTimePickerSelect;
