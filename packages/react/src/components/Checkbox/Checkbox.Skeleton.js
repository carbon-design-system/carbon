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

const CheckboxSkeleton = ({ className, ...rest }) => (
  <div
    className={cx(
      `${prefix}--form-item`,
      `${prefix}--checkbox-wrapper`,
      className
    )}
    {...rest}>
    <span className={`${prefix}--checkbox-label ${prefix}--skeleton`} />
  </div>
);

CheckboxSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,
};

export default CheckboxSkeleton;
