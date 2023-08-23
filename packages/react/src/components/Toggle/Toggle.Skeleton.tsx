/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

interface ToggleSkeletonProps {
  'aria-label'?: string;
  className?: string;
}

const ToggleSkeleton: React.FC<ToggleSkeletonProps> = ({
  className,
  ...rest
}) => {
  const prefix = usePrefix();

  const skeletonClassNames = cx(
    `${prefix}--toggle ${prefix}--toggle--skeleton`,
    className
  );

  return (
    <div className={skeletonClassNames} {...rest}>
      <div className={`${prefix}--toggle__skeleton-circle`} />
      <div className={`${prefix}--toggle__skeleton-rectangle`} />
    </div>
  );
};

ToggleSkeleton.propTypes = {
  'aria-label': PropTypes.string,
  className: PropTypes.string,
};

export default ToggleSkeleton;
export { ToggleSkeleton };
