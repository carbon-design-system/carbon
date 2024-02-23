/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';
import { SkeletonIcon } from '../SkeletonIcon';

interface AiSkeletonIconProps {
  /**
   * Specify an optional className to add.
   */
  className?: string;

  /**
   * The CSS styles.
   */
  style?: React.CSSProperties;
}

const AiSkeletonIcon = ({ className, ...rest }: AiSkeletonIconProps) => {
  const prefix = usePrefix();
  const AiSkeletonIconClasses = classNames(className, {
    [`${prefix}--skeleton__icon--ai`]: true,
  });

  return <SkeletonIcon className={AiSkeletonIconClasses} {...rest} />;
};

AiSkeletonIcon.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * The CSS styles.
   */
  style: PropTypes.object,
};

export default AiSkeletonIcon;
