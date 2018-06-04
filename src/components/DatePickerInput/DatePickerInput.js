import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';

export default class DatePickerInput extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node,
    value: PropTypes.string,
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

    const labelClasses = classNames('bx--label', {
      'bx--visually-hidden': hideLabel,
    });

    const datePickerIcon =
      datePickerType === 'single' ? (
        <Icon name="calendar" className="bx--date-picker__icon" />
      ) : (
        ''
      );

    const label = labelText ? (
      <label htmlFor={id} className={labelClasses}>
        {labelText}
      </label>
    ) : null;

    const error = invalid ? (
      <div className="bx--form-requirement">{invalidText}</div>
    ) : null;

    const input = invalid ? (
      <input
        {...other}
        {...datePickerInputProps}
        ref={input => {
          this.input = input;
        }}
        data-invalid
        className="bx--date-picker__input"
      />
    ) : (
      <input
        ref={input => {
          this.input = input;
        }}
        {...other}
        {...datePickerInputProps}
        className="bx--date-picker__input"
      />
    );

    return (
      <div className="bx--date-picker-container">
        {datePickerIcon}
        {input}
        {label}
        {error}
      </div>
    );
  }
}
