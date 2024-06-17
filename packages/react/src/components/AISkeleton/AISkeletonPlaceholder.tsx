/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { SkeletonPlaceholder } from '../SkeletonPlaceholder';

export interface AISkeletonPlaceholderProps {
  /**
   * Add a custom class to the component to set the height and width
   */
  className?: string;
}

const AISkeletonPlaceholder = ({
  className,
  ...other
}: AISkeletonPlaceholderProps) => {
  const prefix = usePrefix();
  const AISkeletonPlaceholderClasses = classNames(
    { className, [`${prefix}--skeleton__placeholder--ai`]: true },
    className
  );

  return (
    <SkeletonPlaceholder className={AISkeletonPlaceholderClasses} {...other} />
  );
};

AISkeletonPlaceholder.propTypes = {
  /**
   * Add a custom class to the component
   * to set the height and width
   */
  className: PropTypes.string,
};

export default AISkeletonPlaceholder;
