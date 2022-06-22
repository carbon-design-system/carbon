/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';
import { usePrefix } from '../../internal/usePrefix';

function HeaderNavigation(props) {
  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    children,
    className: customClassName,
    ...rest
  } = props;
  const prefix = usePrefix();
  const className = cx(`${prefix}--header__nav`, customClassName);
  // Assign both label strategies in this option, only one should be defined
  // so when we spread that should be the one that is applied to the node
  const accessibilityLabel = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
  };

  return (
    <nav {...rest} {...accessibilityLabel} className={className}>
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

export { HeaderNavigation };
