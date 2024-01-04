/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ReactSVGElement, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CheckmarkFilled, ErrorFilled } from '@carbon/icons-react';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';

interface ProgressBarProps {
  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * The current progress as a textual representation.
   */
  helperText?: string;

  /**
   * Whether the label should be visually hidden.
   */
  hideLabel?: boolean;

  /**
   * A label describing the progress bar.
   */
  label: string;

  /**
   * The maximum value.
   */
  max?: number;

  /**
   * Specify the size of the progress bar.
   */
  size?: 'small' | 'big';

  /**
   * Specify the status.
   */
  status?: 'active' | 'finished' | 'error';

  /**
   * Defines the alignment variant of the progress bar.
   */
  type?: 'default' | 'inline' | 'indented';

  /**
   * The current value.
   */
  value?: number;
}

function ProgressBar({
  className,
  helperText,
  hideLabel,
  label,
  max = 100,
  size = 'big',
  status = 'active',
  type = 'default',
  value,
}: ProgressBarProps) {
  const labelId = useId('progress-bar');
  const helperId = useId('progress-bar-helper');
  const helperTextId = useId('progress-bar-helper-text');
  const prefix = usePrefix();

  const isFinished = status === 'finished';
  const isError = status === 'error';

  const indeterminate =
    !isFinished && !isError && (value === null || value === undefined);

  let cappedValue = value;
  if (cappedValue && cappedValue > max) {
    cappedValue = max;
  }
  if (cappedValue && cappedValue < 0) {
    cappedValue = 0;
  }
  if (isError) {
    cappedValue = 0;
  } else if (isFinished) {
    cappedValue = max;
  }

  const percentage = (cappedValue ?? NaN) / max;

  const wrapperClasses = classNames(
    `${prefix}--progress-bar`,
    `${prefix}--progress-bar--${size}`,
    `${prefix}--progress-bar--${type}`,
    {
      [`${prefix}--progress-bar--indeterminate`]: indeterminate,
      [`${prefix}--progress-bar--finished`]: isFinished,
      [`${prefix}--progress-bar--error`]: isError,
    },
    className
  );

  const labelClasses = classNames(`${prefix}--progress-bar__label`, {
    [`${prefix}--visually-hidden`]: hideLabel,
  });

  let StatusIcon: React.ForwardRefExoticComponent<
    React.RefAttributes<ReactSVGElement> & { className?: string }
  > | null = null;

  if (isError) {
    StatusIcon = React.forwardRef(function ErrorFilled16(
      props,
      ref: React.Ref<ReactSVGElement>
    ) {
      return <ErrorFilled ref={ref} size={16} {...props} />;
    });
  } else if (isFinished) {
    StatusIcon = React.forwardRef(function CheckmarkFilled16(
      props,
      ref: React.Ref<ReactSVGElement>
    ) {
      return <CheckmarkFilled ref={ref} size={16} {...props} />;
    });
  }

  const ref = useRef<HTMLDivElement>(null);
  useIsomorphicEffect(() => {
    if (ref.current) {
      if (!isFinished && !isError) {
        ref.current.style.transform = `scaleX(${percentage})`;
      } else {
        ref.current.style.transform = '';
      }
    }
  }, [percentage, isFinished, isError]);

  return (
    <div className={wrapperClasses}>
      <div className={labelClasses} id={labelId}>
        <span className={`${prefix}--progress-bar__label-text`}>{label}</span>
        {StatusIcon && (
          <StatusIcon className={`${prefix}--progress-bar__status-icon`} />
        )}
      </div>
      {/* eslint-disable-next-line jsx-a11y/role-supports-aria-props */}
      <div
        className={`${prefix}--progress-bar__track`}
        role="progressbar"
        aria-busy={!isFinished}
        aria-invalid={isError}
        aria-labelledby={labelId}
        aria-describedby={helperText ? helperTextId : undefined}
        aria-valuemin={!indeterminate ? 0 : undefined}
        aria-valuemax={!indeterminate ? max : undefined}
        aria-valuenow={!indeterminate ? cappedValue : undefined}>
        <div className={`${prefix}--progress-bar__bar`} ref={ref} />
      </div>
      {helperText && (
        <div
          id={helperTextId}
          className={`${prefix}--progress-bar__helper-text`}>
          {helperText}
          <div
            className={`${prefix}--visually-hidden`}
            aria-live="polite"
            id={helperId}>
            {isFinished ? 'Done' : 'Loading'}
          </div>
        </div>
      )}
    </div>
  );
}

ProgressBar.propTypes = {
  /**
   * Additional CSS class names.
   */
  className: PropTypes.string,

  /**
   * The current progress as a textual representation.
   */
  helperText: PropTypes.string,

  /**
   * Whether the label should be visually hidden.
   */
  hideLabel: PropTypes.bool,

  /**
   * A label describing the progress bar.
   */
  label: PropTypes.string.isRequired,

  /**
   * The maximum value.
   */
  max: PropTypes.number,

  /**
   * Specify the size of the ProgressBar.
   */
  size: PropTypes.oneOf(['small', 'big']),

  /**
   * Specify the status.
   */
  status: PropTypes.oneOf(['active', 'finished', 'error']),

  /**
   * Defines the alignment variant of the progress bar.
   */
  type: PropTypes.oneOf(['default', 'inline', 'indented']),

  /**
   * The current value.
   */
  value: PropTypes.number,
};

export default ProgressBar;
