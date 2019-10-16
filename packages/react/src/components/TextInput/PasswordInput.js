import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';
import { View16, ViewOff16, WarningFilled16 } from '@carbon/icons-react';
import { textInputProps } from './util';

const { prefix } = settings;

export default function PasswordInput({
  labelText,
  className,
  id,
  placeholder,
  onChange,
  onClick,
  hideLabel,
  invalid,
  invalidText,
  helperText,
  light,
  tooltipPosition = 'bottom',
  tooltipAlignment = 'center',
  hidePasswordLabel = 'Hide password',
  showPasswordLabel = 'Show password',
  ...other
}) {
  const [inputType, setInputType] = useState('password');
  const togglePasswordVisibility = () =>
    setInputType(inputType === 'password' ? 'text' : 'password');
  const errorId = id + '-error-msg';
  const textInputClasses = classNames(
    `${prefix}--text-input`,
    `${prefix}--password-input`,
    className,
    {
      [`${prefix}--text-input--light`]: light,
      [`${prefix}--text-input--invalid`]: invalid,
    }
  );
  const sharedTextInputProps = {
    id,
    onChange: evt => {
      if (!other.disabled) {
        onChange(evt);
      }
    },
    onClick: evt => {
      if (!other.disabled) {
        onClick(evt);
      }
    },
    placeholder,
    type: inputType,
    className: textInputClasses,
    ...other,
  };
  const labelClasses = classNames(`${prefix}--label`, {
    [`${prefix}--visually-hidden`]: hideLabel,
    [`${prefix}--label--disabled`]: other.disabled,
  });
  const helperTextClasses = classNames(`${prefix}--form__helper-text`, {
    [`${prefix}--form__helper-text--disabled`]: other.disabled,
  });
  const label = labelText ? (
    <label htmlFor={id} className={labelClasses}>
      {labelText}
    </label>
  ) : null;
  const error = invalid ? (
    <div className={`${prefix}--form-requirement`} id={errorId}>
      {invalidText}
    </div>
  ) : null;
  const passwordIsVisible = inputType === 'text';
  const passwordVisibilityIcon = passwordIsVisible ? (
    <ViewOff16 className={`${prefix}--icon-visibility-off`} />
  ) : (
    <View16 className={`${prefix}--icon-visibility-on`} />
  );
  const passwordVisibilityToggleClasses = classNames(
    `${prefix}--text-input--password__visibility__toggle`,
    `${prefix}--btn--icon-only`,
    `${prefix}--tooltip__trigger`,
    `${prefix}--tooltip--a11y`,
    {
      [`${prefix}--tooltip--${tooltipPosition}`]: tooltipPosition,
      [`${prefix}--tooltip--align-${tooltipAlignment}`]: tooltipAlignment,
    }
  );
  const input = (
    <>
      <input
        {...textInputProps({ invalid, sharedTextInputProps, errorId })}
        data-toggle-password-visibility={inputType === 'password'}
      />
      <button
        type="button"
        className={passwordVisibilityToggleClasses}
        onClick={togglePasswordVisibility}>
        <span className={`${prefix}--assistive-text`}>
          {passwordIsVisible ? hidePasswordLabel : showPasswordLabel}
        </span>
        {passwordVisibilityIcon}
      </button>
    </>
  );
  const helper = helperText ? (
    <div className={helperTextClasses}>{helperText}</div>
  ) : null;

  return (
    <div
      className={`${prefix}--form-item ${prefix}--text-input-wrapper ${prefix}--password-input-wrapper`}>
      {label}
      {helper}
      <div
        className={`${prefix}--text-input__field-wrapper`}
        data-invalid={invalid || null}>
        {invalid && (
          <WarningFilled16 className={`${prefix}--text-input__invalid-icon`} />
        )}
        {input}
      </div>
      {error}
    </div>
  );
}

PasswordInput.propTypes = {
  /**
   * Provide a custom className that is applied directly to the underlying
   * <input> node
   */
  className: PropTypes.string,

  /**
   * Optionally provide the default value of the <input>
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the control is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide a unique identifier for the input field
   */
  id: PropTypes.string.isRequired,

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: PropTypes.node.isRequired,

  /**
   * Optionally provide an `onChange` handler that is called whenever <input>
   * is updated
   */
  onChange: PropTypes.func,

  /**
   * Optionally provide an `onClick` handler that is called whenever the
   * <input> is clicked
   */
  onClick: PropTypes.func,

  /**
   * Specify the placeholder attribute for the <input>
   */
  placeholder: PropTypes.string,

  /**
   * Provide the current value of the <input>
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether or not the underlying label is visually hidden
   */
  hideLabel: PropTypes.bool,

  /**
   * Specify whether the control is currently invalid
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText: PropTypes.string,

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText: PropTypes.node,

  /**
   * Specify light version or default version of this control
   */
  light: PropTypes.bool,

  /**
   * Specify the direction of the tooltip for icon-only buttons.
   * Can be either top, right, bottom, or left.
   */
  tooltipPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * Specify the alignment of the tooltip to the icon-only button.
   * Can be one of: start, center, or end.
   */
  tooltipAlignment: PropTypes.oneOf(['start', 'center', 'end']),

  /**
   * "Hide password" tooltip text on password visibility toggle
   */
  hidePasswordLabel: PropTypes.string,

  /**
   * "Show password" tooltip text on password visibility toggle
   */
  showPasswordLabel: PropTypes.string,
};

PasswordInput.defaultProps = {
  className: '${prefix}--text__input',
  disabled: false,
  onChange: () => {},
  onClick: () => {},
  invalid: false,
  invalidText: '',
  helperText: '',
  light: false,
};
