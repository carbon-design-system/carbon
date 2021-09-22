/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';
import Link from './Link';
import { usePrefix } from '../../internal/usePrefix';

const SwitcherItem = React.forwardRef(function SwitcherItem(props, ref) {
  const prefix = usePrefix();
  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    className: customClassName,
    children,
    isSelected,
    ...rest
  } = props;

  const className = cx(`${prefix}--switcher__item`, {
    [customClassName]: !!customClassName,
  });

  const accessibilityLabel = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
  };

  const linkClassName = cx(`${prefix}--switcher__item-link`, {
    [`${prefix}--switcher__item-link--selected`]: isSelected,
  });

  return (
    <li className={className}>
      <Link
        {...rest}
        ref={ref}
        className={linkClassName}
        tabIndex={0}
        {...accessibilityLabel}>
        {children}
      </Link>
    </li>
  );
});

SwitcherItem.displayName = 'SwitcherItem';
SwitcherItem.propTypes = {
  /**
   * Required props for accessibility label on the underlying menuitem
   */
  ...AriaLabelPropType,

  /**
   * Specify the text content for the link
   */
  children: PropTypes.node.isRequired,

  /**
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  className: PropTypes.string,
};

export default SwitcherItem;
