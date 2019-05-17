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

const { prefix } = settings;

export default class TimePicker extends Component {
  state = {};

  static propTypes = {
    /**
     * Pass in the children that will be rendered next to the form control
     */
    children: PropTypes.node,

    /**
     * Specify an optional className to be applied to the container node
     */
    className: PropTypes.string,

    /**
     * Specify a custom `id` for the <input>
     */
    id: PropTypes.string.isRequired,

    /**
     * Provide the text that will be read by a screen reader when visiting this
     * control
     */
    labelText: PropTypes.node,

    /**
     * Optionally provide an `onClick` handler that is called whenever the
     * <input> is clicked
     */
    onClick: PropTypes.func,

    /**
     * Optionally provide an `onChange` handler that is called whenever <input>
     * is updated
     */
    onChange: PropTypes.func,

    /**
     * Optionally provide an `onBlur` handler that is called whenever the
     * <input> loses focus
     */
    onBlur: PropTypes.func,

    /**
     * Specify the type of the <input>
     */
    type: PropTypes.string,

    /**
     * Specify the regular expression working as the pattern of the time string in <input>
     */
    pattern: PropTypes.string,

    /**
     * Specify the placeholder attribute for the <input>
     */
    placeholder: PropTypes.string,

    /**
     * Specify the maximum length of the time string in <input>
     */
    maxLength: PropTypes.number,

    /**
     * Specify whether the control is currently invalid
     */
    invalid: PropTypes.bool,

    /**
     * Provide the text that is displayed when the control is in an invalid state
     */
    invalidText: PropTypes.string,

    /**
     * Specify whether you want the underlying label to be visually hidden
     */
    hideLabel: PropTypes.bool,

    /**
     * Specify whether the <input> should be disabled
     */
    disabled: PropTypes.bool,

    /**
     * Specify the value of the <input>
     */
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
      className: classNames(
        `${prefix}--time-picker__input-field`,
        `${prefix}--text-input`,
        className,
        {
          [`${prefix}--text-input--light`]: light,
          [`${prefix}--text-input--invalid`]: invalid,
        }
      ),
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
      [`${prefix}--time-picker`]: true,
      [`${prefix}--time-picker--light`]: light,
      [className]: className,
    });

    const labelClasses = classNames(`${prefix}--label`, {
      [`${prefix}--visually-hidden`]: hideLabel,
      [`${prefix}--label--disabled`]: other.disabled,
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
      <div className={`${prefix}--form-item`}>
        <div className={timePickerClasses}>
          <div className={`${prefix}--time-picker__input`}>
            {label}
            <input
              {...other}
              {...timePickerInputProps}
              data-invalid={invalid ? invalid : undefined}
            />
            {error}
          </div>
          {children}
        </div>
      </div>
    );
  }
}
