/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { settings } from 'carbon-components';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';
import Link from './Link';

const { prefix } = settings;

const SwitcherItem = React.forwardRef(function SwitcherItem(props, ref) {
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
    <li className={className} role="menuitem">
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

SwitcherItem.propTypes = {
  /**
   * Required props for accessibility label on the underlying menuitem
   */
  ...AriaLabelPropType,

  /**
   * Optionally provide a custom class to apply to the underlying <li> node
   */
  className: PropTypes.string,

  /**
   * Specify the text content for the link
   */
  children: PropTypes.node.isRequired,
};

export default SwitcherItem;
