/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { HTMLAttributes, ReactNode } from 'react';
import classnames from 'classnames';
import * as FeatureFlags from '@carbon/feature-flags';
import { usePrefix } from '../../internal/usePrefix';

export interface SelectItemGroupProps
  extends HTMLAttributes<HTMLOptGroupElement> {
  /**
   * Provide the contents of your <SelectItemGroup>
   */
  children?: ReactNode;

  /**
   * Specify an optional className to be applied to the node
   */
  className?: string;

  /**
   * Specify whether the <SelectItemGroup> should be disabled
   */
  disabled?: boolean;

  /**
   * Specify the label to be displayed
   */
  label: string;
}
const SelectItemGroup = ({
  children,
  className,
  disabled,
  label,
  ...other
}: SelectItemGroupProps) => {
  const prefix = usePrefix();
  const classNames = classnames(`${prefix}--select-optgroup`, className);
  return (
    <optgroup
      className={classNames}
      label={label}
      disabled={disabled}
      {...other}>
      {children}
    </optgroup>
  );
};

SelectItemGroup.propTypes = {
  /**
   * Provide the contents of your <SelectItemGroup>
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the node
   */
  className: PropTypes.string,

  /**
   * Specify whether the <SelectItemGroup> should be disabled
   */
  disabled: PropTypes.bool,

  /**
   * Specify the label to be displayed
   */
  label: PropTypes.string.isRequired,
};

SelectItemGroup.defaultProps = {
  disabled: false,
  label: FeatureFlags.enabled('enable-v11-release')
    ? undefined
    : 'Provide label',
};

export default SelectItemGroup;
