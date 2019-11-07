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

function RadioButtonSkeleton({ className, ...rest }) {
  return (
    <div className={cx(`${prefix}--radio-button-wrapper`, className)} {...rest}>
      <div className={`${prefix}--radio-button ${prefix}--skeleton`} />
      <span className={`${prefix}--radio-button__label ${prefix}--skeleton`} />
    </div>
  );
}

RadioButtonSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,
};

export default RadioButtonSkeleton;
