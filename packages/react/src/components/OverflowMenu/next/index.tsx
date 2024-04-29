/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  type ComponentType,
  type FunctionComponent,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { OverflowMenuVertical } from '@carbon/icons-react';

import { IconButton } from '../../IconButton';
import { Menu } from '../../Menu';

import { useId } from '../../../internal/useId';
import { usePrefix } from '../../../internal/usePrefix';
import { useAttachedMenu } from '../../../internal/useAttachedMenu';

const defaultSize = 'md';

interface OverflowMenuProps {
  /**
   * A collection of MenuItems to be rendered within this OverflowMenu.
   */
  children?: React.ReactNode;

  /**
   * Additional CSS class names for the trigger button.
   */
  className?: string;

  /**
   * A label describing the options available. Is used in the trigger tooltip and as the menu's accessible label.
   */
  label?: string;

  /**
   * Experimental property. Specify how the menu should align with the button element
   */
  menuAlignment?: 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

  /**
   * Optionally provide a custom icon to be rendered on the trigger button.
   */
  renderIcon?: ComponentType | FunctionComponent;

  /**
   * Specify the size of the menu, from a list of available sizes.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Specify how the trigger tooltip should be aligned.
   */
  tooltipAlignment?:
    | 'top'
    | 'top-left'
    | 'top-right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right'
    | 'left'
    | 'right';
}

const OverflowMenu = React.forwardRef<HTMLDivElement, OverflowMenuProps>(
  function OverflowMenu(
    {
      children,
      className,
      label = 'Options',
      renderIcon: IconElement = OverflowMenuVertical,
      size = defaultSize,
      menuAlignment = 'bottom-start',
      tooltipAlignment,
      ...rest
    },
    forwardRef
  ) {
    const id = useId('overflowmenu');
    const prefix = usePrefix();

    const triggerRef = useRef<HTMLDivElement>(null);
    const {
      open,
      x,
      y,
      handleClick: hookOnClick,
      handleMousedown,
      handleClose,
    } = useAttachedMenu(triggerRef);

    function handleTriggerClick() {
      if (triggerRef.current) {
        hookOnClick();
      }
    }

    const containerClasses = classNames(
      className,
      `${prefix}--overflow-menu__container`
    );

    const menuClasses = classNames(
      `${prefix}--overflow-menu__${menuAlignment}`
    );

    const triggerClasses = classNames(
      `${prefix}--overflow-menu`,
      {
        [`${prefix}--overflow-menu--open`]: open,
      },
      size !== defaultSize && `${prefix}--overflow-menu--${size}`
    );

    return (
      <div
        {...rest}
        className={containerClasses}
        aria-owns={open ? id : undefined}
        ref={forwardRef}>
        <IconButton
          aria-controls={open ? id : undefined}
          aria-haspopup
          aria-expanded={open}
          className={triggerClasses}
          onClick={handleTriggerClick}
          onMouseDown={handleMousedown}
          ref={triggerRef}
          label={label}
          align={tooltipAlignment}>
          <IconElement className={`${prefix}--overflow-menu__icon`} />
        </IconButton>
        <Menu
          containerRef={triggerRef}
          menuAlignment={menuAlignment}
          className={menuClasses}
          id={id}
          size={size}
          open={open}
          onClose={handleClose}
          x={x}
          y={y}
          label={label}>
          {children}
        </Menu>
      </div>
    );
  }
);
OverflowMenu.propTypes = {
  /**
   * A collection of MenuItems to be rendered within this OverflowMenu.
   */
  children: PropTypes.node,

  /**
   * Additional CSS class names for the trigger button.
   */
  className: PropTypes.string,

  /**
   * A label describing the options available. Is used in the trigger tooltip and as the menu's accessible label.
   */
  label: PropTypes.string,

  /**
   * Experimental property. Specify how the menu should align with the button element
   */
  menuAlignment: PropTypes.oneOf([
    'top-start',
    'top-end',
    'bottom-start',
    'bottom-end',
  ]),

  /**
   * Optionally provide a custom icon to be rendered on the trigger button.
   */
  // @ts-expect-error: PropTypes are not expressive enough to cover this case
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Specify the size of the menu, from a list of available sizes.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * Specify how the trigger tooltip should be aligned.
   */
  tooltipAlignment: PropTypes.oneOf([
    'top',
    'top-left',
    'top-right',
    'bottom',
    'bottom-left',
    'bottom-right',
    'left',
    'right',
  ]),
};

export { OverflowMenu };
