/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import { Calendar16 } from '@carbon/icons-react';

const { prefix } = settings;

export default class DatePickerInput extends Component {
  static propTypes = {
    /**
     * Specify an id that unique identifies the <input>
     */
    id: PropTypes.string.isRequired,

    /**
     * The description of the calendar icon.
     */
    iconDescription: PropTypes.string,

    /**
     * Provide the text that will be read by a screen reader when visiting this
     * control
     */
    labelText: PropTypes.node.isRequired,

    /**
     * Provide text to be read to screen readers so we can tell user that
     * he/she can start using calendar dropdown with down arrow key
     */
    calendarDropdownAssistiveText: PropTypes.string,
  };

  static defaultProps = {
    pattern: '\\d{1,2}\\/\\d{1,2}\\/\\d{4}',
    type: 'text',
    disabled: false,
    invalid: false,
    calendarDropdownAssistiveText: [
      'Use down arrow key to navigate to calendar dropdown.',
      'Use arrow keys to navigate through dates.',
      'Use control-arrow keys to increment and decrement year and month.',
    ].join(' '),
    onClick: () => {},
    onChange: () => {},
  };

  render() {
    const {
      id,
      labelText,
      disabled,
      invalid,
      invalidText,
      hideLabel,
      onChange,
      onClick,
      placeholder,
      type,
      datePickerType,
      pattern,
      iconDescription,
      openCalendar,
      calendarDropdownAssistiveText,
      ...other
    } = this.props;

    const datePickerInputProps = {
      id,
      onChange: evt => {
        if (!disabled) {
          onChange(evt);
        }
      },
      onClick: evt => {
        if (!disabled) {
          onClick(evt);
        }
      },
      placeholder,
      type,
      pattern,
      'aria-describedby':
        datePickerType === 'simple' ? undefined : `${id}__assistive-text`,
    };

    const labelClasses = classNames(`${prefix}--label`, {
      [`${prefix}--visually-hidden`]: hideLabel,
      [`${prefix}--label--disabled`]: disabled,
    });

    const datePickerIcon = (() => {
      if (datePickerType === 'simple') {
        return;
      }
      return (
        <Calendar16
          className={`${prefix}--date-picker__icon`}
          aria-label={iconDescription}
          onClick={openCalendar}
          role="img">
          {iconDescription && <title>{iconDescription}</title>}
        </Calendar16>
      );
    })();

    const label = labelText ? (
      <label htmlFor={id} className={labelClasses}>
        {labelText}
      </label>
    ) : null;

    const error = invalid ? (
      <div className={`${prefix}--form-requirement`}>{invalidText}</div>
    ) : null;

    const containerClasses = classNames(`${prefix}--date-picker-container`, {
      [`${prefix}--date-picker--nolabel`]: !label,
    });

    const input = invalid ? (
      <input
        {...other}
        {...datePickerInputProps}
        disabled={disabled}
        ref={input => {
          this.input = input;
        }}
        data-invalid
        className={`${prefix}--date-picker__input`}
      />
    ) : (
      <input
        ref={input => {
          this.input = input;
        }}
        {...other}
        {...datePickerInputProps}
        disabled={disabled}
        className={`${prefix}--date-picker__input`}
      />
    );

    return (
      <div className={containerClasses}>
        {label}
        <div className={`${prefix}--date-picker-input__wrapper`}>
          {input}
          {datePickerIcon}
          {datePickerType !== 'simple' && (
            <div
              id={`${id}__assistive-text`}
              className={`${prefix}--assistive-text`}>
              {calendarDropdownAssistiveText}
            </div>
          )}
        </div>
        {error}
      </div>
    );
  }
}
