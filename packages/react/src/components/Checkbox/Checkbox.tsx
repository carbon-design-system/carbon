/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes, { ReactNodeLike } from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Text } from '../Text';
import { usePrefix } from '../../internal/usePrefix';
import { WarningFilled, WarningAltFilled } from '@carbon/icons-react';
import setupGetInstanceId from '../../tools/setupGetInstanceId';

const getInstanceId = setupGetInstanceId();

type ExcludedAttributes = 'id' | 'onChange' | 'onClick' | 'type';

export interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    ExcludedAttributes
  > {
  /**
   * Provide an `id` to uniquely identify the Checkbox input
   */
  id: string;

  /**
   * Provide a label to provide a description of the Checkbox input that you are
   * exposing to the user
   */
  labelText: NonNullable<ReactNodeLike>;

  /**
   * Specify whether the underlying input should be checked by default
   */
  defaultChecked?: boolean;

  /**
   * Specify whether the Checkbox should be disabled
   */
  disabled?: boolean;

  /**
   * Provide text for the form group for additional help
   */
  helperText?: React.ReactNode;

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel?: boolean;

  /**
   * Specify whether the Checkbox is in an indeterminate state
   */
  indeterminate?: boolean;

  /**
   * Specify whether the Checkbox is currently invalid
   */
  invalid?: boolean;

  /**
   * Provide the text that is displayed when the Checkbox is in an invalid state
   */
  invalidText: React.ReactNode;

  /**
   * Specify whether the Checkbox is currently invalid
   */
  warn?: boolean;

  /**
   * Provide the text that is displayed when the Checkbox is in an invalid state
   */
  warnText: React.ReactNode;

  /**
   * Provide an optional handler that is called when the internal state of
   * Checkbox changes. This handler is called with event and state info.
   * `(event, { checked, id }) => void`
   */
  onChange?: (
    evt: React.ChangeEvent<HTMLInputElement>,
    data: { checked: boolean; id: string }
  ) => void;

  /**
   * Provide an optional onClick handler that is called on click
   */
  onClick?: (evt: React.MouseEvent<HTMLInputElement>) => void;
}

const Checkbox = React.forwardRef(
  (
    {
      className,
      helperText,
      id,
      labelText,
      onChange,
      onClick,
      indeterminate,
      invalid,
      invalidText,
      hideLabel,
      readOnly,
      title = '',
      warn,
      warnText,
      ...other
    }: CheckboxProps,
    ref
  ) => {
    const prefix = usePrefix();

    const showWarning = !readOnly && !invalid && warn;
    const showHelper = !invalid && !warn;

    const checkboxGroupInstanceId = getInstanceId();

    const helperId = !helperText
      ? undefined
      : `checkbox-helper-text-${checkboxGroupInstanceId}`;

    const helper = helperText ? (
      <div id={helperId} className={`${prefix}--form__helper-text`}>
        {helperText}
      </div>
    ) : null;

    const wrapperClasses = classNames(
      `${prefix}--form-item`,
      `${prefix}--checkbox-wrapper`,
      className,
      {
        [`${prefix}--checkbox-wrapper--readonly`]: readOnly,
        [`${prefix}--checkbox-wrapper--invalid`]: !readOnly && invalid,
        [`${prefix}--checkbox-wrapper--warning`]: showWarning,
      }
    );
    const innerLabelClasses = classNames(`${prefix}--checkbox-label-text`, {
      [`${prefix}--visually-hidden`]: hideLabel,
    });

    return (
      <div className={wrapperClasses}>
        <input
          {...other}
          type="checkbox"
          data-invalid={invalid ? true : undefined}
          onChange={(evt) => {
            if (!readOnly && onChange) {
              onChange(evt, { checked: evt.target.checked, id });
            }
          }}
          className={`${prefix}--checkbox`}
          id={id}
          ref={(el) => {
            if (el && indeterminate) {
              el.indeterminate = indeterminate;
            }
            if (typeof ref === 'function') {
              ref(el);
            } else if (ref && Object(ref) === ref) {
              ref.current = el;
            }
          }}
          // readonly attribute not applicable to type="checkbox"
          // see - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox
          aria-readonly={readOnly}
          onClick={(evt) => {
            if (readOnly) {
              // prevent default stops the checkbox being updated
              evt.preventDefault();
            }
            // pass onClick event on to the user even if readonly
            if (onClick) {
              onClick(evt);
            }
          }}
        />
        <label
          htmlFor={id}
          className={`${prefix}--checkbox-label`}
          title={title}>
          <Text className={innerLabelClasses}>{labelText}</Text>
        </label>
        <div className={`${prefix}--checkbox__validation-msg`}>
          {!readOnly && invalid && (
            <>
              <WarningFilled className={`${prefix}--checkbox__invalid-icon`} />
              <div className={`${prefix}--form-requirement`}>{invalidText}</div>
            </>
          )}
          {showWarning && (
            <>
              <WarningAltFilled
                className={`${prefix}--checkbox__invalid-icon ${prefix}--checkbox__invalid-icon--warning`}
              />
              <div className={`${prefix}--form-requirement`}>{warnText}</div>
            </>
          )}
        </div>
        {showHelper && helper}
      </div>
    );
  }
);

Checkbox.propTypes = {
  /**
   * Specify whether the underlying input should be checked
   */
  checked: PropTypes.bool,

  /**
   * Specify an optional className to be applied to the <label> node
   */
  className: PropTypes.string,

  /**
   * Specify whether the underlying input should be checked by default
   */
  defaultChecked: PropTypes.bool,

  /**
   * Specify whether the Checkbox should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide text for the form group for additional help
   */
  helperText: PropTypes.node,

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,

  /**
   * Provide an `id` to uniquely identify the Checkbox input
   */
  id: PropTypes.string.isRequired,

  /**
   * Specify whether the Checkbox is in an indeterminate state
   */
  indeterminate: PropTypes.bool,

  /**
   * Specify whether the Checkbox is currently invalid
   */
  invalid: PropTypes.bool,

  /**
   * Provide the text that is displayed when the Checkbox is in an invalid state
   */
  invalidText: PropTypes.node,

  /**
   * Provide a label to provide a description of the Checkbox input that you are
   * exposing to the user
   */
  labelText: PropTypes.node.isRequired,

  /**
   * Provide an optional handler that is called when the internal state of
   * Checkbox changes. This handler is called with event and state info.
   * `(event, { checked, id }) => void`
   */
  onChange: PropTypes.func,

  /**
   * Specify whether the Checkbox is read-only
   */
  readOnly: PropTypes.bool,

  /**
   * Specify a title for the <label> node for the Checkbox
   */
  title: PropTypes.string,

  /**
   * Specify whether the Checkbox is currently in warning state
   */
  warn: PropTypes.bool,

  /**
   * Provide the text that is displayed when the Checkbox is in warning state
   */
  warnText: PropTypes.node,
};

Checkbox.defaultProps = {
  onChange: () => {},
  indeterminate: false,
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;
