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

interface BadgeIndicatorProps {
  /**
   * Specify an optional className to add.
   */
  className?: string;

  /**
   * Count of badge indicator
   */
  count?: number;

  /**
   * Provide an `id` to uniquely identify the BadgeIndidcator
   */
  id?: string;
}
export const BadgeIndicator = React.forwardRef(function BadgeIndicatorContent(
  { className: customClassName, count, ...rest }: BadgeIndicatorProps,
  ref: React.Ref<HTMLDivElement>
) {
  const prefix = usePrefix();
  const classNames = cx(`${prefix}--badge-indicator`, customClassName, {
    [`${prefix}--badge-indicator--count`]: count,
  });
  const displayCount = count && count > 999 ? '999+' : count;
  return (
    <div className={classNames} ref={ref} {...rest}>
      {displayCount}
    </div>
  );
});
BadgeIndicator.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * Count of badge indicator
   */
  count: PropTypes.number,

  /**
   * Provide an `id` to uniquely identify the BadgeIndidcator
   */
  id: PropTypes.string,
};
export default BadgeIndicator;
