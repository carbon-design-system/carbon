/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const ButtonSkeleton = ({ small, href }) => {
  const buttonClasses = classNames({
    [`${prefix}--skeleton`]: true,
    [`${prefix}--btn`]: true,
    [`${prefix}--btn--sm`]: small,
  });

  const commonProps = {
    className: buttonClasses,
  };

  const button = <button {...commonProps} type="button" />;

  const anchor = <a {...commonProps} href={href} role="button" />; // eslint-disable-line

  return href ? anchor : button;
};

ButtonSkeleton.propTypes = {
  /**
   * Specify whether the Button should be a small variant
   */
  small: PropTypes.bool,

  /**
   * Optionally specify an href for your Button to become an <a> element
   */
  href: PropTypes.string,
};

ButtonSkeleton.defaultProps = {
  small: false,
};

export default ButtonSkeleton;
