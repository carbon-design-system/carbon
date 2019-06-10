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

const { prefix } = settings;

const SwitcherItemLink = React.forwardRef(function SwitcherItemLink(
  props,
  ref
) {
  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    className: customClassName,
    children,
    isSelected,
  } = props;

  const accessibilityLabel = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
  };

  const className = cx(`${prefix}--switcher__item-link`, {
    [`${prefix}--switcher__item-link--selected`]: isSelected,
    [customClassName]: !!customClassName,
  });

  return (
    <a ref={ref} className={className} {...accessibilityLabel}>
      {children}
    </a>
  );
});

SwitcherItemLink.propTypes = {
  /**
   * Required props for accessibility label on the underlying menu
   */
  ...AriaLabelPropType,

  /**
   * Optionally provide a custom class to apply to the underlying <li> node
   */
  className: PropTypes.string,

  /**
   * Specify whether the link is currently on the page
   */
  isSelected: PropTypes.bool,

  /**
   * Specify the text content for the link
   */
  children: PropTypes.string.isRequired,
};

export default SwitcherItemLink;
