/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

function TagSkeleton({ className, size, ...rest }) {
  const prefix = usePrefix();
  return (
    <span
      className={cx(`${prefix}--tag`, `${prefix}--skeleton`, className, {
        [`${prefix}--tag--${size}`]: size,
      })}
      {...rest}
    />
  );
}

TagSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * Specify the size of the Tag. Currently supports either `sm` or
   * default sizes.
   */
  size: PropTypes.oneOf(['sm']),
};

export default TagSkeleton;
