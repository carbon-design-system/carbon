/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { ChevronDown16 } from '@carbon/icons-react';
import { usePrefix } from '../../../internal/usePrefix';

const TimePickerSelect = React.forwardRef(function TimePickerSelect(
  {
    children,
    id,
    disabled = false,
    iconDescription = 'open list of options',
    className,
    labelText,
    ...rest
  },
  ref
) {
  const prefix = usePrefix();

  const selectClasses = cx({
    [`${prefix}--select`]: true,
    [`${prefix}--time-picker__select`]: true,
    [className]: className,
  });

  const label = labelText ? <label htmlFor={id}>{labelText}</label> : null;

  return (
    <div
      style={{ backgroundColor: 'hotpink' }}
      className={selectClasses}
      ref={ref}>
      {label}
      <select
        id={id}
        className={`${prefix}--select-input`}
        disabled={disabled}
        {...rest}>
        {children}
      </select>
      <ChevronDown16
        className={`${prefix}--select__arrow`}
        aria-label={iconDescription}>
        {iconDescription && <title>{iconDescription}</title>}
      </ChevronDown16>
    </div>
  );
});

TimePickerSelect.propTypes = {
  /**
   * Provide the contents of your TimePickerSelect
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the node containing the label and the select box
   */
  className: PropTypes.string,

  /**
   * Optionally provide the default value of the `<select>`
   */
  defaultValue: PropTypes.any,

  /**
   * Specify whether the control is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide a description for the twistie icon that can be read by screen readers
   */
  iconDescription: PropTypes.string.isRequired,

  /**
   * Specify a custom `id` for the `<select>`
   */
  id: PropTypes.string.isRequired,

  /**
   * Provide label text to be read by screen readers when interacting with the
   * control
   */
  labelText: PropTypes.node.isRequired,
};

export default TimePickerSelect;
