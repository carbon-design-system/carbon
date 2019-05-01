/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const defaultFormatLabel = (value, label) => {
  return typeof label === 'function' ? label(value) : `${value}${label}`;
};

export default class Slider extends PureComponent {
  static propTypes = {
    /**
     * The CSS class name for the slider.
     */
    className: PropTypes.string,

    /**
     * `true` to hide the number input box.
     */
    hideTextInput: PropTypes.bool,

    /**
     * The ID of the `<input>`.
     */
    id: PropTypes.string,

    /**
     * The callback to get notified of change in value.
     */
    onChange: PropTypes.func,

    /**
     * The callback to get notified of value on handle release.
     */
    onRelease: PropTypes.func,

    /**
     * The value.
     */
    value: PropTypes.number.isRequired,

    /**
     * The minimum value.
     */
    min: PropTypes.number.isRequired,

    /**
     * The label associated with the minimum value.
     */
    minLabel: PropTypes.string,

    /**
     * The maximum value.
     */
    max: PropTypes.number.isRequired,

    /**
     * The label associated with the maximum value.
     */
    maxLabel: PropTypes.string,

    /**
     * The callback to format the label associated with the minimum/maximum value.
     */
    formatLabel: PropTypes.func,

    /**
     * The label for the slider.
     */
    labelText: PropTypes.node,

    /**
     * A value determining how much the value should increase/decrease by moving the thumb by mouse.
     */
    step: PropTypes.number,

    /**
     * A value determining how much the value should increase/decrease by Shift+arrow keys,
     * which will be `(max - min) / stepMuliplier`.
     */
    stepMuliplier: PropTypes.number,

    /**
     * The child nodes.
     */
    children: PropTypes.node,

    /**
     * `true` to disable this slider.
     */
    disabled: PropTypes.bool,

    /**
     * The `name` attribute of the `<input>`.
     */
    name: PropTypes.string,

    /**
     * The `type` attribute of the `<input>`.
     */
    inputType: PropTypes.string,

    /**
     * The `ariaLabel` for the `<input>`.
     */
    ariaLabelInput: PropTypes.string,

    /**
     * `true` to use the light version.
     */
    light: PropTypes.bool,
  };

  static defaultProps = {
    hideTextInput: false,
    step: 1,
    stepMuliplier: 4,
    disabled: false,
    minLabel: '',
    maxLabel: '',
    inputType: 'number',
    ariaLabelInput: 'Slider number input',
    light: false,
  };

  state = {
    dragging: false,
    holding: false,
    value: this.props.value,
    left: 0,
  };

