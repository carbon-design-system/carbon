/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import { ChevronDown16, WarningFilled16 } from '@carbon/icons-react';
import deprecate from '../../prop-types/deprecate';

const { prefix } = settings;

const Select = React.forwardRef(function Select(
  {
    className,
    id,
    inline,
    labelText,
    disabled,
    children,
    // reserved for use with <Pagination> component
    noLabel,
    // eslint-disable-next-line no-unused-vars
    iconDescription,
    hideLabel,
    invalid,
    invalidText,
    helperText,
    light,
    ...other
  },
  ref
) {
  const selectClasses = classNames({
    [`${prefix}--select`]: true,
    [`${prefix}--select--inline`]: inline,
    [`${prefix}--select--light`]: light,
    [`${prefix}--select--invalid`]: invalid,
    [`${prefix}--select--disabled`]: disabled,
    [className]: className,
  });
  const labelClasses = classNames(`${prefix}--label`, {
    [`${prefix}--visually-hidden`]: hideLabel,
    [`${prefix}--label--disabled`]: disabled,
  });
  const errorId = `${id}-error-msg`;
  const error = invalid ? (
    <div className={`${prefix}--form-requirement`} id={errorId}>
      {invalidText}
    </div>
  ) : null;
  const helperTextClasses = classNames(`${prefix}--form__helper-text`, {
    [`${prefix}--form__helper-text--disabled`]: disabled,
  });
  const helper = helperText ? (
    <div className={helperTextClasses}>{helperText}</div>
  ) : null;
  const ariaProps = {};
  if (invalid) {
    ariaProps['aria-describedby'] = errorId;
  }
  const input = (() => {
    return (
      <>
        <select
          {...other}
          {...ariaProps}
          id={id}
          className={`${prefix}--select-input`}
          disabled={disabled || undefined}
          aria-invalid={invalid || undefined}
          ref={ref}>
          {children}
        </select>
        <ChevronDown16 className={`${prefix}--select__arrow`} />
        {invalid && (
          <WarningFilled16 className={`${prefix}--select__invalid-icon`} />
        )}
      </>
    );
  })();
  return (
    <div className={`${prefix}--form-item`}>
      <div className={selectClasses}>
        {!noLabel && (
          <label htmlFor={id} className={labelClasses}>
            {labelText}
          </label>
        )}
        {!inline && helper}
        {inline && (
          <>
            <div className={`${prefix}--select-input--inline__wrapper`}>
              <div
                className={`${prefix}--select-input__wrapper`}
                data-invalid={invalid || null}>
                {input}
              </div>
              {error}
            </div>
            {helper}
          </>
        )}
        {!inline && (
          <div
            className={`${prefix}--select-input__wrapper`}
            data-invalid={invalid || null}>
            {input}
          </div>
        )}
        {!inline && error}
      </div>
    </div>
  );
});

Select.displayName = 'Select';

Select.propTypes = {
  /**
   * Provide the contents of your Select
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the node containing the label and the select box
   */
  className: PropTypes.string,

  /**
   * Specify a custom `id` for the `<select>`
   */
  id: PropTypes.string.isRequired,

  /**
   * Specify whether you want the inline version of this control
   */
  inline: PropTypes.bool,

  /**
   * Provide label text to be read by screen readers when interacting with the
   * control
   */
  labelText: PropTypes.node,

  /**
   * Provide an optional `onChange` hook that is called each time the value of
   * the underlying <input> changes
   */
  onChange: PropTypes.func,

  /**
   * Specify whether the control is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Optionally provide the default value of the `<select>`
   */
  defaultValue: PropTypes.any,

  /**
   * Provide a description for the twistie icon that can be read by screen readers
   */
  iconDescription: deprecate(
    PropTypes.string,
    'The `iconDescription` prop for `Select` is no longer needed and has ' +
      'been deprecated. It will be moved in the next major release.'
  ),

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,

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
   * Specify whether you want the light version of this control
   */
  light: PropTypes.bool,

  /**
   * Reserved for use with <Pagination> component. Will not render a label for the
   * select since Pagination renders one for us.
   */
  noLabel: PropTypes.bool,
};

Select.defaultProps = {
  disabled: false,
  labelText: 'Select',
  inline: false,
  invalid: false,
  invalidText: '',
  helperText: '',
  light: false,
};

export default Select;
