/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { NumberInput, NumberInputProps } from '../NumberInput';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm/FormContext';

export interface FluidNumberInputProps {
  /**
   * `true` to allow empty string.
   */
  allowEmpty?: boolean;

  /**
   * Specify an optional className to be applied to the wrapper node
   */
  className?: string;

  /**
   * Optional starting value for uncontrolled state
   */
  defaultValue?: number | string;

  /**
   * Specify if the wheel functionality for the input should be disabled, or not
   */
  disableWheel?: boolean;

  /**
   * Specify if the control should be disabled, or not
   */
  disabled?: boolean;

  /**
   * Provide a description for up/down icons that can be read by screen readers
   */
  iconDescription?: string;

  /**
   * Specify a custom `id` for the input
   */
  id: string;

  /**
   * Specify if the currently value is invalid.
   */
  invalid?: boolean;

  /**
   * Message which is displayed if the value is invalid.
   */
  invalidText?: React.ReactNode;

  /**
   * Generic `label` that will be used as the textual representation of what
   * this field is for
   */
  label?: React.ReactNode;

  /**
   * The maximum value.
   */
  max?: number;

  /**
   * The minimum value.
   */
  min?: number;

  onChange?: (
    event: React.MouseEvent<HTMLButtonElement>,
    state: { value: number | string; direction: string }
  ) => void;

  /**
   * Provide an optional function to be called when the up/down button is clicked
   */
  onClick?: (
    event: React.MouseEvent<HTMLElement>,
    state?: { value: number | string; direction: string }
  ) => void;
  /**
   * Provide an optional function to be called when a key is pressed in the number input
   */
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;

  /**
   * Specify how much the values should increase/decrease upon clicking on up/down button
   */
  step?: number;

  /**
   * Provide custom text for the component for each translation id
   */
  translateWithId?: (id: string) => string;

  /**
   * Specify the value of the input
   */
  value?: number | string;

  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: React.ReactNode;

  /**
   * Whether or not the component is readonly
   */
  readOnly?: boolean;
}

const FluidNumberInput: React.FC<FluidNumberInputProps> = React.forwardRef<
  HTMLInputElement,
  FluidNumberInputProps
>(function FluidNumberInput({ className, ...other }, ref) {
  const prefix = usePrefix();
  const classNames = classnames(`${prefix}--number-input--fluid`, className);

  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <NumberInput ref={ref} className={classNames} {...other} />
    </FormContext.Provider>
  );
});

FluidNumberInput.propTypes = {
  /**
   * `true` to allow empty string.
   */
  allowEmpty: PropTypes.bool,

  /**
   * Specify an optional className to be applied to the wrapper node
   */
  className: PropTypes.string,

  /**
   * Optional starting value for uncontrolled state
   */
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Specify if the wheel functionality for the input should be disabled, or not
   */
  disableWheel: PropTypes.bool,

  /**
   * Specify if the control should be disabled, or not
   */
  disabled: PropTypes.bool,

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
   * Provide an optional handler that is called when the internal state of
   * NumberInput changes. This handler is called with event and state info.
   * `(event, { value, direction }) => void`
   */
  onChange: PropTypes.func,

  /**
   * Provide an optional function to be called when the up/down button is clicked
   */
  onClick: PropTypes.func,

  /**
   * Provide an optional function to be called when a key is pressed in the number input
   */
  onKeyUp: PropTypes.func,

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

  /**
   * Whether or not the component is readonly
   */
  readOnly: PropTypes.bool,
};

export default FluidNumberInput;
