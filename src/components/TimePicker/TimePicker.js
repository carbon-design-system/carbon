import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

export default class TimePicker extends Component {
  state = {};

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    labelText: PropTypes.node,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    type: PropTypes.string,
    pattern: PropTypes.string,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    invalid: PropTypes.bool,
    invalidText: PropTypes.string,
    hideLabel: PropTypes.bool,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    /**
     * `true` to use the light version.
     */
    light: PropTypes.bool,
  };

  static defaultProps = {
    type: 'text',
    pattern: '(1[012]|[1-9]):[0-5][0-9](\\s)?(?i)',
    placeholder: 'hh:mm',
    maxLength: 5,
    invalidText: 'Invalid time format.',
    invalid: false,
    disabled: false,
    onChange: () => {},
    onClick: () => {},
    onBlur: () => {},
    light: false,
  };

  static getDerivedStateFromProps({ value }, state) {
    const { prevValue } = state;
    return prevValue === value
      ? null
      : {
          value,
          prevValue: value,
        };
  }

  render() {
    const {
      children,
      className,
      id,
      labelText,
      type,
      pattern,
      onChange,
      onClick,
      onBlur,
      placeholder,
      maxLength,
      invalidText,
      invalid,
      hideLabel,
      light,
      ...other
    } = this.props;

    const timePickerInputProps = {
      onChange: evt => {
        if (!other.disabled) {
          this.setState({
            value: evt.target.value,
          });
          onChange(evt);
        }
      },
      onClick: evt => {
        if (!other.disabled) {
          this.setState({
            value: evt.target.value,
          });
          onClick(evt);
        }
      },
      onBlur: evt => {
        if (!other.disabled) {
          this.setState({
            value: evt.target.value,
          });
          onBlur(evt);
        }
      },
      pattern,
      placeholder,
      maxLength,
      id,
      type,
      value: this.state.value,
    };

    const timePickerClasses = classNames({
      'bx--time-picker': true,
      'bx--time-picker--light': light,
      [className]: className,
    });

    const labelClasses = classNames('bx--label', {
      'bx--visually-hidden': hideLabel,
    });

    const label = labelText ? (
      <label htmlFor={id} className={labelClasses}>
        {labelText}
      </label>
    ) : null;

    const error = invalid ? (
      <div className="bx--form-requirement">{invalidText}</div>
    ) : null;

    return (
      <div className="bx--form-item">
        <div className={timePickerClasses}>
          <div className="bx--time-picker__input">
            {label}
            <input
              {...other}
              {...timePickerInputProps}
              data-invalid={invalid ? invalid : undefined}
              className="bx--time-picker__input-field"
            />
            {error}
          </div>
          {children}
        </div>
      </div>
    );
  }
}
