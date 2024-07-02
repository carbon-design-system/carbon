/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { ListBoxSize, PropTypes as ListBoxPropTypes } from '../ListBox';
import { usePrefix } from '../../internal/usePrefix';
import { ReactAttr } from '../../types/common';

export interface DropdownSkeletonProps extends ReactAttr<HTMLDivElement> {
  /**
   * Specify an optional className to add.
   */
  className?: string;

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel?: boolean;

  /**
   * Specify the size of the ListBox.
   */
  size?: ListBoxSize;
}

const DropdownSkeleton: React.FC<DropdownSkeletonProps> = ({
  className,
  size,
  hideLabel,
  ...rest
}: DropdownSkeletonProps) => {
  const prefix = usePrefix();
  const wrapperClasses = cx(
    className,
    `${prefix}--skeleton`,
    `${prefix}--form-item`,
    {
      [`${prefix}--list-box--${size}`]: size,
    }
  );

  return (
    <div className={wrapperClasses} {...rest}>
      {!hideLabel && (
        <span className={`${prefix}--label ${prefix}--skeleton`} />
      )}
      <div className={`${prefix}--skeleton ${prefix}--dropdown`} />
    </div>
  );
};

DropdownSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel: PropTypes.bool,

  /**
   * Specify the size of the ListBox.
   */
  size: ListBoxPropTypes.ListBoxSize,
};

export default DropdownSkeleton;
export { DropdownSkeleton };
