/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
// import { ChevronDown } from '@carbon/react/icons';
import { ChevronDown } from '@carbon/icons-react/next';

// import { ChevronDown16 } from '@carbon/icons-react';

import { usePrefix } from '../../../internal/usePrefix';
import deprecate from '../../../prop-types/deprecate';

const TimePickerSelect = React.forwardRef(function TimePickerSelect(
  {
    ['aria-label']: ariaLabel = 'open list of options',
    children,
    id,
    disabled = false,
    className,
    // labelText,
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

  return (
    <div className={selectClasses} ref={ref}>
      <select
        id={id}
        className={`${prefix}--select-input`}
        disabled={disabled}
        aria-label={ariaLabel}
        {...rest}>
        {children}
      </select>
      <ChevronDown className={`${prefix}--select__arrow`} aria-hidden="true" />
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
  iconDescription: deprecate(
    PropTypes.string,
    'The `iconDescription` prop for `TimePickerSelect` is no longer needed and has ' +
      'been deprecated. It will be moved in the next major release. Use "aria-label" instead'
  ),

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
