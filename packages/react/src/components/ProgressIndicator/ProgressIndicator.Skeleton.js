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

function Step() {
  const prefix = usePrefix();
  return (
    <li
      className={`${prefix}--progress-step ${prefix}--progress-step--incomplete`}>
      <div
        className={`${prefix}--progress-step-button ${prefix}--progress-step-button--unclickable`}>
        <svg>
          <path d="M 7, 7 m -7, 0 a 7,7 0 1,0 14,0 a 7,7 0 1,0 -14,0" />
        </svg>
        <p className={`${prefix}--progress-label`} />
        <span className={`${prefix}--progress-line`} />
      </div>
    </li>
  );
}

function ProgressIndicatorSkeleton({ className, ...rest }) {
  const prefix = usePrefix();
  return (
    <ul
      className={cx(`${prefix}--progress`, `${prefix}--skeleton`, className)}
      {...rest}>
      <Step />
      <Step />
      <Step />
      <Step />
    </ul>
  );
}

ProgressIndicatorSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,
};

export default ProgressIndicatorSkeleton;
