/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Calendar, WarningFilled, WarningAltFilled } from '@carbon/icons-react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm';

const DatePickerInput = React.forwardRef(function DatePickerInput(props, ref) {
  const {
    datePickerType,
    disabled = false,
    helperText,
    hideLabel,
    id,
    invalid = false,
    invalidText,
    labelText,
    onClick = () => {},
    onChange = () => {},
    pattern = '\\d{1,2}\\/\\d{1,2}\\/\\d{4}',
    placeholder,
    size = 'md',
    type = 'text',
    warn,
    warnText,
    ...rest
  } = props;
  const prefix = usePrefix();
  const { isFluid } = useContext(FormContext);
  const datePickerInputProps = {
    id,
    onChange: (event) => {
      if (!disabled) {
        onChange(event);
      }
    },
    onClick: (event) => {
      if (!disabled) {
        onClick(event);
      }
    },
    pattern,
    placeholder,
    type,
  };
  const wrapperClasses = cx(`${prefix}--date-picker-input__wrapper`, {
    [`${prefix}--date-picker-input__wrapper--invalid`]: invalid,
    [`${prefix}--date-picker-input__wrapper--warn`]: warn,
  });
  const labelClasses = cx(`${prefix}--label`, {
    [`${prefix}--visually-hidden`]: hideLabel,
    [`${prefix}--label--disabled`]: disabled,
    [`${prefix}--label--readonly`]: rest.readOnly,
  });
  const helperTextClasses = cx(`${prefix}--form__helper-text`, {
    [`${prefix}--form__helper-text--disabled`]: disabled,
  });
  const inputClasses = cx(`${prefix}--date-picker__input`, {
    [`${prefix}--date-picker__input--${size}`]: size,
    [`${prefix}--date-picker__input--invalid`]: invalid,
    [`${prefix}--date-picker__input--warn`]: warn,
  });
  const containerClasses = cx(`${prefix}--date-picker-container`, {
    [`${prefix}--date-picker--nolabel`]: !labelText,
    [`${prefix}--date-picker--fluid--invalid`]: isFluid && invalid,
    [`${prefix}--date-picker--fluid--warn`]: isFluid && warn,
  });

  const inputProps = {
    ...rest,
    ...datePickerInputProps,
    className: inputClasses,
    disabled,
    ref,
  };
  if (invalid) {
    inputProps['data-invalid'] = true;
  }
  const input = <input {...inputProps} />;

  return (
    <div className={containerClasses}>
      {labelText && (
        <label htmlFor={id} className={labelClasses}>
          {labelText}
        </label>
      )}
      <div className={wrapperClasses}>
        {input}
        {isFluid && <DatePickerIcon datePickerType={datePickerType} />}
        <DatePickerIcon
          datePickerType={datePickerType}
          invalid={invalid}
          warn={warn}
        />
      </div>
      {invalid && (
        <>
          {isFluid && <hr className={`${prefix}--date-picker__divider`} />}
          <div className={`${prefix}--form-requirement`}>{invalidText}</div>
        </>
      )}
      {warn && (
        <>
          {isFluid && <hr className={`${prefix}--date-picker__divider`} />}
          <div className={`${prefix}--form-requirement`}>{warnText}</div>
        </>
      )}
      {helperText && <div className={helperTextClasses}>{helperText}</div>}
    </div>
  );
});

DatePickerInput.propTypes = {
  /**
   * The type of the date picker:
   *
   * * `simple` - Without calendar dropdown.
   * * `single` - With calendar dropdown and single date.
   * * `range` - With calendar dropdown and a date range.
   */
  datePickerType: PropTypes.oneOf(['simple', 'single', 'range']),

  /**
   * Specify whether or not the input should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText: PropTypes.node,

  /**
   * Specify if the label should be hidden
   */
  hideLabel: PropTypes.bool,

  /**
   * Specify an id that uniquely identifies the `<input>`
   */
  id: PropTypes.string.isRequired,

  /**
   * Specify whether or not the input should be invalid
   */
  invalid: PropTypes.bool,

  /**
   * Specify the text to be rendered when the input is invalid
   */
  invalidText: PropTypes.node,

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: PropTypes.node.isRequired,

  /**
   * Specify an `onChange` handler that is called whenever a change in the
   * input field has occurred
   */
  onChange: PropTypes.func,

  /**
   * Provide a function to be called when the input field is clicked
   */
  onClick: PropTypes.func,

  /**
   * Provide a regular expression that the input value must match
   */
  pattern: (props, propName, componentName) => {
    if (props[propName] === undefined) {
      return;
    }
    try {
      new RegExp(props[propName]);
    } catch (e) {
      return new Error(
        `Invalid value of prop '${propName}' supplied to '${componentName}', it should be a valid regular expression`
      );
    }
  },

  /**
   * Specify the placeholder text
   */
  placeholder: PropTypes.string,

  /**
   * whether the DatePicker is to be readOnly
   */
  readOnly: PropTypes.bool,

  /**
   * Specify the size of the Date Picker Input. Currently supports either `sm`, `md`, or `lg` as an option.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * Specify the type of the `<input>`
   */
  type: PropTypes.string,

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};

function DatePickerIcon({ datePickerType, invalid, warn }) {
  const prefix = usePrefix();
  const { isFluid } = useContext(FormContext);

  if (datePickerType === 'simple' && !invalid && !warn) {
    if (!isFluid) {
      return null;
    }
  }

  if (invalid) {
    return (
      <WarningFilled
        className={`${prefix}--date-picker__icon ${prefix}--date-picker__icon--invalid`}
      />
    );
  }

  if (!invalid && warn) {
    return (
      <WarningAltFilled
        className={`${prefix}--date-picker__icon ${prefix}--date-picker__icon--warn`}
      />
    );
  }

  return (
    <Calendar
      className={`${prefix}--date-picker__icon`}
      role="img"
      aria-hidden="true"></Calendar>
  );
}

DatePickerIcon.propTypes = {
  /**
   * The type of the date picker:
   *
   * * `simple` - Without calendar dropdown.
   * * `single` - With calendar dropdown and single date.
   * * `range` - With calendar dropdown and a date range.
   */
  datePickerType: PropTypes.oneOf(['simple', 'single', 'range']),

  /**
   * Specify whether or not the input should be invalid
   */
  invalid: PropTypes.bool,

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,
};

export default DatePickerInput;
