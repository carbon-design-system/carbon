/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import setupGetInstanceId from '../../tools/setupGetInstanceId';

const { prefix } = settings;

const getInstanceId = setupGetInstanceId();

export default class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.loadingInstanceId = getInstanceId();
  }

  static propTypes = {
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

  static defaultProps = {
    active: true,
    withOverlay: true,
    small: false,
    description: 'Active loading indicator',
  };

  render() {
    const {
      active,
      className,
      withOverlay,
      small,
      description,
      ...other
    } = this.props;

    const loadingClasses = classNames(`${prefix}--loading`, className, {
      [`${prefix}--loading--small`]: small,
      [`${prefix}--loading--stop`]: !active,
    });

    const overlayClasses = classNames(`${prefix}--loading-overlay`, {
      [`${prefix}--loading-overlay--stop`]: !active,
    });

    const loadingInstanceLabelId = `loading-id-${this.loadingInstanceId}`;
    const spinnerRadius = small ? '26.8125' : '37.5';

    const loading = (
      <div
        {...other}
        // aria-atomic set to true allows live regions to be announced in JAWS
        aria-atomic="true"
        aria-labelledby={loadingInstanceLabelId}
        aria-live={active ? 'assertive' : 'off'}
        className={loadingClasses}>
        {/* label allows the description to be read to VoiceOver in iOS */}
        <label
          id={loadingInstanceLabelId}
          className={`${prefix}--visually-hidden`}>
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
      <div className={overlayClasses}>{loading}</div>
    ) : (
      loading
    );
  }
}
