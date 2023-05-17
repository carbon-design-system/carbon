/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ChevronDown } from '@carbon/icons-react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { usePrefix } from '../../internal/usePrefix';
import { ForwardRefReturn } from '../../types/common';

export type TimePickerSelectProps = {
  /**
   * Provide the contents of your TimePickerSelect
   */
  children?: React.ReactNode;

  /**
   * Specify an optional className to be applied to the node containing the label and the select box
   */
  className?: string;

  /**
   * Optionally provide the default value of the `<select>`
   */
  defaultValue?: any;

  /**
   * Specify whether the control is disabled
   */
  disabled?: boolean;

  /**
   * Specify a custom `id` for the `<select>`
   */
  id: string;
} & React.SelectHTMLAttributes<HTMLSelectElement> &
  React.InputHTMLAttributes<HTMLSelectElement>;

type TimePickerSelectComponent = ForwardRefReturn<
  HTMLSelectElement,
  TimePickerSelectProps
>;

const TimePickerSelect: TimePickerSelectComponent = React.forwardRef(
  function TimePickerSelect(
    {
      ['aria-label']: ariaLabel = 'open list of options',
      children,
      id,
      disabled = false,
      className,
      ...rest
    },
    ref
  ) {
    const prefix = usePrefix();

    const selectClasses = cx({
      [`${prefix}--select`]: true,
      [`${prefix}--time-picker__select`]: true,
      ...(className && { [className]: true }),
    });

    return (
      <div className={selectClasses}>
        <select
          aria-label={ariaLabel}
          className={`${prefix}--select-input`}
          disabled={disabled}
          id={id}
          ref={ref}
          {...rest}>
          {children}
        </select>
        <ChevronDown
          className={`${prefix}--select__arrow`}
          aria-hidden="true"
        />
      </div>
    );
  }
);

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
   * Specify a custom `id` for the `<select>`
   */
  id: PropTypes.string.isRequired,
};

export default TimePickerSelect;
