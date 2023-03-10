/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { HTMLAttributes } from 'react';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

export interface SelectItemProps extends HTMLAttributes<HTMLOptionElement> {
  /**
   * Specify an optional className to be applied to the node
   */
  className?: string;

  /**
   * Specify whether the <SelectItem> should be disabled
   */
  disabled?: boolean;

  /**
   * Specify whether the <SelectItem> is hidden
   */
  hidden?: boolean;

  /**
   * Provide the contents of your <SelectItem>
   */
  text: string;

  /**
   * Specify the value of the <SelectItem>
   */
  value: any;
}

const SelectItem = ({
  className,
  value,
  disabled,
  hidden,
  text,
  ...other
}: SelectItemProps) => {
  const prefix = usePrefix();
  const selectItemClasses = classNames({
    [`${prefix}--select-option`]: true,
    ...(className && { [className]: className }),
  });

  return (
    <option
      {...other}
      className={selectItemClasses}
      value={value}
      disabled={disabled}
      hidden={hidden}>
      {text}
    </option>
  );
};

SelectItem.propTypes = {
  /**
   * Specify an optional className to be applied to the node
   */
  className: PropTypes.string,

  /**
   * Specify whether the <SelectItem> should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify whether the <SelectItem> is hidden
   */
  hidden: PropTypes.bool,

  /**
   * Provide the contents of your <SelectItem>
   */
  text: PropTypes.string.isRequired,

  /**
   * Specify the value of the <SelectItem>
   */
  value: PropTypes.any.isRequired,
};

SelectItem.defaultProps = {
  disabled: false,
  hidden: false,
  value: '',
  text: '',
};

export default SelectItem;
