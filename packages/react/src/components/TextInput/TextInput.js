/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import WarningFilled16 from '@carbon/icons-react/lib/warning--filled/16';
import PasswordInput from './PasswordInput';
import ControlledPasswordInput from './ControlledPasswordInput';
import { textInputProps } from './util';

const { prefix } = settings;
const DefaultCharCounter = ({ disabled, count, maxLength }) => {
  const charCounterClasses = classNames(
    `${prefix}--text-input--character-counter`,
    {
      [`${prefix}--text-input--character-counter--disabled`]: disabled,
    }
  );
  return (
    <span className={charCounterClasses}>
      <span className={`${prefix}--text-input--character-counter--length`}>
        {count}
      </span>
      /
      <span className={`${prefix}--text-input--character-counter--maxlength`}>
        {maxLength}
      </span>
    </span>
  );
};
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
    helperText,
    light,
    charCount,
    renderCharCounter: CharCounter = DefaultCharCounter,
    defaultValue,
    maxLength,
    ...other
  },
  ref
) {
  const [inputVal, setInput] = useState(defaultValue);
  const errorId = id + '-error-msg';
  const textInputClasses = classNames(`${prefix}--text-input`, className, {
    [`${prefix}--text-input--light`]: light,
    [`${prefix}--text-input--invalid`]: invalid,
  });
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
    type,
    ref,
    className: textInputClasses,
    maxLength: maxLength || null,
    ...other,
  };
  const labelClasses = classNames(`${prefix}--label`, {
    [`${prefix}--visually-hidden`]: hideLabel,
    [`${prefix}--label--disabled`]: other.disabled,
  });
  const helperTextClasses = classNames(`${prefix}--form__helper-text`, {
    [`${prefix}--form__helper-text--disabled`]: other.disabled,
  });
  const label = (() => {
    const labelContent = labelText && (
      <label htmlFor={id} className={labelClasses}>
        {labelText}
      </label>
    );
    if (labelContent && charCount) {
      return (
        <div className={`${prefix}--text-input__character-counter-title`}>
          {labelContent}
          <CharCounter
            disabled={other.disabled}
            count={inputVal.length}
            maxLength={maxLength}
          />
        </div>
      );
    }
    return labelContent;
  })();
  const error = invalid ? (
    <div className={`${prefix}--form-requirement`} id={errorId}>
      {invalidText}
    </div>
  ) : null;
  const input = (
    <input
      {...textInputProps({ invalid, sharedTextInputProps, errorId })}
      value={inputVal}
      onInput={e => setInput(e.target.value)}
    />
  );
  const helper = (() => {
    const helperContent = helperText ? (
      <div className={helperTextClasses}>{helperText}</div>
    ) : null;
    if (!labelText && charCount) {
      return (
        <div className={`${prefix}--text-input__character-counter-title`}>
          {helperContent}
          <CharCounter
            disabled={other.disabled}
            count={inputVal.length}
            maxLength={maxLength}
          />
        </div>
      );
    }

    return helperContent;
  })();

  return (
    <div className={`${prefix}--form-item ${prefix}--text-input-wrapper`}>
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
});

TextInput.PasswordInput = PasswordInput;
TextInput.ControlledPasswordInput = ControlledPasswordInput;
TextInput.propTypes = {
  /**
   * Specify an optional className to be applied to the <input> node
   */
  className: PropTypes.string,

  /**
   * Optionally provide the default value of the <input>
   */
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the <input> should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify a custom `id` for the <input>
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
   * Specify the type of the <input>
   */
  type: PropTypes.string,

  /**
   * Specify the value of the <input>
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether you want the underlying label to be visually hidden
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
   * `true` to use the light version.
   */
  light: PropTypes.bool,

  /**
   * Specify whether the character counter is shown
   */
  charCount: PropTypes.bool,

  /**
   * The maximum allowed input value length
   */
  maxLength: PropTypes.number,
};

TextInput.defaultProps = {
  disabled: false,
  type: 'text',
  onChange: () => {},
  onClick: () => {},
  invalid: false,
  invalidText: '',
  helperText: '',
  light: false,
};

export default TextInput;
