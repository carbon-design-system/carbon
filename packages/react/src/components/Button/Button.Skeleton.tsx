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
import { ButtonSize } from './Button';

export interface ButtonSkeletonProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Optionally specify an href for your Button to become an `<a>` element
   */
  href?: string;

  /**
   * Specify the size of the button, from a list of available sizes.
   */
  size?: ButtonSize;

  /**
   * @deprecated This property will be removed in the next major Carbon version,
   * use size={sm} instead.
   *
   * Specify whether the Button should be a small variant
   */
  small?: boolean;
}

const ButtonSkeleton: React.FC<ButtonSkeletonProps> = ({
  className,
  small = false,
  href,
  size = 'lg',
  ...rest
}: ButtonSkeletonProps) => {
  const prefix = usePrefix();

  const buttonClasses = cx(className, {
    [`${prefix}--skeleton`]: true,
    [`${prefix}--btn`]: true,
    [`${prefix}--btn--sm`]: small || size === 'sm',
    [`${prefix}--btn--md`]: size === 'md',
    [`${prefix}--btn--lg`]: size === 'lg',
    [`${prefix}--btn--xl`]: size === 'xl',
    [`${prefix}--btn--2xl`]: size === '2xl',
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
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl']),

  /**
   * @deprecated This property will be removed in the next major Carbon version,
   * use size={sm} instead.
   *
   * Specify whether the Button should be a small variant
   */
  small: PropTypes.bool,
};

export default ButtonSkeleton;
export { ButtonSkeleton };
