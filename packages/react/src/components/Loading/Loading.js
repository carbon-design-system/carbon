/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings } from 'carbon-components';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import setupGetInstanceId from '../../tools/setupGetInstanceId';

const { prefix } = settings;
const getInstanceId = setupGetInstanceId();

function Loading({
  active,
  className: customClassName,
  withOverlay,
  small,
  description,
  ...rest
}) {
  const { current: instanceId } = useRef(getInstanceId());
  const loadingClassName = cx(customClassName, {
    [`${prefix}--loading`]: true,
    [`${prefix}--loading--small`]: small,
    [`${prefix}--loading--stop`]: !active,
  });
  const overlayClassName = cx({
    [`${prefix}--loading-overlay`]: true,
    [`${prefix}--loading-overlay--stop`]: !active,
  });
  const loadingId = `loading-id-${instanceId}`;
  const spinnerRadius = small ? '26.8125' : '37.5';

  const loading = (
    <div
      {...rest}
      aria-atomic="true"
      aria-labelledby={loadingId}
      aria-live={active ? 'assertive' : 'off'}
      className={loadingClassName}>
      <label id={loadingId} className={`${prefix}--visually-hidden`}>
        {description}
      </label>
      <svg className={`${prefix}--loading__svg`} viewBox="-75 -75 150 150">
        <title>{description}</title>
        {small ? (
          <circle
            className={`${prefix}--loading__background`}
            cx="0"
            cy="0"
            r={spinnerRadius}
          />
        ) : null}
        <circle
          className={`${prefix}--loading__stroke`}
          cx="0"
          cy="0"
          r={spinnerRadius}
        />
      </svg>
    </div>
  );

  return withOverlay ? (
    <div className={overlayClassName}>{loading}</div>
  ) : (
    loading
  );
}

Loading.propTypes = {
  /**
   * Specify whether you want the loading indicator to be spinning or not
   */
  active: PropTypes.bool,

  /**
   * Provide an optional className to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Specify whether you want the loader to be applied with an overlay
   */
  withOverlay: PropTypes.bool,

  /**
   * Specify whether you would like the small variant of <Loading>
   */
  small: PropTypes.bool,

  /**
   * Specify an description that would be used to best describe the loading state
   */
  description: PropTypes.string,
};

Loading.defaultProps = {
  active: true,
  withOverlay: true,
  small: false,
  description: 'Active loading indicator',
};

export default Loading;
