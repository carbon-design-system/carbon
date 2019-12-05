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
import {
  WarningFilled16,
  CaretDownGlyph,
  CaretUpGlyph,
} from '@carbon/icons-react';
import mergeRefs from '../../tools/mergeRefs';
import requiredIfValueExists from '../../prop-types/requiredIfValueExists';
import { useControlledStateWithValue } from '../../internal/FeatureFlags';

const { prefix } = settings;

export const translationIds = {
  'increment.number': 'increment.number',
  'decrement.number': 'decrement.number',
};

const defaultTranslations = {
  [translationIds['increment.number']]: 'Increment number',
  [translationIds['decrement.number']]: 'Decrement number',
};

const capMin = (min, value) =>
  isNaN(min) || (!min && min !== 0) || isNaN(value) || (!value && value !== 0)
    ? value
    : Math.max(min, value);
const capMax = (max, value) =>
  isNaN(max) || (!max && max !== 0) || isNaN(value) || (!value && value !== 0)
    ? value
    : Math.min(max, value);

class NumberInput extends Component {
  constructor(props) {
    super(props);
    this.isControlled = props.value !== undefined;
    if (useControlledStateWithValue && this.isControlled) {
      // Skips the logic of setting initial state if this component is controlled
      return;
    }
    let value = useControlledStateWithValue ? props.defaultValue : props.value;
    value = value === undefined ? 0 : value;
    if (props.min || props.min === 0) {
      value = Math.max(props.min, value);
    }
    this.state = { value };
  }

  static propTypes = {
    /**
     * Specify an optional className to be applied to the wrapper node
     */
    className: PropTypes.string,
    /**
     * Specify if the control should be disabled, or not
     */
    disabled: PropTypes.bool,
    /**
     * Specify whether you want the underlying label to be visually hidden
     */
    hideLabel: PropTypes.bool,
    /**
     * Provide a description for up/down icons that can be read by screen readers
     */
    iconDescription: PropTypes.string.isRequired,
    /**
     * Specify a custom `id` for the input
     */
    id: PropTypes.string.isRequired,
    /**
     * Generic `label` that will be used as the textual representation of what
     * this field is for
     */
    label: PropTypes.node,
    /**
     * The maximum value.
     */
    max: PropTypes.number,
    /**
     * The minimum value.
     */
    min: PropTypes.number,
    /**
     * The new value is available in 'imaginaryTarget.value'
     * i.e. to get the value: evt.imaginaryTarget.value
     *
     * * _With_ `useControlledStateWithValue` feature flag, the signature of the event handler will be altered to provide additional context in the second parameter: `onChange(event, { value, direction })` where:
     *   * `event` is the (React) raw event
     *   * `value` is the new value
     *   * `direction` tells you the button you hit is up button or down button
     * * _Without_ this feature flag the event handler has `onChange(event, direction)` signature.
     */
    onChange: !useControlledStateWithValue
      ? PropTypes.func
      : requiredIfValueExists(PropTypes.func),
    /**
     * Provide an optional function to be called when the up/down button is clicked
     */
    onClick: PropTypes.func,
    /**
     * Specify how much the valus should increase/decrease upon clicking on up/down button
     */
    step: PropTypes.number,
    /**
     * Optional starting value for uncontrolled state
     */
    defaultValue: PropTypes.number,
    /**
     * Specify the value of the input
     */
    value: PropTypes.number,
    /**
     * Specify if the component should be read-only
     */
    readOnly: PropTypes.bool,
    /**
     * Specify if the currently value is invalid.
     */
    invalid: PropTypes.bool,
    /**
     * Message which is displayed if the value is invalid.
     */
    invalidText: PropTypes.string,
    /**
     * Provide text that is used alongside the control label for additional help
     */
    helperText: PropTypes.node,
    /**
     * Provide a description that would be used to best describe the use case of the NumberInput component
     */
    ariaLabel: PropTypes.string,
    /**
     * `true` to use the light version.
     */
    light: PropTypes.bool,
    /**
     * `true` to allow empty string.
     */
    allowEmpty: PropTypes.bool,
    /**
     * Provide custom text for the component for each translation id
     */
    translateWithId: PropTypes.func.isRequired,
    /**
     * `true` to use the mobile variant.
     */
    isMobile: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
    hideLabel: false,
    iconDescription: 'choose a number',
    label: ' ',
    step: 1,
    invalid: false,
    invalidText: 'Provide invalidText',
    ariaLabel: 'Numeric input field with increment and decrement buttons',
    helperText: '',
    light: false,
    allowEmpty: false,
    translateWithId: id => defaultTranslations[id],
  };

  /**
   * The DOM node refernce to the `<input>`.
   * @type {HTMLInputElement}
   */
  _inputRef = null;

  static getDerivedStateFromProps({ min, max, value = 0 }, state) {
    const { prevValue } = state;
    // If `useControlledStateWithValue` feature flag is on, do nothing here.
    // Otherwise, do prop -> state sync with "value capping".
    return useControlledStateWithValue || prevValue === value
      ? null
      : {
          value: capMax(max, capMin(min, value)),
          prevValue: value,
        };
  }

  handleChange = evt => {
    const { disabled, onChange } = this.props;
    if (!disabled) {
      evt.persist();
      evt.imaginaryTarget = this._inputRef;
      const value = evt.target.value;
      this.setState(
        {
          value,
        },
        () => {
          if (useControlledStateWithValue) {
            onChange(evt, { value });
          } else if (onChange) {
            onChange(evt);
          }
        }
      );
    }
  };

