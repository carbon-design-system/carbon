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

export interface AiSkeletonPlaceholderProps {
  /**
   * Add a custom class to the component to set the height and width
   */
  className?: string;
}

const AiSkeletonPlaceholder = ({
  className,
  ...other
}: AiSkeletonPlaceholderProps) => {
  const prefix = usePrefix();
  const AiSkeletonPlaceholderClasses = classNames(
    { className, [`${prefix}--skeleton__placeholder--ai`]: true },
    className
  );

  return (
    <SkeletonPlaceholder className={AiSkeletonPlaceholderClasses} {...other} />
  );
};

AiSkeletonPlaceholder.propTypes = {
  /**
   * Add a custom class to the component
   * to set the height and width
   */
  className: PropTypes.string,
};

export default AiSkeletonPlaceholder;
