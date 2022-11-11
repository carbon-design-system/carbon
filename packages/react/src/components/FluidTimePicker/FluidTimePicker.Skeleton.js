/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import FluidTextInputSkeleton from '../FluidTextInput';

function FluidTimePickerSkeleton({ className, ...other }) {
  return <FluidTextInputSkeleton className={className} {...other} />;
}

FluidTimePickerSkeleton.propTypes = {
  /**
   * Specify an optional className to be applied to the outer FluidForm wrapper
   */
  className: PropTypes.string,
};

export default FluidTimePickerSkeleton;
