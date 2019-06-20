import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';
import View16 from '@carbon/icons-react/lib/view/16';
import ViewOff16 from '@carbon/icons-react/lib/view--off/16';
import WarningFilled16 from '@carbon/icons-react/lib/warning--filled/16';
import { textInputProps } from './util';

const { prefix } = settings;

export default function PasswordInput({
  alt,
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
  const input = (
    <>
      <input
        {...textInputProps({ invalid, sharedTextInputProps, errorId })}
        data-toggle-password-visibility={inputType === 'password'}
      />
      <button
        className={`${prefix}--text-input--password__visibility`}
        aria-label={alt || `${passwordIsVisible ? 'Hide' : 'Show'} password`}
        onClick={togglePasswordVisibility}>
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
   * Provide custom alt text for the password visibility toggle button
   */
  alt: PropTypes.string,
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
};

PasswordInput.defaultProps = {
  alt: '',
  className: '${prefix}--text__input',
  disabled: false,
  onChange: () => {},
  onClick: () => {},
  invalid: false,
  invalidText: '',
  helperText: '',
  light: false,
};
