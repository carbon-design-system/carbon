/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Close, Menu } from '@carbon/icons-react';

import cx from 'classnames';
import React, { type ComponentProps } from 'react';
import PropTypes from 'prop-types';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';
import { usePrefix } from '../../internal/usePrefix';

type HeaderMenuButtonBaseProps = Omit<
  ComponentProps<'button'>,
  'title' | 'type'
>;

export interface HeaderMenuButtonProps extends HeaderMenuButtonBaseProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  className?: string;
  renderMenuIcon?: JSX.Element;
  renderCloseIcon?: JSX.Element;
  isActive?: boolean;
  isCollapsible?: boolean;
}

export default function HeaderMenuButton({
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  className: customClassName,
  renderMenuIcon,
  renderCloseIcon,
  isActive,
  isCollapsible,
  ...rest
}: HeaderMenuButtonProps) {
  const prefix = usePrefix();
  const className = cx({
    ...(typeof customClassName === 'string' && {
      [customClassName]: !!customClassName,
    }),
    [`${prefix}--header__action`]: true,
    [`${prefix}--header__menu-trigger`]: true,
    [`${prefix}--header__action--active`]: isActive,
    [`${prefix}--header__menu-toggle`]: true,
    [`${prefix}--header__menu-toggle__hidden`]: !isCollapsible,
  });
  const menuIcon = renderMenuIcon ? renderMenuIcon : <Menu size={20} />;
  const closeIcon = renderCloseIcon ? renderCloseIcon : <Close size={20} />;

  return (
    <button
      {...rest}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={className}
      title={ariaLabel}
      type="button">
      {isActive ? closeIcon : menuIcon}
    </button>
  );
}

HeaderMenuButton.propTypes = {
  /**
   * Required props for accessibility label on the underlying menu button
   */
  ...AriaLabelPropType,

  /**
   * Optionally provide a custom class name that is applied to the underlying
   * button
   */
  className: PropTypes.string,

  /**
   * Specify whether the menu button is "active".
   */
  isActive: PropTypes.bool,

  /**
   * Specify whether the menu button is collapsible.
   */
  isCollapsible: PropTypes.bool,

  /**
   * Optionally provide an onClick handler that is called when the underlying
   * button fires it's onclick event
   */
  onClick: PropTypes.func,
};
