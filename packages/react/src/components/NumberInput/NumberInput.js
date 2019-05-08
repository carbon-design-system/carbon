/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { Component, useCallback } from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import WarningFilled16 from '@carbon/icons-react/lib/warning--filled/16';
import CaretDownGlyph from '@carbon/icons-react/lib/caret--down/index';
import CaretUpGlyph from '@carbon/icons-react/lib/caret--up/index';

const { prefix } = settings;

export const translationIds = {
  'increment.number': 'increment.number',
  'decrement.number': 'decrement.number',
};

const defaultTranslations = {
  [translationIds['increment.number']]: 'Increment number',
  [translationIds['decrement.number']]: 'Decrement number',
};

export const PresentationalNumberInput = React.forwardRef(
  function PresentationalNumberInput(
    {
      className,
      disabled,
      iconDescription, // eslint-disable-line no-unused-vars
      id,
      hideLabel,
      label,
      max,
      min,
      step,
      value,
      invalid,
      invalidText,
      helperText,
      ariaLabel,
      light,
      allowEmpty,
      translateWithId: t,
      isMobile,
      onClick,
      onChange,
      ...other
    },
    ref
  ) {
    const numberInputClasses = classNames(
      `${prefix}--number ${prefix}--number--helpertext`,
      className,
      {
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
      onClick,
      onChange,
      value,
      'aria-label': ariaLabel,
    };

    const buttonProps = {
      disabled,
      type: 'button',
    };

    const inputWrapperProps = {};
    let error = null;
    if (invalid || (!allowEmpty && value === '')) {
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

    const handleArrowClick = useCallback(
      (evt, direction) => {
        if (disabled) {
          return;
        }

        const numericValue = typeof value === 'string' ? Number(value) : value;
        const conditional =
          direction === 'down'
            ? (min !== undefined && numericValue > min) || min === undefined
            : (max !== undefined && numericValue < max) || max === undefined;

        if (conditional) {
          onClick(evt, { direction });
          onChange(evt, {
            value:
              direction === 'down' ? numericValue - step : numericValue + step,
            direction,
            inputRef: ref,
          });
        }
      },
      [disabled, min, max, step, value, ref, onClick, onChange]
    );

    const handleUpArrowClick = useCallback(
      evt => {
        handleArrowClick(evt, 'up');
      },
      [disabled, min, max, step, value, ref, onClick, onChange]
    );

    const handleDownArrowClick = useCallback(
      evt => {
        handleArrowClick(evt, 'down');
      },
      [disabled, min, max, step, value, ref, onClick, onChange]
    );

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
                      onClick={handleDownArrowClick}
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
                      ref={ref}
                    />
                    <button
                      className={`${prefix}--number__control-btn up-icon`}
                      {...buttonProps}
                      onClick={handleUpArrowClick}
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
                    ref={ref}
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
                      onClick={handleUpArrowClick}
                      title={incrementNumLabel || iconDescription}
                      aria-label={incrementNumLabel || iconDescription}
                      aria-live="polite"
                      aria-atomic="true">
                      <CaretUpGlyph className="up-icon" />
                    </button>
                    <button
                      className={`${prefix}--number__control-btn down-icon`}
                      {...buttonProps}
                      onClick={handleDownArrowClick}
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
);

PresentationalNumberInput.propTypes = {
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
   * Provide an optional function to be called when the value is changed
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

PresentationalNumberInput.defaultProps = {
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

  static getDerivedStateFromProps({ min, max, value }, state) {
    const { prevValue } = state;
    return prevValue === value
      ? null
      : {
          value: capMax(max, capMin(min, value)),
          prevValue: value,
        };
  }

  /**
   * Handles user-initiated change in value.
   * @param {Event} evt The event triggering this action.
   * @param {Object} [options] The options.
   * @param {number} [options.value] The new value.
   * @param {string} [options.direction]
   *   The direction of the up/down arrow causing this change, if this action is triggered by clicking on up.down arrow.
   * @param {HTMLInputEleemnt} [options.inputRef] The inner `<input>` element representing the value.
   * @private
   */
  _handleChange = (evt, { value, direction, inputRef } = {}) => {
    evt.persist();
    evt.imaginaryTarget = inputRef;
    this.setState(
      {
        value,
      },
      () => {
        const { disabled, onClick, onChange } = this.props;
        if (disabled) {
          // `<PresentationalNumberInput>` takes care of preventing event being fired in disabled state.
          // The code here is for simiulated testing
          return;
        }
        if (evt.type === 'click') {
          onClick(evt, direction);
          onChange(evt, direction);
        } else {
          onChange(evt);
        }
      }
    );
  };

  /**
   * A function pass along `onClick` only ones from `<input>`,
   * given `<NumberInput>` fires `click` event from up/down buttons
   * via `<PresentationalNumberInput>`'s `onChange` event.
   * @param {Event} evt The event triggering this action.
   * @private
   */
  _swallowOnClick = evt => {
    if (evt.target.tagName === 'INPUT') {
      this.props.onClick(evt);
    }
  };

  render() {
    const { innerRef: ref, ...other } = this.props;
    const { value } = this.state;
    return (
      <PresentationalNumberInput
        {...other}
        value={value}
        ref={ref}
        onClick={this._swallowOnClick}
        onChange={this._handleChange}
      />
    );
  }
}

export default (() => {
  const forwardRef = (props, ref) => <NumberInput {...props} innerRef={ref} />;
  forwardRef.displayName = 'NumberInput';
  return React.forwardRef(forwardRef);
})();
