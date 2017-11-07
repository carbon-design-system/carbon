import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

export default class DatePickerInput extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node,
  };

  static defaultProps = {
    pattern: 'd{1,2}/d{1,2}/d{4}',
    type: 'text',
    disabled: false,
    invalid: false,
    labelText: 'Please provide label text',
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
        <svg
          className="bx--date-picker__icon"
          width="17"
          height="19"
          viewBox="0 0 17 19">
          <path d="M12 0h2v2.7h-2zM3 0h2v2.7H3z" />
          <path d="M0 2v17h17V2H0zm15 15H2V7h13v10z" />
          <path d="M9.9 15H8.6v-3.9H7.1v-.9c.9 0 1.7-.3 1.8-1.2h1v6z" />
        </svg>
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
        {label}
        {datePickerIcon}
        {input}
        {error}
      </div>
    );
  }
}
