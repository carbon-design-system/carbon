/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';
import classNames from 'classnames';
import { Legend } from '../Text';
import { usePrefix } from '../../internal/usePrefix';
import { WarningFilled, WarningAltFilled } from '@carbon/icons-react';

export const RadioButtonGroupContext = createContext();

const RadioButtonGroup = React.forwardRef(function RadioButtonGroup(
  {
    children,
    className,
    defaultSelected,
    disabled,
    helperText,
    invalid = false,
    invalidText,
    labelPosition = 'right',
    legendText,
    name,
    onChange = () => {},
    orientation = 'horizontal',
    readOnly,
    valueSelected,
    warn = false,
    warnText,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();

  const [selected, setSelected] = useState(valueSelected ?? defaultSelected);
  const [prevValueSelected, setPrevValueSelected] = useState(valueSelected);

  /**
   * prop + state alignment - getDerivedStateFromProps
   * only update if selected prop changes
   */
  if (valueSelected !== prevValueSelected) {
    setSelected(valueSelected);
    setPrevValueSelected(valueSelected);
  }

  function getRadioButtons() {
    const mappedChildren = React.Children.map(children, (radioButton) => {
      const { value } = radioButton.props;

      const newProps = {
        name: name,
        key: value,
        value: value,
        onChange: handleOnChange,
        checked: value === selected,
      };

      if (!selected && radioButton.props.checked) {
        newProps.checked = true;
      }

      return React.cloneElement(radioButton, newProps);
    });

    return mappedChildren;
  }

  function handleOnChange(newSelection, value, evt) {
    if (!readOnly) {
      if (newSelection !== selected) {
        setSelected(newSelection);
        onChange(newSelection, name, evt);
      }
    }
  }

  const showWarning = !readOnly && !invalid && warn;
  const showHelper = !invalid && !disabled && !warn;

  const wrapperClasses = classNames(`${prefix}--form-item`, className);

  const fieldsetClasses = classNames(`${prefix}--radio-button-group`, {
    [`${prefix}--radio-button-group--${orientation}`]:
      orientation === 'vertical',
    [`${prefix}--radio-button-group--label-${labelPosition}`]: labelPosition,
    [`${prefix}--radio-button-group--readonly`]: readOnly,
    [`${prefix}--radio-button-group--invalid`]: !readOnly && invalid,
    [`${prefix}--radio-button-group--warning`]: showWarning,
  });

  const helperClasses = classNames(`${prefix}--form__helper-text`, {
    [`${prefix}--form__helper-text--disabled`]: disabled,
  });

  const helper = helperText ? (
    <div className={helperClasses}>{helperText}</div>
  ) : null;

  return (
    <div className={wrapperClasses} ref={ref}>
      <fieldset
        className={fieldsetClasses}
        disabled={disabled}
        data-invalid={invalid ? true : undefined}
        aria-readonly={readOnly}
        {...rest}>
        {legendText && (
          <Legend className={`${prefix}--label`}>{legendText}</Legend>
        )}
        {getRadioButtons()}
      </fieldset>
      <div className={`${prefix}--radio-button__validation-msg`}>
        {!readOnly && invalid && (
          <>
            <WarningFilled
              className={`${prefix}--radio-button__invalid-icon`}
            />
            <div className={`${prefix}--form-requirement`}>{invalidText}</div>
          </>
        )}
        {showWarning && (
          <>
            <WarningAltFilled
              className={`${prefix}--radio-button__invalid-icon ${prefix}--radio-button__invalid-icon--warning`}
            />
            <div className={`${prefix}--form-requirement`}>{warnText}</div>
          </>
        )}
        {showHelper && helper}
      </div>
    </div>
  );
});

RadioButtonGroup.propTypes = {
  /**
   * Provide a collection of `<RadioButton>` components to render in the group
   */
  children: PropTypes.node,

  /**
   * Provide an optional className to be applied to the container node
   */
  className: PropTypes.string,

  /**
   * Specify the `<RadioButton>` to be selected by default
   */
  defaultSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the group is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide text that is used alongside the control label for additional help
   */
  helperText: PropTypes.node,

  /**
   * Specify whether the control is currently invalid
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in an invalid state
   */
  invalidText: PropTypes.node,

  /**
   * Provide where label text should be placed
   */
  labelPosition: PropTypes.oneOf(['left', 'right']),

  /**
   * Provide a legend to the RadioButtonGroup input that you are
   * exposing to the user
   */
  legendText: PropTypes.node,

  /**
   * Specify the name of the underlying `<input>` nodes
   */
  name: PropTypes.string.isRequired,

  /**
   * Provide an optional `onChange` hook that is called whenever the value of
   * the group changes
   */
  onChange: PropTypes.func,

  /**
   * Provide where radio buttons should be placed
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),

  /**
   * Whether the RadioButtonGroup should be read-only
   */
  readOnly: PropTypes.bool,

  /**
   * Specify the value that is currently selected in the group
   */
  valueSelected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};

export default RadioButtonGroup;
