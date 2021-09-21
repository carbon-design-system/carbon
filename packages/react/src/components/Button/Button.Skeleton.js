/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { useFeatureFlag } from '../FeatureFlags';
import { usePrefix } from '../../internal/usePrefix';

const ButtonSkeleton = ({ className, small, href, size, ...rest }) => {
  const enabled = useFeatureFlag('enable-v11-release');
  const prefix = usePrefix();

  const buttonClasses = cx(className, {
    [`${prefix}--skeleton`]: true,
    [`${prefix}--btn`]: true,
    [`${prefix}--btn--sm`]: small || size === 'sm',
    [`${prefix}--btn--md`]: size === 'field' || size === 'md',
    // V11: change lg to xl
    [`${prefix}--btn--lg`]: enabled ? size === 'xl' : size === 'lg',
    // V11: change xl to 2xl
    [`${prefix}--btn--xl`]: enabled ? size === '2xl' : size === 'xl',
  });

  const commonProps = {
    className: buttonClasses,
    ...rest,
  };

  const button = <div {...commonProps} />;

  const anchor = <a {...commonProps} href={href} role="button" />; // eslint-disable-line

  return href ? anchor : button;
};

ButtonSkeleton.propTypes = {
  /**
   * Specify an optional className to add.
   */
  className: PropTypes.string,

  /**
   * Optionally specify an href for your Button to become an `<a>` element
   */
  href: PropTypes.string,

  /**
   * Specify the size of the button, from a list of available sizes.
   * For `default` buttons, this prop can remain unspecified or use `default`.
   * In the next major release of Carbon, `default`, `field`, and `small` will be removed
   */
  size: PropTypes.oneOf([
    'default',
    'field',
    'small',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
  ]),

  /**
   * Specify whether the Button should be a small variant
   */
  small: PropTypes.bool,
};

ButtonSkeleton.defaultProps = {
  small: false,
};

export default ButtonSkeleton;
