/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import { deprecate } from '../../prop-types/deprecate';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

export interface SearchSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Specify an optional className to add.
   */
  className?: string;

  /**
   * Specify the size of the SearchSkeleton
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';

  /**
   * Specify whether the Search should be a small variant.
   * @deprecated Use `size` prop instead. This prop will be removed in the next major release.
   */
  small?: boolean;
}

const SearchSkeleton = ({
  small = false,
  size,
  className,
  ...rest
}: SearchSkeletonProps) => {
  const prefix = usePrefix();
  const searchClasses = cx(className, {
    [`${prefix}--skeleton`]: true,
    [`${prefix}--search--sm`]: small, // TODO: V12 - Remove this class
    [`${prefix}--layout--size-${size}`]: size,
  });

  return (
    <div className={searchClasses} {...rest}>
      <div className={`${prefix}--search-input`} />
    </div>
  );
};

SearchSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * Specify the size of the SearchSkeleton
   */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),

  /**
   * Specify whether the Search should be a small variant
   */
  small: deprecate(
    PropTypes.bool,
    'The `small` prop has been deprecated and will be removed in the next major release. Please use the `size` prop instead.'
  ),
};

export default SearchSkeleton;
export { SearchSkeleton };
