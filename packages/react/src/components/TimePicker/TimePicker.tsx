/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { usePrefix } from '../../internal/usePrefix';
import deprecate from '../../prop-types/deprecate';
import { ForwardRefReturn, ReactAttr } from '../../types/common';
import { WarningFilled, WarningAltFilled } from '@carbon/icons-react';

type ExcludedAttributes = 'id' | 'value';

export interface TimePickerProps
  extends Omit<ReactAttr<HTMLInputElement>, ExcludedAttributes> {
  /**
   * Pass in the children that will be rendered next to the form control
   */
  children?: React.ReactNode;

  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;

  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled?: boolean;

  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  hideLabel?: boolean;

  /**
   * Specify a custom `id` for the `<input>`
   */
  id: string;

  /**
   * Specify whether the control is currently invalid
   */
  invalid?: boolean;

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText?: React.ReactNode;

  /**
   * Specify a warning message
   */
  warning?: boolean;

  /**
   * Provide the text that is displayed when the control is in an warning state
   */
  warningText?: React.ReactNode;

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText?: React.ReactNode;

  /**
   * The `light` prop for `TimePicker` has been deprecated. It will be removed in v12. Use the `Layer` component instead.
   *
   * @deprecated The `light` prop for `TimePicker` is no longer needed and has been deprecated. It will be removed in the next major release. Use the `Layer` component instead.
   */
  light?: boolean;

  /**
   * Specify the maximum length of the time string in `<input>`
   */
  maxLength?: number;

  /**
   * Optionally provide an `onBlur` handler that is called whenever the
   * `<input>` loses focus
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;

  /**
   * Optionally provide an `onChange` handler that is called whenever `<input>`
   * is updated
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;

  /**
   * Optionally provide an `onClick` handler that is called whenever the
   * `<input>` is clicked
   */
  onClick?: React.MouseEventHandler<HTMLInputElement>;

  /**
   * Specify the regular expression working as the pattern of the time string in `<input>`
   */
  pattern?: string;

  /**
   * Specify the placeholder attribute for the `<input>`
   */
  placeholder?: string;

  /**
   * Specify whether the TimePicker should be read-only
   */
  readOnly?: boolean;

  /**
   * Specify the size of the Time Picker.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Specify the type of the `<input>`
   */
  type?: string;

  /**
   * Specify the value of the `<input>`
   */
  value?: string;
}

export type TimePickerComponent = ForwardRefReturn<
  HTMLInputElement,
  TimePickerProps
>;

const TimePicker: TimePickerComponent = React.forwardRef<
  HTMLInputElement,
  TimePickerProps
>(function TimePicker(
  {
    children,
    className,
    disabled = false,
    hideLabel,
    id,
    invalidText = 'Invalid time format.',
    invalid = false,
    warningText = 'Warning message.',
    warning = false,
    labelText,
    light = false,
    maxLength = 5,
    onChange = () => {},
    onClick = () => {},
    onBlur = () => {},
    pattern = '(1[012]|[1-9]):[0-5][0-9](\\s)?',
    placeholder = 'hh:mm',
    readOnly,
    size = 'md',
    type = 'text',
    value,
    ...rest
  },
  ref: React.LegacyRef<HTMLInputElement>
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
      if (!readOnly) {
        setValue(isValue);
      }
      onClick(evt);
    }
  }

  function handleOnChange(evt) {
    if (!disabled && !readOnly) {
      setValue(isValue);
      onChange(evt);
    }
  }

  function handleOnBlur(evt) {
    if (!disabled) {
      if (!readOnly) {
        setValue(isValue);
      }
      onBlur(evt);
    }
  }

  const timePickerInputClasses = cx(
    `${prefix}--time-picker__input-field`,
    `${prefix}--text-input`,
    [className],
    {
      [`${prefix}--text-input--light`]: light,
      [`${prefix}--time-picker__input-field-error`]: invalid || warning,
    }
  );

  const timePickerClasses = cx({
    [`${prefix}--time-picker`]: true,
    [`${prefix}--time-picker--light`]: light,
    [`${prefix}--time-picker--invalid`]: invalid,
    [`${prefix}--time-picker--warning`]: warning,
    [`${prefix}--time-picker--readonly`]: readOnly,
    [`${prefix}--time-picker--${size}`]: size,
    ...(className && { [className]: true }),
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

  function getInternalPickerSelects() {
    const readOnlyEventHandlers = {
      onMouseDown: (evt) => {
        // NOTE: does not prevent click
        if (readOnly) {
          evt.preventDefault();
          // focus on the element as per readonly input behavior
          evt.target.focus();
        }
      },
      onKeyDown: (evt) => {
        const selectAccessKeys = ['ArrowDown', 'ArrowUp', ' '];
        // This prevents the select from opening for the above keys
        if (readOnly && selectAccessKeys.includes(evt.key)) {
          evt.preventDefault();
        }
      },
    };

    const mappedChildren = React.Children.map(children, (pickerSelect) => {
      const item = pickerSelect as any;

      if (item) {
        return React.cloneElement(item, {
          ...item.props,
          disabled: disabled,
          readOnly: readOnly,
          ...readOnlyEventHandlers,
        });
      }
    });

    return mappedChildren;
  }

  const readOnlyProps = {
    readOnly: readOnly,
  };

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
            {...readOnlyProps}
          />
          {(invalid || warning) && (
            <div className={`${prefix}--time-picker__error__icon`}>
              {invalid ? (
                <WarningFilled
                  className={`${prefix}--checkbox__invalid-icon`}
                  size={16}
                />
              ) : (
                <WarningAltFilled
                  className={`${prefix}--text-input__invalid-icon--warning`}
                  size={16}
                />
              )}
            </div>
          )}
        </div>
        {getInternalPickerSelects()}
      </div>
      {(invalid || warning) && (
        <div className={`${prefix}--form-requirement`}>
          {invalid ? invalidText : warningText}
        </div>
      )}
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
   * The `light` prop for `TimePicker` has been deprecated. It will be removed in v12. Use the `Layer` component instead.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `TimePicker` is no longer needed and has been deprecated. It will be removed in the next major release. Use the `Layer` component instead.'
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
   * Specify whether the TimePicker should be read-only
   */
  readOnly: PropTypes.bool,

  /**
   * Specify the size of the Time Picker.
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

  /**
   * Specify a warning message
   */
  warning: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in an warning state
   */
  warningText: PropTypes.node,
};

export default TimePicker;
