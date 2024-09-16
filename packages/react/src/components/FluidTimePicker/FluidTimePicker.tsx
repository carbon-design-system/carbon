/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import { ReactNode, Children, forwardRef, cloneElement } from 'react';
import classnames from 'classnames';
import FluidTextInput from '../FluidTextInput';
import { usePrefix } from '../../internal/usePrefix';
import { WarningFilled, WarningAltFilled } from '@carbon/icons-react';

export interface FluidTimePickerProps {
  /**
   * The child node(s)
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be applied to the outer FluidTimePicker wrapper
   */
  className?: string;

  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled?: boolean;

  /**
   * Specify whether or not the control is invalid
   */
  invalid?: boolean;

  /**
   * Provide the text that is displayed when the control is in error state
   */
  invalidText?: ReactNode;

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: ReactNode;

  /**
   * Specify whether the control is currently in warning state
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText?: ReactNode;
}

const FluidTimePicker = forwardRef<HTMLInputElement, FluidTimePickerProps>(
  function FluidTimePicker(
    {
      className,
      children,
      disabled,
      invalid,
      invalidText,
      warn,
      warnText,
      ...other
    },
    ref
  ) {
    const prefix = usePrefix();

    const classNames = classnames(className, {
      [`${prefix}--time-picker--fluid`]: true,
      [`${prefix}--time-picker--equal-width`]:
        Children.toArray(children).length !== 2,
      [`${prefix}--time-picker--fluid--disabled`]: disabled,
      [`${prefix}--time-picker--fluid--invalid`]: invalid,
      [`${prefix}--time-picker--fluid--warning`]: warn,
    });

    const errorText = () => {
      if (invalid) {
        return invalidText;
      }
      if (warn) {
        return warnText;
      }
    };

    const error = invalid || warn;

    return (
      <div className={classNames}>
        <div className={`${prefix}--time-picker--fluid__wrapper`}>
          <div className={`${prefix}--time-picker__input`}>
            <FluidTextInput id="" disabled={disabled} ref={ref} {...other} />
          </div>
          {disabled
            ? Children.toArray(children).map((child) => {
                return cloneElement(child as React.ReactElement, { disabled });
              })
            : children}
        </div>
        {error && <hr className={`${prefix}--time-picker__divider`} />}
        {error && (
          <div className={`${prefix}--form-requirement`}>{errorText()}</div>
        )}
        {error && invalid ? (
          <WarningFilled
            className={`${prefix}--time-picker__icon ${prefix}--time-picker__icon--invalid`}
          />
        ) : (
          <WarningAltFilled
            className={`${prefix}--time-picker__icon ${prefix}--time-picker__icon--warn`}
          />
        )}
      </div>
    );
  }
);

FluidTimePicker.propTypes = {
  /**
   * The child node(s)
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the outer FluidTimePicker wrapper
   */
  className: PropTypes.string,

  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify whether or not the control is invalid
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in error state
   */
  invalidText: PropTypes.node,

  /**
   * Provide the text that will be read by a screen reader when visiting this
   * control
   */
  labelText: PropTypes.node.isRequired,

  /**
   * Specify whether the control is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  warnText: PropTypes.node,
};

export default FluidTimePicker;
