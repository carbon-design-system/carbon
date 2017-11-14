import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

export default class TimePicker extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    labelText: PropTypes.string,
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
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
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
        {label}
        <div className={timePickerClasses}>
          <div className="bx--time-picker__input">
            <input
              {...other}
              {...timePickerInputProps}
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
