import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Icon from './Icon';
import classNames from 'classnames';

class NumberInput extends Component {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    iconDescription: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    max: PropTypes.number,
    min: PropTypes.number,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    step: PropTypes.number,
    value: PropTypes.number,
  };

  static defaultProps = {
    disabled: false,
    iconDescription: 'choose a number',
    label: ' ',
    onChange: () => {},
    onClick: () => {},
    step: 1,
    value: 0,
  };

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange = evt => {
    if (!this.props.disabled) {
      this.setState({
        value: evt.target.value,
      });

      this.props.onChange(evt);
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

      this.setState({
        value,
      });

      this.props.onClick(evt);
      this.props.onChange(evt);
    }
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
      ...other
    } = this.props;

    const numberInputClasses = classNames('bx--number', className);

    const props = {
      disabled,
      id,
      max,
      min,
      step,
      onChange: this.handleChange,
      value: this.state.value,
    };

    return (
      <div className="bx--form-item">
        <label htmlFor={id} className="bx--label">
          {label}
        </label>
        <div className={numberInputClasses}>
          <input type="number" pattern="[0-9]*" {...other} {...props} />
          <div className="bx--number__controls">
            <button
              className="bx--number__control-btn"
              onClick={evt => this.handleArrowClick(evt, 'up')}>
              <Icon
                className="up-icon"
                name="caret--up"
                description={this.props.iconDescription}
                viewBox="0 2 10 5"
              />
            </button>
            <button
              className="bx--number__control-btn"
              onClick={evt => this.handleArrowClick(evt, 'down')}>
              <Icon
                className="down-icon"
                name="caret--down"
                viewBox="0 2 10 5"
                description={this.props.iconDescription}
              />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default NumberInput;
