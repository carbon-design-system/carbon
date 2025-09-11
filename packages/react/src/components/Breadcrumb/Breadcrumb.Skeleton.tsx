/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

export interface BreadcrumbSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Specify an optional className to add.
   */
  className?: string;

  /**
   * Specify the number of items
   */
  items?: number;

  /**
   * Optional prop to omit the trailing slash for the breadcrumbs
   */
  noTrailingSlash?: boolean;

  /**
   * Specify the size of the Breadcrumb. Currently
   * supports the following: `sm` & `md` (default: 'md')
   */
  size?: 'sm' | 'md';
}

function Item() {
  const prefix = usePrefix();

  return (
    <div className={`${prefix}--breadcrumb-item`}>
      <span className={`${prefix}--link`}>&nbsp;</span>
    </div>
  );
}

function BreadcrumbSkeleton({
  className,
  items = 3,
  noTrailingSlash,
  size,
  ...rest
}: BreadcrumbSkeletonProps) {
  const prefix = usePrefix();
  const classes = cx(
    {
      [`${prefix}--breadcrumb`]: true,
      [`${prefix}--skeleton`]: true,
      [`${prefix}--breadcrumb--no-trailing-slash`]: noTrailingSlash,
      [`${prefix}--breadcrumb--sm`]: size === 'sm',
    },
    className
  );

  return (
    <div className={classes} {...rest}>
      {Array.from({ length: items }, (_, i) => (
        <Item key={i} />
      ))}
    </div>
  );
}

BreadcrumbSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * Specify the number of items
   */
  items: PropTypes.number,

  /**
   * Optional prop to omit the trailing slash for the breadcrumbs
   */
  noTrailingSlash: PropTypes.bool,

  /**
   * Specify the size of the Breadcrumb. Currently supports the following: `sm` & `md` (default: 'md')
   */
  size: PropTypes.oneOf(['sm', 'md']),
};

export default BreadcrumbSkeleton;
export { BreadcrumbSkeleton };
