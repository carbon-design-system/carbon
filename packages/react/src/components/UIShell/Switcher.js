/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useRef } from 'react';
import { settings } from 'carbon-components';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';

const { prefix } = settings;

const Switcher = React.forwardRef(function Switcher(props, ref) {
  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    className: customClassName,
    links,
  } = props;

  const accessibilityLabel = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
  };

  const className = cx({
    [`${prefix}--switcher`]: true,
    [customClassName]: !!customClassName,
  });

  const classNameItem = cx({
    [`${prefix}--switcher--item`]: true,
    [customClassName]: !!customClassName,
  });

  const classNameItemLink = cx({
    [`${prefix}--switcher--item-link`]: true,
    [customClassName]: !!customClassName,
  });

  return (
    <ul className={`${className}`} {...accessibilityLabel}>
      {links &&
        links.map((link, i) => {
          return (
            <li key={i} className={`${classNameItem}`}>
              <a
                className={`${classNameItemLink}`}
                tabIndex={0}
                href={link.href}
                aria-label={link.linkText}>
                {link.linkText}
              </a>
            </li>
          );
        })}
    </ul>
  );
});

Switcher.propTypes = {
  /**
   * Required props for accessibility label on the underlying menu
   */
  ...AriaLabelPropType,

  /**
   * Optionally provide a custom class to apply to the underlying <li> node
   */
  className: PropTypes.string,

  /**
   * Required prop of an array of links
   */
  links: PropTypes.array,
};

export default Switcher;
