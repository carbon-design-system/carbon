/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useState, useContext, useRef } from 'react';
import classNames from 'classnames';
import deprecate from '../../prop-types/deprecate';
import { WarningFilled } from '@carbon/icons-react';
import { useFeatureFlag } from '../FeatureFlags';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm';
import { useAnnouncer } from '../../internal/useAnnouncer';
import useIsomorphicEffect from '../../internal/useIsomorphicEffect';

const TextArea = React.forwardRef(function TextArea(
  {
    className,
    id,
    labelText,
    hideLabel,
    onChange,
    onClick,
    invalid,
    invalidText,
    helperText,
    light,
    placeholder,
    enableCounter,
    counterMode,
    maxCount,
    ...other
  },
  ref
) {
  const prefix = usePrefix();
  const { isFluid } = useContext(FormContext);
  const enabled = useFeatureFlag('enable-v11-release');
  const { defaultValue, value, disabled } = other;
  const [textCount, setTextCount] = useState(
    defaultValue
      ? counterMode == 'default'
        ? defaultValue.length
        : defaultValue.match(/\w+/g).length
      : value
      ? counterMode == 'default'
        ? value.length
        : value.match(/\w+/g).length
      : 0
  );

  const textareaRef = useRef(null);

  const textareaProps = {
    id,
    onKeyDown: (evt) => {
      if (!other.disabled && counterMode === 'words') {
        var key = evt.which;
        if (textCount == maxCount && key == 32) {
          evt.preventDefault();
        }
      }
    },
    onChange: (evt) => {
      if (!other.disabled) {
        if (counterMode == 'default') {
          setTextCount(evt.target.value?.length);
        } else if (counterMode == 'words') {
          if (!evt.target.value) {
            console.log('reset');
            setTextCount(0);
            return;
          }
          if (evt.target.value.match(/\w+/g).length <= maxCount) {
            textareaRef.current.removeAttribute('maxLength');
            setTextCount(evt.target.value.match(/\w+/g).length);
          } else {
            const first_max = evt.target.value
              .split(/\s+/)
              .slice(0, maxCount)
              .join(' ');

            setTextCount(maxCount);
            textareaRef.current.value = first_max;
          }
        }
        onChange(evt);
      }
    },
    onClick: (evt) => {
      if (!other.disabled) {
        onClick(evt);
      }
    },
    ref,
  };

  if (enableCounter) {
    // handle different counter mode
    if (counterMode == 'default') {
      textareaProps.maxLength = maxCount;
    }
  }
  let ariaAnnouncement = useAnnouncer(
    textCount,
    maxCount,
    counterMode === 'words' ? 'words' : undefined
  );

  const labelClasses = classNames(`${prefix}--label`, {
    [`${prefix}--visually-hidden`]: hideLabel && !isFluid,
    [`${prefix}--label--disabled`]: disabled,
  });

  const label = labelText ? (
    <label htmlFor={id} className={labelClasses}>
      {labelText}
    </label>
  ) : null;

  const counterClasses = classNames(`${prefix}--label`, {
    [`${prefix}--label--disabled`]: disabled,
  });

  const counter =
    enableCounter &&
    maxCount &&
    (counterMode === 'default' || counterMode === 'words') ? (
      <div className={counterClasses}>{`${textCount}/${maxCount}`}</div>
    ) : null;

  const helperTextClasses = classNames(`${prefix}--form__helper-text`, {
    [`${prefix}--form__helper-text--disabled`]: other.disabled,
  });

  const helper = helperText ? (
    <div className={helperTextClasses}>{helperText}</div>
  ) : null;

  const errorId = id + '-error-msg';

  const error = invalid ? (
    <div role="alert" className={`${prefix}--form-requirement`} id={errorId}>
      {invalidText}
      {isFluid && (
        <WarningFilled className={`${prefix}--text-area__invalid-icon`} />
      )}
    </div>
  ) : null;

  const textareaClasses = classNames(
    `${prefix}--text-area`,
    [enabled ? null : className],
    {
      [`${prefix}--text-area--light`]: light,
      [`${prefix}--text-area--invalid`]: invalid,
    }
  );

  useIsomorphicEffect(() => {
    if (other.cols) {
      textareaRef.current.style.width = null;
    } else {
      textareaRef.current.style.width = `100%`;
    }
  }, [other.cols]);

  const input = (
    <textarea
      {...other}
      {...textareaProps}
      placeholder={placeholder || null}
      className={textareaClasses}
      aria-invalid={invalid || null}
      aria-describedby={invalid ? errorId : null}
      disabled={other.disabled}
      readOnly={other.readOnly}
      ref={textareaRef}
    />
  );

  return (
    <div
      className={
        enabled
          ? classNames(`${prefix}--form-item`, className)
          : `${prefix}--form-item`
      }>
      <div className={`${prefix}--text-area__label-wrapper`}>
        {label}
        {counter}
      </div>
      <div
        className={classNames(`${prefix}--text-area__wrapper`, {
          [`${prefix}--text-area__wrapper--readonly`]: other.readOnly,
        })}
        data-invalid={invalid || null}>
        {invalid && !isFluid && (
          <WarningFilled className={`${prefix}--text-area__invalid-icon`} />
        )}
        {input}
        <span className={`${prefix}--text-area__counter-alert`} role="alert">
          {ariaAnnouncement}
        </span>
        {isFluid && <hr className={`${prefix}--text-area__divider`} />}
        {isFluid && invalid ? error : null}
      </div>
      {invalid && !isFluid ? error : helper}
    </div>
  );
});

TextArea.displayName = 'TextArea';
TextArea.propTypes = {
  /**
   * Provide a custom className that is applied directly to the underlying
   * `<textarea>` node
   */
  className: PropTypes.string,

  /**
   * Specify the `cols` attribute for the underlying `<textarea>` node
   */
  cols: PropTypes.number,

  /**
   * Specify the method used for calculating the counter number
   */
  counterMode: PropTypes.oneOf(['default', 'words']),

  /**
   * Optionally provide the default value of the `<textarea>`
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the control is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify whether to display the character counter
   */
  enableCounter: PropTypes.bool,

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText: PropTypes.node,

  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  hideLabel: PropTypes.bool,

  /**
   * Provide a unique identifier for the control
   */
  id: PropTypes.string,

  /**
   * Specify whether the control is currently invalid
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText: PropTypes.node,

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: PropTypes.node.isRequired,

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make tile background color same as container background color.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `TextArea` has ' +
      'been deprecated in favor of the new `Layer` component. It will be removed in the next major release.'
  ),

  /**
   * Max character count allowed for the textarea. This is needed in order for enableCounter to display
   */
  maxCount: PropTypes.number,

  /**
   * Optionally provide an `onChange` handler that is called whenever `<textarea>`
   * is updated
   */
  onChange: PropTypes.func,

  /**
   * Optionally provide an `onClick` handler that is called whenever the
   * `<textarea>` is clicked
   */
  onClick: PropTypes.func,

  /**
   * Specify the placeholder attribute for the `<textarea>`
   */
  placeholder: PropTypes.string,

  /**
   * Whether the textarea should be read-only
   */
  readOnly: PropTypes.bool,

  /**
   * Specify the rows attribute for the `<textarea>`
   */
  rows: PropTypes.number,

  /**
   * Provide the current value of the `<textarea>`
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

TextArea.defaultProps = {
  disabled: false,
  onChange: () => {},
  onClick: () => {},
  placeholder: '',
  rows: 4,
  invalid: false,
  invalidText: '',
  helperText: '',
  enableCounter: false,
  maxCount: undefined,
  counterMode: 'default',
};

export default TextArea;
