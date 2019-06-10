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
import Loading from '../Loading';

const { prefix } = settings;

export default class InlineLoading extends React.Component {
  static propTypes = {
    /**
     * Specify a custom className to be applied to the container node
     */
    className: PropTypes.string,

    /**
     * Specify whether the load was successful
     */
    success: PropTypes.bool,

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

  static defaultProps = {
    success: false,
    successDelay: 1500,
  };

  render() {
    const {
      className,
      success,
      iconDescription,
      description,
      onSuccess,
      successDelay,
      ...other
    } = this.props;

    const loadingClasses = classNames(`${prefix}--inline-loading`, className);

    const getLoading = () => {
      if (success) {
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

      return (
        <Loading small description={iconDescription} withOverlay={false} />
      );
    };

    const loadingText = (
      <p className={`${prefix}--inline-loading__text`}>{description}</p>
    );

    return (
      <div className={loadingClasses} {...other}>
        <div className={`${prefix}--inline-loading__animation`}>
          {getLoading()}
        </div>
        {description && loadingText}
      </div>
    );
  }
}
