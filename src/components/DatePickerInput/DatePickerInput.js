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
import Icon from '../Icon';

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
  };

  static defaultProps = {
    pattern: '\\d{1,2}\\/\\d{1,2}\\/\\d{4}',
    type: 'text',
    disabled: false,
    invalid: false,
    labelText: '',
    onClick: () => {},
    onChange: () => {},
  };

  render() {
    const {
      id,
      labelText,
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
      ...other
    } = this.props;

    const datePickerInputProps = {
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
      pattern,
    };

    const labelClasses = classNames(`${prefix}--label`, {
      [`${prefix}--visually-hidden`]: hideLabel,
    });

    const datePickerIcon =
      datePickerType === 'single' ? (
        <Icon
          name="calendar"
          className={`${prefix}--date-picker__icon`}
          description={iconDescription}
          onClick={openCalendar}
        />
      ) : (
        ''
      );

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
        className={`${prefix}--date-picker__input`}
      />
    );

    return (
      <div className={containerClasses}>
        {datePickerIcon}
        {label}
        {input}
        {error}
      </div>
    );
  }
}
