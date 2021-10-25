/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { usePrefix } from '../../../internal/usePrefix';
import deprecate from '../../../prop-types/deprecate';

const TimePicker = React.forwardRef(function TimePicker(
  {
    children,
    className,
    disabled = false,
    hideLabel,
    id,
    invalidText = 'Invalid time format.',
    invalid = false,
    labelText,
    light = false,
    maxLength = 5,
    onChange = () => {},
    onClick = () => {},
    onBlur = () => {},
    pattern = '(1[012]|[1-9]):[0-5][0-9](\\s)?',
    placeholder = 'hh:mm',
    size,
    type = 'text',
    value,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();

  const [isValue, setValue] = React.useState(value);
  const [prevValue, setPrevValue] = React.useState(value);

  if (value !== prevValue) {
    setValue(value);
    setPrevValue(value);
  }

  function handleOnClick(evt) {
    if (!disabled) {
      setValue(isValue);
      onClick(evt);
    }
  }

  function handleOnChange(evt) {
    if (!disabled) {
      setValue(isValue);
      onChange(evt);
    }
  }

  function handleOnBlur(evt) {
    if (!disabled) {
      setValue(isValue);
      onBlur(evt);
    }
  }

  const timePickerInputClasses = cx(
    `${prefix}--time-picker__input-field`,
    `${prefix}--text-input`,
    [className],
    {
      [`${prefix}--text-input--light`]: light,
    }
  );

  const timePickerClasses = cx({
    [`${prefix}--time-picker`]: true,
    [`${prefix}--time-picker--light`]: light,
    [`${prefix}--time-picker--invalid`]: invalid,
    [`${prefix}--time-picker--${size}`]: size,
    [className]: className,
  });

  const labelClasses = cx(`${prefix}--label`, {
    [`${prefix}--visually-hidden`]: hideLabel,
    [`${prefix}--label--disabled`]: disabled,
  });

  const label = labelText ? (
    <label htmlFor={id} className={labelClasses}>
      {labelText}
    </label>
  ) : null;

  const error = invalid ? (
    <div className={`${prefix}--form-requirement`}>{invalidText}</div>
  ) : null;

  return (
    <div className={cx(`${prefix}--form-item`, className)}>
      {label}
      <div className={timePickerClasses}>
        <div className={`${prefix}--time-picker__input`}>
          <input
            className={timePickerInputClasses}
            data-invalid={invalid ? invalid : undefined}
            disabled={disabled}
            id={id}
            maxLength={maxLength}
            onClick={handleOnClick}
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            placeholder={placeholder}
            pattern={pattern}
            ref={ref}
            type={type}
            value={value}
            {...rest}
          />
        </div>
        {children}
      </div>
      {error}
    </div>
  );
});

TimePicker.propTypes = {
  /**
   * Pass in the children that will be rendered next to the form control
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  hideLabel: PropTypes.bool,

  /**
   * Specify a custom `id` for the `<input>`
   */
  id: PropTypes.string.isRequired,

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
  labelText: PropTypes.node,

  /**
   * `true` to use the light version. TODO: V12 remove this.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `Tile` is no longer needed and has been deprecated. It will be removed in the next major release. Use the Layer component instead.'
  ),

  /**
   * Specify the maximum length of the time string in `<input>`
   */
  maxLength: PropTypes.number,

  /**
   * Optionally provide an `onBlur` handler that is called whenever the
   * `<input>` loses focus
   */
  onBlur: PropTypes.func,

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
   * Specify the regular expression working as the pattern of the time string in `<input>`
   */
  pattern: PropTypes.string,

  /**
   * Specify the placeholder attribute for the `<input>`
   */
  placeholder: PropTypes.string,

  /**
   * Specify the size of the Time Picker. Currently supports either `sm`, 'md' (default) or 'lg` as an option.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * Specify the type of the `<input>`
   */
  type: PropTypes.string,

  /**
   * Specify the value of the `<input>`
   */
  value: PropTypes.string,
};

export default TimePicker;
