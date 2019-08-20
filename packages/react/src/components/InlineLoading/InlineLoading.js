/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Error20 } from '@carbon/icons-react';
import { settings } from 'carbon-components';
import deprecate from '../../prop-types/deprecate';
import Loading from '../Loading';

const { prefix } = settings;

export default function InlineLoading({
  className,
  success,
  status = success ? 'finished' : 'active',
  iconDescription,
  description,
  onSuccess,
  successDelay,
  ...other
}) {
  const loadingClasses = classNames(`${prefix}--inline-loading`, className);
  const getLoading = () => {
    if (status === 'error') {
      return <Error20 className={`${prefix}--inline-loading--error`} />;
    }
    if (status === 'finished') {
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        }
      }, successDelay);
      return (
        <svg
          className={`${prefix}--inline-loading__checkmark-container ${prefix}--inline-loading__svg`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 10 10">
          <polyline
            className={`${prefix}--inline-loading__checkmark`}
            points="0.74 3.4 3.67 6.34 9.24 0.74"
          />
        </svg>
      );
    }
    if (status === 'active') {
      return (
        <Loading
          small
          description={iconDescription}
          withOverlay={false}
          active
        />
      );
    }
    return undefined;
  };
  const loadingText = (
    <p className={`${prefix}--inline-loading__text`}>{description}</p>
  );
  const loading = getLoading();
  const loadingAnimation = !loading ? (
    undefined
  ) : (
    <div className={`${prefix}--inline-loading__animation`}>{loading}</div>
  );
  return (
    <div
      className={loadingClasses}
      {...other}
      aria-live={'assertive' || other['aria-live']}>
      {loadingAnimation}
      {description && loadingText}
    </div>
  );
}

InlineLoading.propTypes = {
  /**
   * Specify a custom className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify whether the load was successful
   */
  success: deprecate(
    PropTypes.bool,
    `\nThe prop \`success\` for InlineLoading has been deprecated in favor of \`status\`. Please use \`status="finished"\` instead.`
  ),

  /**
   * Specify the loading status
   */
  status: PropTypes.oneOf('inactive', 'active', 'finished', 'error'),

  /**
   * Specify the description for the inline loading text
   */
  description: PropTypes.string,

  /**
   * Specify the description for the inline loading text
   */
  iconDescription: PropTypes.string,

  /**
   * Provide an optional handler to be inovked when <InlineLoading> is
   * successful
   */
  onSuccess: PropTypes.func,

  /**
   * Provide a delay for the `setTimeout` for success
   */
  successDelay: PropTypes.number,
};
InlineLoading.defaultProps = {
  success: false,
  successDelay: 1500,
};
