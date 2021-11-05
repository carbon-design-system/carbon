import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { usePrefix } from '../../../internal/usePrefix';
import {
  Calendar,
  WarningFilled,
  WarningAltFilled,
} from '@carbon/icons-react/next';

const DatePickerInput = React.forwardRef(function DatePickerInput(
  {
    id,
    labelText,
    disabled = false,
    invalid = false,
    invalidText,
    helperText,
    hideLabel,
    onChange = () => {},
    onClick = () => {},
    placeholder,
    type = 'text',
    datePickerType,
    pattern = '\\d{1,2}\\/\\d{1,2}\\/\\d{4}',
    iconDescription,
    openCalendar,
    size,
    warn,
    warnText,
    ...other
  },
  ref
) {
  const prefix = usePrefix();

  const datePickerInputProps = {
    id,
    onChange: (evt) => {
      if (!disabled) {
        onChange(evt);
      }
    },
    onClick: (evt) => {
      if (!disabled) {
        onClick(evt);
      }
    },
    placeholder,
    type,
    pattern,
  };

  const wrapperClasses = classNames(
    `${prefix}--date-picker-input__wrapper NEXT-WRAPPER`,
    {
      [`${prefix}--date-picker-input__wrapper--invalid`]: invalid,
      [`${prefix}--date-picker-input__wrapper--warn`]: warn,
    }
  );

  const labelClasses = classNames(`${prefix}--label`, {
    [`${prefix}--visually-hidden`]: hideLabel,
    [`${prefix}--label--disabled`]: disabled,
  });

  const helperTextClasses = classNames(`${prefix}--form__helper-text`, {
    [`${prefix}--form__helper-text--disabled`]: disabled,
  });

  const inputClasses = classNames(`${prefix}--date-picker__input`, {
    [`${prefix}--date-picker__input--${size}`]: size,
    [`${prefix}--date-picker__input--invalid`]: invalid,
  });

  const datePickerIcon = (() => {
    if (datePickerType === 'simple' && !invalid && !warn) {
      return;
    }

    if (invalid) {
      return (
        <WarningFilled
          size={16}
          className={`${prefix}--date-picker__icon ${prefix}--date-picker__icon--invalid`}
        />
      );
    }

    if (!invalid && warn) {
      return (
        <WarningAltFilled
          size={16}
          className={`${prefix}--date-picker__icon ${prefix}--date-picker__icon--warn`}
        />
      );
    }

    return (
      <Calendar
        size={16}
        className={`${prefix}--date-picker__icon`}
        aria-label={iconDescription}
        onClick={openCalendar}
        role="img">
        {iconDescription && <title>{iconDescription}</title>}
      </Calendar>
    );
  })();

  const label = labelText ? (
    <label htmlFor={id} className={labelClasses}>
      {labelText}
    </label>
  ) : null;

  const helper = helperText ? (
    <div className={helperTextClasses}>{helperText}</div>
  ) : null;

  let error = null;
  if (invalid) {
    error = <div className={`${prefix}--form-requirement`}>{invalidText}</div>;
  } else if (warn) {
    error = <div className={`${prefix}--form-requirement`}>{warnText}</div>;
  }

  const containerClasses = classNames(`${prefix}--date-picker-container`, {
    [`${prefix}--date-picker--nolabel`]: !label,
  });

  const input = invalid ? (
    <input
      {...other}
      {...datePickerInputProps}
      disabled={disabled}
      ref={ref}
      data-invalid
      className={inputClasses}
    />
  ) : (
    <input
      ref={ref}
      {...other}
      {...datePickerInputProps}
      disabled={disabled}
      className={inputClasses}
    />
  );

  return (
    <div className={containerClasses}>
      {label}
      <div className={wrapperClasses}>
        {input}
        {datePickerIcon}
      </div>
      {error}
      {helper}
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
   * The description of the calendar icon.
   */
  iconDescription: PropTypes.string,

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
   * Provide a function to be called when the input field is clicked
   */
  openCalendar: PropTypes.func,

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
   * Specify the size of the Date Picker Input. Currently supports either `sm`, 'md' (default) or 'lg` as an option.
   * TODO V11: remove `xl` (replaced with lg)
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),

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

export default DatePickerInput;
