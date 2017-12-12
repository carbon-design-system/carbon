import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEqual from 'lodash.isequal';
import TextInput from '../TextInput';

export default class Slider extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    hideTextInput: PropTypes.bool,
    id: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    minLabel: PropTypes.string,
    max: PropTypes.number.isRequired,
    maxLabel: PropTypes.string,
    labelText: PropTypes.string,
    step: PropTypes.number,
    stepMuliplier: PropTypes.number,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    name: PropTypes.bool,
    inputType: PropTypes.string,
  };

  static defaultProps = {
    hideTextInput: false,
    stepMuliplier: 4,
    disabled: false,
    minLabel: '',
    maxLabel: '',
    inputType: 'number',
  };

  state = {
    dragging: false,
    value: this.props.value,
    left: 0,
  };

  componentDidMount() {
    this.updatePosition();
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps, this.props)) {
      this.updatePosition();
    }
  }

  updatePosition = evt => {
    if (evt && this.props.disabled) {
      return;
    }

    if (evt && evt.dispatchConfig) {
      evt.persist();
    }

    if (this.state.dragging) {
      return;
    }

    this.setState({ dragging: true });

    requestAnimationFrame(() => {
      this.setState((prevState, props) => {
        const { left, newValue } = this.calcValue(evt, prevState, props);
        if (prevState.left === left && prevState.value === newValue) {
          return { dragging: false };
        }

        props.onChange({ value: newValue });
        return {
          dragging: false,
          left,
          value: newValue,
        };
      });
    });
  };

  calcValue = (evt, prevState, props) => {
    const { min, max, step, stepMuliplier } = props;

    const { value } = prevState;

    const range = max - min;
    const valuePercentage = (value - min) / range * 100;

    let left;
    let newValue;
    left = valuePercentage;
    newValue = value;

    if (evt) {
      const { type } = evt;

      if (type === 'keydown') {
        const direction = {
          40: -1, // decreasing
          37: -1, // decreasing
          38: 1, // increasing
          39: 1, // increasing
        }[evt.which];

        if (direction !== undefined) {
          const multiplier =
            evt.shiftKey === true ? range / step / stepMuliplier : 1;
          const stepMultiplied = step * multiplier;
          const stepSize = stepMultiplied / range * 100;
          left = valuePercentage + stepSize * direction;
          newValue = Number(value) + stepMultiplied * direction;
        }
      }
      if (type === 'mousemove' || type === 'click' || type === 'touchmove') {
        const clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
        const track = this.track.getBoundingClientRect();
        const ratio = (clientX - track.left) / track.width;
        const rounded = min + Math.round(range * ratio / step) * step;
        left = (rounded - min) / range * 100;
        newValue = rounded;
      }
    }

    if (newValue <= Number(min)) {
      left = 0;
      newValue = min;
    }
    if (newValue >= Number(max)) {
      left = 100;
      newValue = max;
    }

    return { left, newValue };
  };

  handleMouseStart = () => {
    this.element.ownerDocument.addEventListener(
      'mousemove',
      this.updatePosition
    );
    this.element.ownerDocument.addEventListener('mouseup', this.handleMouseEnd);
  };

  handleMouseEnd = () => {
    this.element.ownerDocument.removeEventListener(
      'mousemove',
      this.updatePosition
    );
    this.element.ownerDocument.removeEventListener(
      'mouseup',
      this.handleMouseEnd
    );
  };

  handleTouchStart = () => {
    this.element.ownerDocument.addEventListener(
      'touchmove',
      this.updatePosition
    );
    this.element.ownerDocument.addEventListener('touchup', this.handleTouchEnd);
    this.element.ownerDocument.addEventListener(
      'touchend',
      this.handleTouchEnd
    );
    this.element.ownerDocument.addEventListener(
      'touchcancel',
      this.handleTouchEnd
    );
  };

  handleTouchEnd = () => {
    this.element.ownerDocument.removeEventListener(
      'touchmove',
      this.updatePosition
    );
    this.element.ownerDocument.removeEventListener(
      'touchup',
      this.handleTouchEnd
    );
    this.element.ownerDocument.removeEventListener(
      'touchend',
      this.handleTouchEnd
    );
    this.element.ownerDocument.removeEventListener(
      'touchcancel',
      this.handleTouchEnd
    );
  };

  handleChange = evt => {
    this.setState({ value: evt.target.value });
    this.updatePosition(evt);
  };

  render() {
    const {
      className,
      hideTextInput,
      id,
      min,
      minLabel,
      max,
      maxLabel,
      labelText,
      step,
      stepMuliplier, // eslint-disable-line no-unused-vars
      inputType,
      required,
      disabled,
      name,
      ...other
    } = this.props;

    const { value, left } = this.state;

    const sliderClasses = classNames(
      'bx--slider',
      { 'bx--slider--disabled': disabled },
      className
    );

    const filledTrackStyle = {
      transform: `translate(0%, -50%) scaleX(${left / 100})`,
    };
    const thumbStyle = {
      left: `${left}%`,
    };

    return (
      <div className="bx--form-item">
        <label htmlFor={id} className="bx--label">
          {labelText}
        </label>
        <div className="bx--slider-container">
          <span className="bx--slider__range-label">
            <span>{min}</span>
            <span>{minLabel}</span>
          </span>
          <div
            className={sliderClasses}
            ref={node => {
              this.element = node;
            }}
            onClick={this.updatePosition}
            onKeyPress={this.updatePosition}
            role="presentation"
            tabIndex={-1}
            {...other}>
            <div
              className="bx--slider__track"
              ref={node => {
                this.track = node;
              }}
            />
            <div
              className="bx--slider__filled-track"
              style={filledTrackStyle}
            />
            <div
              className="bx--slider__thumb"
              role="slider"
              tabIndex={0}
              aria-valuemax={max}
              aria-valuemin={min}
              aria-valuenow={value}
              style={thumbStyle}
              onMouseDown={this.handleMouseStart}
              onTouchStart={this.handleTouchStart}
              onKeyDown={this.updatePosition}
            />
            <input
              id={id}
              type="hidden"
              name={name}
              value={value}
              required={required}
              min={min}
              max={max}
              step={step}
              onChange={this.handleChange}
            />
          </div>
          <span className="bx--slider__range-label">
            <span>{max}</span>
            <span>{maxLabel}</span>
          </span>
          {!hideTextInput && (
            <TextInput
              type={inputType}
              id="input-for-slider"
              className="bx-slider-text-input"
              value={value}
              onChange={this.handleChange}
            />
          )}
        </div>
      </div>
    );
  }
}
