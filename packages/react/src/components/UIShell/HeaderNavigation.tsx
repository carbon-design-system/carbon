/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React, { type ComponentProps } from 'react';
import PropTypes from 'prop-types';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';
import { usePrefix } from '../../internal/usePrefix';

type HeaderNavigationProps = ComponentProps<'nav'>;

export default function HeaderNavigation({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  children,
  className: customClassName,
  ...rest
}: HeaderNavigationProps) {
  const prefix = usePrefix();
  const className = cx(`${prefix}--header__nav`, customClassName);
  return (
    <nav
      {...rest}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={className}>
      <ul className={`${prefix}--header__menu-bar`}>{children}</ul>
    </nav>
  );
}

HeaderNavigation.propTypes = {
  /**
   * Required props for accessibility label on the underlying menu
   */
  ...AriaLabelPropType,

  /**
   * Provide valid children of HeaderNavigation, for example `HeaderMenuItem`
   * or `HeaderMenu`
   */
  children: PropTypes.node,

  /**
   * Optionally provide a custom class to apply to the underlying <nav> node
   */
  className: PropTypes.string,
};
