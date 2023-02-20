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
import { useMergedRefs } from '../../internal/useMergedRefs';

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
    maxCount,
    ...other
  },
  forwardRef
) {
  const prefix = usePrefix();
  const { isFluid } = useContext(FormContext);
  const enabled = useFeatureFlag('enable-v11-release');
  const { defaultValue, value, disabled } = other;
  const [textCount, setTextCount] = useState(
    defaultValue?.length || value?.length || 0
  );

  const textareaProps = {
    id,
    onChange: (evt) => {
      if (!other.disabled) {
        setTextCount(evt.target.value?.length);
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
    textareaProps.maxLength = maxCount;
  }
  let ariaAnnouncement = useAnnouncer(textCount, maxCount);

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
    enableCounter && maxCount ? (
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

  const textareaRef = useRef();
  const ref = useMergedRefs([forwardRef, textareaRef]);

  useIsomorphicEffect(() => {
    if (other.cols) {
      textareaRef.current.style.width = null;
      textareaRef.current.style.resize = 'none';
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
      ref={ref}
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
};

export default TextArea;
