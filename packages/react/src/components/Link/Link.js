/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const Link = ({
  children,
  className,
  href,
  disabled,
  inline,
  visited,
  size,
  ...other
}) => {
  const classNames = classnames(`${prefix}--link`, className, {
    [`${prefix}--link--disabled`]: disabled,
    [`${prefix}--link--inline`]: inline,
    [`${prefix}--link--visited`]: visited,
    [`${prefix}--link--${size}`]: size,
  });

  const Tag = disabled ? 'p' : 'a';
  const rel = other.target === '_blank' ? 'noopener' : null;
  return (
    <Tag
      href={disabled ? null : href}
      className={classNames}
      rel={rel}
      {...other}>
      {children}
    </Tag>
  );
};

Link.propTypes = {
  /**
   * Provide the content for the Link
   */
  children: PropTypes.node,

  /**
   * Provide a custom className to be applied to the containing `<a>` node
   */
  className: PropTypes.string,

  /**
   * Specify if the control should be disabled, or not
   */
  disabled: PropTypes.bool,

  /**
   * Provide the `href` attribute for the `<a>` node
   */
  href: PropTypes.string,

  /**
   * Specify whether you want the inline version of this control
   */
  inline: PropTypes.bool,

  /**
   * Specify the size of the Link. Currently supports either `sm` or `lg` as an option.
   */
  size: PropTypes.oneOf(['sm', 'lg']),

  /**
   * Specify whether you want the link to receive visited styles after the link has been clicked
   */
  visited: PropTypes.bool,
};

export default Link;
