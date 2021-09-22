/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const NumberInputSkeleton = ({ hideLabel, className, ...rest }) => (
  <div className={cx(`${prefix}--form-item`, className)} {...rest}>
    {!hideLabel && <span className={`${prefix}--label ${prefix}--skeleton`} />}
    <div className={`${prefix}--number ${prefix}--skeleton`} />
  </div>
);

NumberInputSkeleton.propTypes = {
  /**
   * Specify an optional className to add to the form item wrapper.
   */
  className: PropTypes.string,

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,
};

export default NumberInputSkeleton;
