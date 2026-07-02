/**
 * Copyright IBM Corp. 2022, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
export interface FluidSelectSkeletonProps {
  /**
   * Specify an optional className to add.
   */
  className?: string;
}

const FluidSelectSkeleton = ({
  className,
  ...rest
}: FluidSelectSkeletonProps) => {
  const prefix = usePrefix();
  const wrapperClasses = cx(className, `${prefix}--list-box__wrapper--fluid`);

  return (
    <div className={wrapperClasses} {...rest}>
      <div className={`${prefix}--skeleton ${prefix}--list-box`}>
        <span className={`${prefix}--list-box__label`} />
        <div className={`${prefix}--list-box__field`} />
      </div>
    </div>
  );
};

FluidSelectSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,
};

export default FluidSelectSkeleton;