  static getDerivedStateFromProps({ value, min, max }, state) {
    const { value: currentValue, prevValue, prevMin, prevMax } = state;
    if (prevValue === value && prevMin === min && prevMax === max) {
      return null;
    }
    const effectiveValue = Math.min(
      Math.max(prevValue === value ? currentValue : value, min),
      max
    );
    return {
      value: effectiveValue,
      left: ((effectiveValue - min) / (max - min)) * 100,
      prevValue: value,
      prevMin: min,
      prevMax: max,
    };
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

    this.handleDrag();

    requestAnimationFrame(() => {
      this.setState((prevState, props) => {
        // Note: In FF, `evt.target` of `mousemove` event can be `HTMLDocument` which doesn't have `classList`.
        // One example is dragging out of browser viewport.
        const fromInput =
          evt &&
          evt.target &&
          evt.target.classList &&
          evt.target.classList.contains('bx-slider-text-input');
        const { left, newValue: newSliderValue } = this.calcValue(
          evt,
          prevState,
          props
        );
        const newValue = fromInput ? Number(evt.target.value) : newSliderValue;
        if (prevState.left === left && prevState.value === newValue) {
          return { dragging: false };
        }
        if (typeof props.onChange === 'function') {
          props.onChange({ value: newValue });
        }
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
    const valuePercentage = ((value - min) / range) * 100;

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
          const stepSize = (stepMultiplied / range) * 100;
          left = valuePercentage + stepSize * direction;
          newValue = Number(value) + stepMultiplied * direction;
        }
      }
      if (type === 'mousemove' || type === 'click' || type === 'touchmove') {
        const clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
        const track = this.track.getBoundingClientRect();
        const ratio = (clientX - track.left) / track.width;
        const rounded = min + Math.round((range * ratio) / step) * step;
        left = ((rounded - min) / range) * 100;
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
    this.setState({
      holding: true,
    });

    this.element.ownerDocument.addEventListener(
      'mousemove',
      this.updatePosition
    );
    this.element.ownerDocument.addEventListener('mouseup', this.handleMouseEnd);
  };

  handleMouseEnd = () => {
    this.setState(
      {
        holding: false,
      },
      this.updatePosition
    );

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
    this.setState({
      holding: true,
    });
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
    this.setState(
      {
        holding: false,
      },
      this.updatePosition
    );

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

  handleDrag = () => {
    if (
      typeof this.props.onRelease === 'function' &&
      !this.props.disabled &&
      !this.state.holding
    ) {
      this.props.onRelease({ value: this.state.value });
    }
  };

  render() {
    const {
      ariaLabelInput,
      className,
      hideTextInput,
      id = (this.inputId =
        this.inputId ||
        `__carbon-slider_${Math.random()
          .toString(36)
          .substr(2)}`),
      min,
      minLabel,
      max,
      maxLabel,
      formatLabel = defaultFormatLabel,
      labelText,
      step,
      stepMuliplier, // eslint-disable-line no-unused-vars
      inputType,
      required,
      disabled,
      name,
      light,
      ...other
    } = this.props;

    delete other.onRelease;

    const { value, left } = this.state;

    const labelClasses = classNames(`${prefix}--label`, {
      [`${prefix}--label--disabled`]: disabled,
    });

    const sliderClasses = classNames(
      `${prefix}--slider`,
      { [`${prefix}--slider--disabled`]: disabled },
      className
    );

    const inputClasses = classNames(
      `${prefix}--text-input`,
      `${prefix}--slider-text-input`,
      {
        [`${prefix}--text-input--light`]: light,
        [`${prefix}--text-input--invalid`]: this.props.invalid,
      }
    );

    const filledTrackStyle = {
      transform: `translate(0%, -50%) scaleX(${left / 100})`,
    };
    const thumbStyle = {
      left: `${left}%`,
    };

    return (
      <div className={`${prefix}--form-item`}>
        <label htmlFor={id} className={labelClasses}>
          {labelText}
        </label>
        <div className={`${prefix}--slider-container`}>
          <span className={`${prefix}--slider__range-label`}>
            {formatLabel(min, minLabel)}
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
              className={`${prefix}--slider__thumb`}
              role="slider"
              id={id}
              tabIndex={0}
              aria-valuemax={max}
              aria-valuemin={min}
              aria-valuenow={value}
              style={thumbStyle}
              onMouseDown={this.handleMouseStart}
              onTouchStart={this.handleTouchStart}
              onKeyDown={this.updatePosition}
            />
            <div
              className={`${prefix}--slider__track`}
              ref={node => {
                this.track = node;
              }}
            />
            <div
              className={`${prefix}--slider__filled-track`}
              style={filledTrackStyle}
            />
            <input
              className={`${prefix}--slider__input`}
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
          <span className={`${prefix}--slider__range-label`}>
            {formatLabel(max, maxLabel)}
          </span>
          {!hideTextInput && (
            <input
              type={inputType}
              id={`${id}-input-for-slider`}
              className={inputClasses}
              value={value}
              onChange={this.handleChange}
              labelText=""
              aria-label={ariaLabelInput}
              disabled={disabled}
            />
          )}
        </div>
      </div>
    );
  }
}
