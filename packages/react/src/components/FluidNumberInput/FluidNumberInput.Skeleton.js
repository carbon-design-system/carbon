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

function FluidNumberInputSkeleton({ className, ...other }) {
  const prefix = usePrefix();

  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <div
        className={classnames(
          `${prefix}--form-item ${prefix}--text-input--fluid__skeleton`,
          className
        )}
        {...other}>
        <span className={`${prefix}--label ${prefix}--skeleton`} />
        <div className={`${prefix}--skeleton ${prefix}--text-input`} />
      </div>
    </FormContext.Provider>
  );
}

FluidNumberInputSkeleton.propTypes = {
  /**
   * Specify an optional className to be applied to the outer FluidForm wrapper
   */
  className: PropTypes.string,
};

export default FluidNumberInputSkeleton;
