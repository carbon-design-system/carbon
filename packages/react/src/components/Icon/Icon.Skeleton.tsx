/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { ComponentProps } from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

export interface IconSkeletonProps extends ComponentProps<'div'> {
  /**
   * Specify an optional className to add.
   */
  className?: string;
}

const IconSkeleton = ({ className, ...rest }: IconSkeletonProps) => {
  const prefix = usePrefix();

  return (
    <div className={cx(`${prefix}--icon--skeleton`, className)} {...rest} />
  );
};

IconSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,
};

export default IconSkeleton;
export { IconSkeleton };
