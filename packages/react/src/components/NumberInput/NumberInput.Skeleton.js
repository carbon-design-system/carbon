/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import { settings } from 'carbon-components';

const { prefix } = settings;

const NumberInputSkeleton = ({ hideLabel }) => (
  <div className={`${prefix}--form-item`}>
    {!hideLabel && <span className={`${prefix}--label ${prefix}--skeleton`} />}
    <div
      aria-live="assertive"
      className={`${prefix}--number ${prefix}--skeleton`}
      role="status"
      tabindex="0" // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
    />
  </div>
);

NumberInputSkeleton.propTypes = {
  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,
};

export default NumberInputSkeleton;
