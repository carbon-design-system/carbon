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
import { CircleDash } from '@carbon/icons-react';

function Step() {
  const prefix = usePrefix();
  return (
    <li
      className={`${prefix}--progress-step ${prefix}--progress-step--incomplete`}>
      <div
        className={`${prefix}--progress-step-button ${prefix}--progress-step-button--unclickable`}>
        <CircleDash />
        <p className={`${prefix}--progress-label`} />
        <span className={`${prefix}--progress-line`} />
      </div>
    </li>
  );
}

function ProgressIndicatorSkeleton({ className, vertical, ...rest }) {
  const prefix = usePrefix();
  return (
    <ul
      className={cx(
        `${prefix}--progress`,
        `${prefix}--skeleton`,
        { [`${prefix}--progress--vertical`]: vertical },
        className
      )}
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
  /**
   * Determines whether or not the ProgressIndicator should be rendered vertically.
   */
  vertical: PropTypes.bool,
};

export default ProgressIndicatorSkeleton;
