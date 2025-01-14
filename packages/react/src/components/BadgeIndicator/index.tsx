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
   * Provide the text that will be read by screen readers when not in a button context
   */
  'aria-label'?: string;
}
export const BadgeIndicator = React.forwardRef(function BadgeIndicatorContent(
  {
    className: customClassName,
    count,
    'aria-label': ariaLabel,
    ...rest
  }: BadgeIndicatorProps,
  ref: React.Ref<HTMLDivElement>
) {
  const prefix = usePrefix();
  const classNames = cx(`${prefix}--badge-indicator`, customClassName, {
    [`${prefix}--badge-indicator--count`]: count,
  });
  const displayCount = count && count > 999 ? '999+' : count;
  const defaultAriaLabel = count
    ? `${count} ${count === 1 ? 'notification' : 'notifications'}`
    : 'New notification';
  return (
    <div
      className={classNames}
      ref={ref}
      role="status"
      aria-label={ariaLabel ?? defaultAriaLabel}
      {...rest}>
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
   * Provide the text that will be read by screen readers when not in a button context
   */
  'aria-label': PropTypes.string,
};
export default BadgeIndicator;
