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

const TextAreaSkeleton = ({ hideLabel }) => (
  <div className={`${prefix}--form-item`}>
    {!hideLabel && <span className={`${prefix}--label ${prefix}--skeleton`} />}
    <div className={`${prefix}--skeleton ${prefix}--text-area`} />
  </div>
);

TextAreaSkeleton.propTypes = {
  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,
};

export default TextAreaSkeleton;
