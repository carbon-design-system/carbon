/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import { WarningFilled16, WarningAltFilled16 } from '@carbon/icons-react';
import PasswordInput from './PasswordInput';
import ControlledPasswordInput from './ControlledPasswordInput';
import { textInputProps } from './util';
import { FormContext } from '../FluidForm';

const { prefix } = settings;
const TextInput = React.forwardRef(function TextInput(
  {
    labelText,
    className = `${prefix}--text__input`,
    id,
    placeholder,
    type,
    onChange,
    onClick,
    hideLabel,
    invalid,
    invalidText,
    warn,
    warnText,
    helperText,
    light,
    size,
    inline,
    ...other
  },
  ref
) {
  const errorId = id + '-error-msg';
  const warnId = id + '-warn-msg';
  const textInputClasses = classNames(`${prefix}--text-input`, className, {
    [`${prefix}--text-input--light`]: light,
    [`${prefix}--text-input--invalid`]: invalid,
    [`${prefix}--text-input--${size}`]: size,
  });
  const sharedTextInputProps = {
    id,
    onChange: (evt) => {
      if (!other.disabled) {
        onChange(evt);
      }
    },
    onClick: (evt) => {
      if (!other.disabled) {
        onClick(evt);
      }
    },
    placeholder,
    type,
    ref,
    className: textInputClasses,
    title: placeholder,
    ...other,
  };
  const inputWrapperClasses = classNames(
    `${prefix}--form-item`,
    `${prefix}--text-input-wrapper`,
    {
      [`${prefix}--text-input-wrapper--light`]: light,
      [`${prefix}--text-input-wrapper--inline`]: inline,
    }
  );
  const labelClasses = classNames(`${prefix}--label`, {
    [`${prefix}--visually-hidden`]: hideLabel,
    [`${prefix}--label--disabled`]: other.disabled,
    [`${prefix}--label--inline`]: inline,
    [`${prefix}--label--inline--${size}`]: inline && !!size,
  });
  const helperTextClasses = classNames(`${prefix}--form__helper-text`, {
    [`${prefix}--form__helper-text--disabled`]: other.disabled,
    [`${prefix}--form__helper-text--inline`]: inline,
  });
  const fieldOuterWrapperClasses = classNames(
    `${prefix}--text-input__field-outer-wrapper`,
    {
      [`${prefix}--text-input__field-outer-wrapper--inline`]: inline,
    }
  );
  const fieldWrapperClasses = classNames(
    `${prefix}--text-input__field-wrapper`,
    {
      [`${prefix}--text-input__field-wrapper--warning`]: !invalid && warn,
    }
  );
  const label = labelText ? (
    <label htmlFor={id} className={labelClasses}>
      {labelText}
    </label>
  ) : null;
  let error = null;
  if (invalid) {
    error = (
      <div className={`${prefix}--form-requirement`} id={errorId}>
        {invalidText}
      </div>
    );
  } else if (warn) {
    error = (
      <div className={`${prefix}--form-requirement`} id={warnId}>
        {warnText}
      </div>
    );
  }
  const input = (
    <input
      {...textInputProps({
        invalid,
        sharedTextInputProps,
        errorId,
        warn,
        warnId,
      })}
    />
  );
  const helper = helperText ? (
    <div className={helperTextClasses}>{helperText}</div>
  ) : null;

  const { isFluid } = useContext(FormContext);

  return (
    <div className={inputWrapperClasses}>
      {!inline ? (
        label
      ) : (
        <div className={`${prefix}--text-input__label-helper-wrapper`}>
          {label}
          {!isFluid && helper}
        </div>
      )}
      <div className={fieldOuterWrapperClasses}>
        <div className={fieldWrapperClasses} data-invalid={invalid || null}>
          {invalid && (
            <WarningFilled16
              className={`${prefix}--text-input__invalid-icon`}
            />
          )}
          {!invalid && warn && (
            <WarningAltFilled16
              className={`${prefix}--text-input__invalid-icon ${prefix}--text-input__invalid-icon--warning`}
            />
          )}
          {input}
          {isFluid && <hr className={`${prefix}--text-input__divider`} />}
          {/* <hr className={`${prefix}--text-input__divider`} /> */}
          {isFluid && !inline && error}
        </div>
        {!isFluid && error}
        {!invalid && !warn && !isFluid && !inline && helper}
      </div>
    </div>
  );
});

TextInput.PasswordInput = PasswordInput;
TextInput.ControlledPasswordInput = ControlledPasswordInput;
TextInput.propTypes = {
  /**
   * Specify an optional className to be applied to the `<input>` node
   */
  className: PropTypes.string,

  /**
   * Optionally provide the default value of the `<input>`
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText: PropTypes.node,

  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  hideLabel: PropTypes.bool,

  /**
   * Specify a custom `id` for the `<input>`
   */
  id: PropTypes.string.isRequired,

  /**
   * `true` to use the inline version.
   */
  inline: PropTypes.bool,

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
   * `true` to use the light version.
   */
  light: PropTypes.bool,

  /**
   * Optionally provide an `onChange` handler that is called whenever `<input>`
   * is updated
   */
  onChange: PropTypes.func,

  /**
   * Optionally provide an `onClick` handler that is called whenever the
   * `<input>` is clicked
   */
  onClick: PropTypes.func,

  /**
   * Specify the placeholder attribute for the `<input>`
   */
  placeholder: PropTypes.string,

  /**
   * Specify the size of the Text Input. Currently supports either `sm` or `xl` as an option.
   */
  size: PropTypes.oneOf(['sm', 'xl']),

  /**
   * Specify the type of the `<input>`
   */
  type: PropTypes.string,

  /**
   * Specify the value of the `<input>`
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,
  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};

TextInput.defaultProps = {
  disabled: false,
  type: 'text',
  onChange: () => {},
  onClick: () => {},
  invalid: false,
  invalidText: '',
  warn: false,
  warnText: '',
  helperText: '',
  light: false,
  inline: false,
};

export default TextInput;
