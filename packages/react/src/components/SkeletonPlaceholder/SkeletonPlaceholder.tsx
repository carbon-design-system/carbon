/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

export interface SkeletonPlaceholderProps {
  /**
   * Add a custom class to the component to set the height and width
   */
  className?: string;
}

const SkeletonPlaceholder = ({
  className,
  ...other
}: SkeletonPlaceholderProps) => {
  const prefix = usePrefix();
  const skeletonPlaceholderClasses = classNames(
    {
      [`${prefix}--skeleton__placeholder`]: true,
    },
    className
  );

  return <div className={skeletonPlaceholderClasses} {...other} />;
};

SkeletonPlaceholder.propTypes = {
  /**
   * Add a custom class to the component
   * to set the height and width
   */
  className: PropTypes.string,
};

export default SkeletonPlaceholder;
