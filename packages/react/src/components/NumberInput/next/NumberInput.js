/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as FeatureFlags from '@carbon/feature-flags';
import { Add16, Subtract16 } from '@carbon/icons-react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { useFeatureFlag } from '../../FeatureFlags';
import { useMergedRefs } from '../../../internal/useMergedRefs';
import { useNormalizedInputProps as normalize } from '../../../internal/useNormalizedInputProps';
import { usePrefix } from '../../../internal/usePrefix';
import deprecate from '../../../prop-types/deprecate';

export const translationIds = {
  'increment.number': 'increment.number',
  'decrement.number': 'decrement.number',
};

const defaultTranslations = {
  [translationIds['increment.number']]: 'Increment number',
  [translationIds['decrement.number']]: 'Decrement number',
};

const NumberInput = React.forwardRef(function NumberInput(props, forwardRef) {
  const enabled = useFeatureFlag('enable-v11-release');
  const {
    allowEmpty = false,
    ariaLabel = 'Numeric input field with increment and decrement buttons',
    className: customClassName,
    disabled = false,
    defaultValue,
    helperText = '',
    hideLabel = false,
    hideSteppers,
    iconDescription = enabled ? undefined : 'choose a number',
    id,
    label,
    invalid = false,
    invalidText = enabled ? undefined : 'Provide invalidText',
    isMobile,
    light = false,
    max,
    min,
    onChange,
    readOnly,
    size,
    step = 1,
    translateWithId: t = (id) => defaultTranslations[id],
    warn = false,
    warnText = '',
    value: controlledValue,
    ...rest
  } = props;
  const prefix = usePrefix();
  const [value, setValue] = useState(() => {
    if (controlledValue !== undefined) {
      return controlledValue;
    }
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    return 0;
  });
  const inputRef = useRef(null);
  const ref = useMergedRefs([forwardRef, inputRef]);
  const numberInputClasses = cx({
    [`${prefix}--number`]: true,
    [`${prefix}--number--helpertext`]: true,
    [`${prefix}--number--readonly`]: readOnly,
    [`${prefix}--number--light`]: light,
    [`${prefix}--number--nolabel`]: hideLabel,
    [`${prefix}--number--nosteppers`]: hideSteppers,
    [`${prefix}--number--mobile`]: isMobile,
    [`${prefix}--number--${size}`]: size,
    [customClassName]: !enabled,
  });
  const isInputValid = getInputValidity({
    allowEmpty,
    invalid,
    value,
    max,
    min,
  });

  const normalizedProps = normalize({
    id,
    readOnly,
    disabled,
    invalid: !isInputValid,
    invalidText,
    warn,
    warnText,
  });

  const [incrementNumLabel, decrementNumLabel] = [
    t('increment.number'),
    t('decrement.number'),
  ];

  const wrapperClasses = cx(`${prefix}--number__input-wrapper`, {
    [`${prefix}--number__input-wrapper--warning`]: normalizedProps.warn,
  });

  const iconClasses = cx({
    [`${prefix}--number__invalid`]:
      normalizedProps.invalid || normalizedProps.warn,
    [`${prefix}--number__invalid--warning`]: normalizedProps.warn,
    [`${prefix}--number__readonly-icon`]: readOnly,
  });

  let ariaDescribedBy = null;
  if (normalizedProps.invalid) {
    ariaDescribedBy = normalizedProps.invalidId;
  }
  if (normalizedProps.warn) {
    ariaDescribedBy = normalizedProps.warnId;
  }

  function handleOnChange(event) {
    if (disabled) {
      return;
    }

    const { value: nextValue } = event.target;
    const direction = value < nextValue ? 'up' : 'down';
    setValue(nextValue);

    if (onChange) {
      onChange(event, {
        direction,
        value: nextValue,
      });
    }
  }

  return (
    <div className={cx(`${prefix}--form-item`, { [customClassName]: enabled })}>
      <div
        className={numberInputClasses}
        data-invalid={normalizedProps.invalid ? true : null}>
        <Label
          disabled={normalizedProps.disabled}
          hideLabel={hideLabel}
          id={id}
          label={label}
        />
        <div className={wrapperClasses}>
          <input
            {...rest}
            data-invalid={normalizedProps.invalid ? true : null}
            aria-invalid={normalizedProps.invalid}
            aria-describedby={ariaDescribedBy}
            disabled={normalizedProps.disabled}
            ref={ref}
            id={id}
            max={max}
            min={min}
            onChange={handleOnChange}
            pattern="[0-9]*"
            readOnly={readOnly}
            step={step}
            type="number"
            value={value}
          />
          {normalizedProps.icon ? (
            <normalizedProps.icon className={iconClasses} />
          ) : null}
          {!hideSteppers && (
            <div className={`${prefix}--number__controls`}>
              <button
                aria-label={decrementNumLabel || iconDescription}
                className={`${prefix}--number__control-btn down-icon`}
                disabled={disabled}
                onClick={(event) => {
                  const nextValue = clamp(max, min, value - step);
                  setValue(nextValue);
                  if (onChange) {
                    onChange(event, {
                      value: nextValue,
                      direction: 'down',
                    });
                  }
                }}
                tabIndex="-1"
                title={decrementNumLabel || iconDescription}
                type="button">
                <Subtract16 className="down-icon" />
              </button>
              <div className={`${prefix}--number__rule-divider`} />
              <button
                aria-label={incrementNumLabel || iconDescription}
                className={`${prefix}--number__control-btn up-icon`}
                disabled={disabled}
                onClick={(event) => {
                  const nextValue = clamp(max, min, value + step);
                  setValue(nextValue);
                  if (onChange) {
                    onChange(event, {
                      value: nextValue,
                      direction: 'up',
                    });
                  }
                }}
                tabIndex="-1"
                title={incrementNumLabel || iconDescription}
                type="button">
                <Add16 className="up-icon" />
              </button>
              <div className={`${prefix}--number__rule-divider`} />
            </div>
          )}
        </div>
        {normalizedProps.validation || (
          <HelperText disabled={disabled} description={helperText} />
        )}
      </div>
    </div>
  );
});

