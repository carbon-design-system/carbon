/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { iconCaretDown } from 'carbon-icons';
import { settings } from 'carbon-components';
import Icon from '../Icon';
import { componentsX } from '../../internal/FeatureFlags';
// TODO: import { ChevronDownGlyph } from '@carbon/icons-react';
import ChevronDownGlyph from '@carbon/icons-react/lib/chevron--down/index';

const { prefix } = settings;

const Select = ({
  className,
  id,
  inline,
  labelText,
  disabled,
  children,
  iconDescription,
  hideLabel,
  invalid,
  invalidText,
  helperText,
  light,
  ...other
}) => {
  const selectClasses = classNames({
    [`${prefix}--select`]: true,
    [`${prefix}--select--inline`]: inline,
    [`${prefix}--select--light`]: light,
    [className]: className,
  });
  const labelClasses = classNames(`${prefix}--label`, {
    [`${prefix}--visually-hidden`]: hideLabel,
  });
  const errorId = `${id}-error-msg`;
  const error = invalid ? (
    <div className={`${prefix}--form-requirement`} id={errorId}>
      {invalidText}
    </div>
  ) : null;
  const helper = helperText ? (
    <div className={`${prefix}--form__helper-text`}>{helperText}</div>
  ) : null;
  const ariaProps = {};
  if (invalid) {
    ariaProps['aria-describedby'] = errorId;
  }
  return (
    <div className={`${prefix}--form-item`}>
      <div className={selectClasses}>
        <label htmlFor={id} className={labelClasses}>
          {labelText}
        </label>
        {componentsX && !inline && helper}
        <select
          {...other}
          {...ariaProps}
          id={id}
          className={`${prefix}--select-input`}
          disabled={disabled || undefined}
          data-invalid={invalid || undefined}
          aria-invalid={invalid || undefined}>
          {children}
        </select>
        {componentsX ? (
          <ChevronDownGlyph
            aria-hidden={true}
            aria-label={iconDescription}
            alt={iconDescription}
            className={`${prefix}--select__arrow`}
            name="chevron--down"
          />
        ) : (
          <Icon
            icon={iconCaretDown}
            className={`${prefix}--select__arrow`}
            description={iconDescription}
          />
        )}
        {!componentsX && helper}
        {componentsX && inline && helper}
        {error}
      </div>
    </div>
  );
};

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
  iconDescription: PropTypes.string.isRequired,

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
};

Select.defaultProps = {
  disabled: false,
  labelText: 'Select',
  inline: false,
  iconDescription: 'open list of options',
  invalid: false,
  invalidText: '',
  helperText: '',
  light: false,
};

export default Select;
