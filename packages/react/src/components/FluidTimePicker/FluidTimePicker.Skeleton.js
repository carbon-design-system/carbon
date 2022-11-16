/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { FluidTextInputSkeleton } from '../FluidTextInput';
import { FluidSelectSkeleton } from '../FluidSelect';

const FluidTimePickerSkeleton = ({ className, isOnlyTwo, ...rest }) => {
  const prefix = usePrefix();
  const wrapperClasses = cx(
    className,
    `${prefix}--time-picker--fluid--skeleton`,
    {
      [`${prefix}--time-picker--equal-width`]: isOnlyTwo,
    }
  );

  return (
    <div className={wrapperClasses} {...rest}>
      <FluidTextInputSkeleton />
      <FluidSelectSkeleton />
      {!isOnlyTwo ? <FluidSelectSkeleton /> : null}
    </div>
  );
};

FluidTimePickerSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * Specify if there are only two TimePicker elements
   */
  isOnlyTwo: PropTypes.bool,
};

export default FluidTimePickerSkeleton;
