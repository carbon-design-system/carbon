/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

const CheckboxSkeleton = ({ className, ...rest }) => {
  const prefix = usePrefix();
  return (
    <div
      className={cx(
        `${prefix}--form-item`,
        `${prefix}--checkbox-wrapper`,
        `${prefix}--checkbox-label`,
        className
      )}
      {...rest}>
      <span className={`${prefix}--checkbox-label-text ${prefix}--skeleton`} />
    </div>
  );
};

CheckboxSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,
};

export default CheckboxSkeleton;