  handleArrowClick = (evt, direction) => {
    let value =
      typeof this.state.value === 'string'
        ? Number(this.state.value)
        : this.state.value;
    const { disabled, min, max, step, onChange, onClick } = this.props;
    const conditional =
      direction === 'down'
        ? (min !== undefined && value > min) || min === undefined
        : (max !== undefined && value < max) || max === undefined;

    if (!disabled && conditional) {
      value = direction === 'down' ? value - step : value + step;
      value = capMax(max, capMin(min, value));
      evt.persist();
      evt.imaginaryTarget = this._inputRef;
      this.setState(
        {
          value,
        },
        () => {
          if (useControlledStateWithValue) {
            onClick && onClick(evt, { value, direction });
            onChange && onChange(evt, { value, direction });
          } else {
            onClick && onClick(evt, direction);
            onChange && onChange(evt, direction);
          }
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
      hideLabel,
      label,
      max,
      min,
      step,
      value,
      readOnly,
      invalid,
      invalidText,
      helperText,
      ariaLabel,
      light,
      allowEmpty,
      innerRef: ref,
      translateWithId: t,
      isMobile,
      ...other
    } = this.props;

    const numberInputClasses = classNames(
      `${prefix}--number ${prefix}--number--helpertext`,
      className,
      {
        [`${prefix}--number--readonly`]: readOnly,
        [`${prefix}--number--light`]: light,
        [`${prefix}--number--nolabel`]: hideLabel,
        [`${prefix}--number--mobile`]: isMobile,
      }
    );

    const props = {
      disabled,
      id,
      max,
      min,
      step,
      onChange: this.handleChange,
      value:
        useControlledStateWithValue && this.isControlled
          ? value
          : this.state.value,
      readOnly,
      'aria-label': label ? null : ariaLabel,
    };

    const buttonProps = {
      disabled,
      type: 'button',
    };

    const inputWrapperProps = {};
    let errorId = null;
    let error = null;
    if (
      invalid ||
      (!allowEmpty && this.state.value === '') ||
      this.state.value > max ||
      this.state.value < min
    ) {
      inputWrapperProps['data-invalid'] = true;
      errorId = `${id}-error-id`;
      error = (
        <div className={`${prefix}--form-requirement`} id={errorId}>
          {invalidText}
        </div>
      );
    }

    const helper = helperText ? (
      <div className={`${prefix}--form__helper-text`}>{helperText}</div>
    ) : null;

    const labelClasses = classNames(`${prefix}--label`, {
      [`${prefix}--visually-hidden`]: hideLabel,
    });

    const labelText = label ? (
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
    ) : null;

    const [incrementNumLabel, decrementNumLabel] = [
      t('increment.number'),
      t('decrement.number'),
    ];

    return (
      <div className={`${prefix}--form-item`}>
        <div className={numberInputClasses} {...inputWrapperProps}>
          {(() => {
            if (isMobile) {
              return (
                <>
                  {labelText}
                  {helper}
                  <div className={`${prefix}--number__input-wrapper`}>
                    <button
                      className={`${prefix}--number__control-btn down-icon`}
                      {...buttonProps}
                      onClick={evt => this.handleArrowClick(evt, 'down')}
                      title={decrementNumLabel}
                      aria-label={decrementNumLabel || iconDescription}
                      aria-live="polite"
                      aria-atomic="true">
                      <CaretDownGlyph className="down-icon" />
                    </button>
                    <input
                      type="number"
                      pattern="[0-9]*"
                      {...other}
                      {...props}
                      ref={mergeRefs(ref, this._handleInputRef)}
                    />
                    <button
                      className={`${prefix}--number__control-btn up-icon`}
                      {...buttonProps}
                      onClick={evt => this.handleArrowClick(evt, 'up')}
                      title={incrementNumLabel}
                      aria-label={incrementNumLabel || iconDescription}
                      aria-live="polite"
                      aria-atomic="true">
                      <CaretUpGlyph className="up-icon" />
                    </button>
                  </div>
                </>
              );
            }
            return (
              <>
                {labelText}
                {helper}
                <div className={`${prefix}--number__input-wrapper`}>
                  <input
                    data-invalid={invalid || null}
                    aria-invalid={invalid || null}
                    aria-describedby={errorId}
                    type="number"
                    pattern="[0-9]*"
                    {...other}
                    {...props}
                    ref={mergeRefs(ref, this._handleInputRef)}
                  />
                  {invalid && (
                    <WarningFilled16 className={`${prefix}--number__invalid`} />
                  )}
                  <div className={`${prefix}--number__controls`}>
                    <button
                      className={`${prefix}--number__control-btn up-icon`}
                      {...buttonProps}
                      onClick={evt => this.handleArrowClick(evt, 'up')}
                      title={incrementNumLabel || iconDescription}
                      aria-label={incrementNumLabel || iconDescription}
                      aria-live="polite"
                      aria-atomic="true">
                      <CaretUpGlyph className="up-icon" />
                    </button>
                    <button
                      className={`${prefix}--number__control-btn down-icon`}
                      {...buttonProps}
                      onClick={evt => this.handleArrowClick(evt, 'down')}
                      title={decrementNumLabel || iconDescription}
                      aria-label={decrementNumLabel || iconDescription}
                      aria-live="polite"
                      aria-atomic="true">
                      <CaretDownGlyph className="down-icon" />
                    </button>
                  </div>
                </div>
              </>
            );
          })()}
          {error}
        </div>
      </div>
    );
  }
}

export default (() => {
  const forwardRef = (props, ref) => <NumberInput {...props} innerRef={ref} />;
  forwardRef.displayName = 'NumberInput';
  return React.forwardRef(forwardRef);
})();