NumberInput.propTypes = {
  /**
   * `true` to allow empty string.
   */
  allowEmpty: PropTypes.bool,

  /**
   * Provide a description that would be used to best describe the use case of the NumberInput component
   */
  ariaLabel: PropTypes.string,

  /**
   * Specify an optional className to be applied to the wrapper node
   */
  className: PropTypes.string,

  /**
   * Optional starting value for uncontrolled state
   */
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Specify if the control should be disabled, or not
   */
  disabled: PropTypes.bool,

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText: PropTypes.node,

  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  hideLabel: PropTypes.bool,

  /**
   * Specify whether you want the steppers to be hidden
   */
  hideSteppers: PropTypes.bool,

  /**
   * Provide a description for up/down icons that can be read by screen readers
   */
  iconDescription: PropTypes.string,

  /**
   * Specify a custom `id` for the input
   */
  id: PropTypes.string.isRequired,

  /**
   * Specify if the currently value is invalid.
   */
  invalid: PropTypes.bool,

  /**
   * Message which is displayed if the value is invalid.
   */
  invalidText: PropTypes.node,

  /**
   * `true` to use the mobile variant.
   */
  isMobile: deprecate(
    PropTypes.bool,
    `The \`isMobile\` prop no longer needed as the default NumberInput styles are now identical to the mobile variant styles. This prop will be removed in the next major version of \`carbon-components-react\``
  ),

  /**
   * Generic `label` that will be used as the textual representation of what
   * this field is for
   */
  label: PropTypes.node,

  /**
   * `true` to use the light version.
   */
  light: PropTypes.bool,

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
   */
  onChange: PropTypes.func,

  /**
   * Provide an optional function to be called when the up/down button is clicked
   */
  onClick: PropTypes.func,

  /**
   * Specify if the component should be read-only
   */
  readOnly: PropTypes.bool,

  /**
   * Specify the size of the Number Input. Currently supports either `sm`, 'md' (default) or 'lg` as an option.
   * TODO V11: remove `xl` (replaced with lg)
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),

  /**
   * Specify how much the values should increase/decrease upon clicking on up/down button
   */
  step: PropTypes.number,

  /**
   * Provide custom text for the component for each translation id
   */
  translateWithId: PropTypes.func,

  /**
   * Specify the value of the input
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};

function Label({ disabled, id, hideLabel, label }) {
  const prefix = usePrefix();
  const className = cx({
    [`${prefix}--label`]: true,
    [`${prefix}--label--disabled`]: disabled,
    [`${prefix}--visually-hidden`]: hideLabel,
  });

  if (label) {
    return (
      <label htmlFor={id} className={className}>
        {label}
      </label>
    );
  }
  return null;
}

function HelperText({ disabled, description }) {
  const prefix = usePrefix();
  const className = cx(`${prefix}--form__helper-text`, {
    [`${prefix}--form__helper-text--disabled`]: disabled,
  });

  if (description) {
    return <div className={className}>{description}</div>;
  }
  return null;
}

function getInputValidity({ allowEmpty, invalid, value, max, min }) {
  if (invalid) {
    return false;
  }

  if (value === '') {
    return allowEmpty;
  }

  if (value > max || value < min) {
    return false;
  }

  return true;
}

function clamp(max, min, value) {
  return Math.min(max, Math.max(min, value));
}

export { NumberInput };
