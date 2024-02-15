/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

const ChatButtonSkeleton = ({ className, size, ...rest }) => {
  const prefix = usePrefix();
  const skeletonClasses = cx(
    className,
    `${prefix}--skeleton`,
    `${prefix}--btn`,
    `${prefix}--chat-btn`,
    { [`${prefix}--layout--size-${size}`]: size }
  );

  return <div className={skeletonClasses} {...rest} />;
};

ChatButtonSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * Specify the size of the `ChatButtonSkeleton`, from the following list of sizes:
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default ChatButtonSkeleton;
