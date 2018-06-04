import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Icon from '../Icon';
import classNames from 'classnames';

export default class NumberInput extends Component {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    iconDescription: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    max: PropTypes.number,
    min: PropTypes.number,
    /**
     * The new value is available in 'imaginaryTarget.value'
     * i.e. to get the value: evt.imaginaryTarget.value
     */
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    step: PropTypes.number,
    value: PropTypes.number,
    invalid: PropTypes.bool,
    invalidText: PropTypes.string,
    /**
     * `true` to use the light version.
     */
    light: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
    iconDescription: 'choose a number',
    label: ' ',
    onChange: () => {},
    onClick: () => {},
    step: 1,
    value: 0,
    invalid: false,
    invalidText: 'Provide invalidText',
    light: false,
  };

  /**
   * The DOM node refernce to the `<input>`.
   * @type {HTMLInputElement}
   */
  _inputRef = null;

  constructor(props) {
    super(props);

    let value = props.value;
    if (props.min || props.min === 0) {
      value = Math.max(props.min, value);
    }

    this.state = {
      value,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange = evt => {
    if (!this.props.disabled) {
      evt.persist();
      evt.imaginaryTarget = this._inputRef;
      this.setState(
        {
          value: evt.target.value,
        },
        () => {
          this.props.onChange(evt);
        }
      );
    }
  };

  handleArrowClick = (evt, direction) => {
    let value =
      typeof this.state.value === 'string'
        ? Number(this.state.value)
        : this.state.value;
    const { disabled, min, max, step } = this.props;
    const conditional =
      direction === 'down'
        ? (min !== undefined && value > min) || min === undefined
        : (max !== undefined && value < max) || max === undefined;

    if (!disabled && conditional) {
      value = direction === 'down' ? value - step : value + step;
      evt.persist();
      evt.imaginaryTarget = this._inputRef;
      this.setState(
        {
          value,
        },
        () => {
          this.props.onClick(evt, direction);
          this.props.onChange(evt, direction);
        }
      );
    }
  };

  /**
   * Preserves the DOM node ref of `<input>`.
   * @param {HTMLInputElement} ref The DOM node ref of `<input>`.
   */
  _handleInputRef = ref => {
    this._inputRef = ref;
  };

  render() {
    const {
      className,
      disabled,
      iconDescription, // eslint-disable-line
      id,
      label,
      max,
      min,
      step,
      invalid,
      invalidText,
      light,
      ...other
    } = this.props;

    const numberInputClasses = classNames('bx--number', className, {
      'bx--number--light': light,
    });

    const props = {
      disabled,
      id,
      max,
      min,
      step,
      onChange: this.handleChange,
      value: this.state.value,
    };

    const buttonProps = {
      disabled,
      type: 'button',
    };

    const inputWrapperProps = {};
    let error = null;
    if (invalid || this.state.value === '') {
      inputWrapperProps['data-invalid'] = true;
      error = <div className="bx--form-requirement">{invalidText}</div>;
    }

    return (
      <div className="bx--form-item">
        <div className={numberInputClasses} {...inputWrapperProps}>
          <div className="bx--number__controls">
            <button
              className="bx--number__control-btn up-icon"
              {...buttonProps}
              onClick={evt => this.handleArrowClick(evt, 'up')}>
              <Icon
                className="up-icon"
                name="caret--up"
                description={this.props.iconDescription}
                viewBox="0 0 10 5"
              />
            </button>
            <button
              className="bx--number__control-btn down-icon"
              {...buttonProps}
              onClick={evt => this.handleArrowClick(evt, 'down')}>
              <Icon
                className="down-icon"
                name="caret--down"
                viewBox="0 0 10 5"
                description={this.props.iconDescription}
              />
            </button>
          </div>
          <input
            type="number"
            pattern="[0-9]*"
            {...other}
            {...props}
            ref={this._handleInputRef}
          />
          <label htmlFor={id} className="bx--label">
            {label}
          </label>
          {error}
        </div>
      </div>
    );
  }
}
