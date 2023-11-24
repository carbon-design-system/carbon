/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import classNames from 'classnames';
import { CheckmarkFilled, ErrorFilled } from '@carbon/icons-react';
import Loading from '../Loading';
import { usePrefix } from '../../internal/usePrefix';

export interface InlineLoadingProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  /**
   * Specify a custom className to be applied to the container node
   */
  className?: string;

  /**
   * Specify the description for the inline loading text
   */
  description?: React.ReactNode;

  /**
   * Specify the description for the inline loading text
   */
  iconDescription?: string;

  /**
   * Provide an optional handler to be invoked when <InlineLoading> is
   * successful
   */
  onSuccess?: (...args: unknown[]) => unknown;

  /**
   * Specify the loading status
   */
  status?: 'inactive' | 'active' | 'finished' | 'error';

  /**
   * Provide a delay for the `setTimeout` for success
   */
  successDelay?: number;
}

const InlineLoading = ({
  className,
  status = 'active',
  iconDescription,
  description,
  onSuccess,
  successDelay = 1500,
  ...divProps
}: InlineLoadingProps) => {
  const prefix = usePrefix();
  const loadingClasses = classNames(`${prefix}--inline-loading`, className);
  const getLoading = () => {
    let iconLabel = iconDescription ? iconDescription : status;
    if (status === 'error') {
      return (
        <ErrorFilled className={`${prefix}--inline-loading--error`}>
          <title>{iconLabel}</title>
        </ErrorFilled>
      );
    }
    if (status === 'finished') {
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        }
      }, successDelay);
      return (
        <CheckmarkFilled
          className={`${prefix}--inline-loading__checkmark-container`}>
          <title>{iconLabel}</title>
        </CheckmarkFilled>
      );
    }
    if (status === 'inactive' || status === 'active') {
      if (!iconDescription) {
        iconLabel = status === 'active' ? 'loading' : 'not loading';
      }
      return (
        <Loading
          small
          description={iconLabel}
          withOverlay={false}
          active={status === 'active'}
        />
      );
    }
    return undefined;
  };
  const loadingText = (
    <div className={`${prefix}--inline-loading__text`}>{description}</div>
  );
  const loading = getLoading();
  const loadingAnimation = loading && (
    <div className={`${prefix}--inline-loading__animation`}>{loading}</div>
  );
  return (
    <div
      className={loadingClasses}
      {...divProps}
      aria-live={'assertive' || divProps['aria-live']}>
      {loadingAnimation}
      {description && loadingText}
    </div>
  );
};

export default InlineLoading;
