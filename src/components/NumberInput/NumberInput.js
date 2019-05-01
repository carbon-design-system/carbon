/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { iconCaretUp, iconCaretDown } from 'carbon-icons';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import WarningFilled16 from '@carbon/icons-react/lib/warning--filled/16';
import CaretDownGlyph from '@carbon/icons-react/lib/caret--down/index';
import CaretUpGlyph from '@carbon/icons-react/lib/caret--up/index';
import Icon from '../Icon';
import { breakingChangesX, componentsX } from '../../internal/FeatureFlags';
import mergeRefs from '../../tools/mergeRefs';

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
    let value = props.value;
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
     */
    onChange: PropTypes.func,
    /**
     * Provide an optional function to be called when the up/down button is clicked
     */
    onClick: PropTypes.func,
    /**
     * Specify how much the valus should increase/decrease upon clicking on up/down button
     */
    step: PropTypes.number,
    /**
     * Specify the value of the input
     */
    value: PropTypes.number,
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
    onChange: () => {},
    onClick: () => {},
    step: 1,
    value: 0,
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

  static getDerivedStateFromProps({ min, max, value }, state) {
    const { prevValue } = state;
    return prevValue === value
      ? null
      : {
          value: capMax(max, capMin(min, value)),
          prevValue: value,
        };
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
      hideLabel,
      label,
      max,
      min,
      step,
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
        [`${prefix}--number--light`]: light,
        [`${prefix}--number--nolabel`]: hideLabel,
        [`${prefix}--number--mobile`]: componentsX && isMobile,
      }
    );

    const props = {
      disabled,
      id,
      max,
      min,
      step,
      onChange: this.handleChange,
      value: this.state.value,
      ariaLabel,
    };

    const buttonProps = {
      disabled,
      type: 'button',
    };

    const inputWrapperProps = {};
    let error = null;
    if (invalid || (!allowEmpty && this.state.value === '')) {
      inputWrapperProps['data-invalid'] = true;
      error = (
        <div className={`${prefix}--form-requirement`}>{invalidText}</div>
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
            if (!componentsX) {
              return (
                <>
                  <div className={`${prefix}--number__controls`}>
                    <button
                      className={`${prefix}--number__control-btn up-icon`}
                      {...buttonProps}
                      onClick={evt => this.handleArrowClick(evt, 'up')}
                      title={incrementNumLabel}
                      aria-label={incrementNumLabel}
                      aria-live="polite"
                      aria-atomic="true">
                      <Icon
                        className="up-icon"
                        icon={iconCaretUp}
                        description={iconDescription || incrementNumLabel}
                        viewBox="0 0 10 5"
                      />
                    </button>
                    <button
                      className={`${prefix}--number__control-btn down-icon`}
                      {...buttonProps}
                      onClick={evt => this.handleArrowClick(evt, 'down')}
                      title={decrementNumLabel}
                      aria-label={decrementNumLabel}
                      aria-live="polite"
                      aria-atomic="true">
                      <Icon
                        className="down-icon"
                        icon={iconCaretDown}
                        viewBox="0 0 10 5"
                        description={iconDescription || decrementNumLabel}
                      />
                    </button>
                  </div>
                  {labelText}
                  <input
                    type="number"
                    pattern="[0-9]*"
                    {...other}
                    {...props}
                    ref={mergeRefs(ref, this._handleInputRef)}
                  />
                </>
              );
            }
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
                    type="number"
                    pattern="[0-9]*"
                    {...other}
                    {...props}
                    ref={mergeRefs(ref, this._handleInputRef)}
                  />
                  {invalid && (
                    <WarningFilled16
                      className={`${prefix}--number__invalid`}
                      role="img"
                    />
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
          {!componentsX && helper}
        </div>
      </div>
    );
  }
}

export default (!breakingChangesX
  ? NumberInput
  : (() => {
      const forwardRef = (props, ref) => (
        <NumberInput {...props} innerRef={ref} />
      );
      forwardRef.displayName = 'NumberInput';
      return React.forwardRef(forwardRef);
    })());
