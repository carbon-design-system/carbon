/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  ComponentProps,
  forwardRef,
  ReactNode,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ChevronDown } from '@carbon/icons-react';
import Button from '../Button';
import { Menu } from '../Menu';

import { useAttachedMenu } from '../../internal/useAttachedMenu';
import { useId } from '../../internal/useId';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { usePrefix } from '../../internal/usePrefix';

const spacing = 0; // top and bottom spacing between the button and the menu. in px
const validButtonKinds = ['primary', 'tertiary', 'ghost'];
const defaultButtonKind = 'primary';

export interface MenuButtonProps extends ComponentProps<'div'> {
  /**
   * A collection of MenuItems to be rendered as actions for this MenuButton.
   */
  children?: ReactNode;

  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * Specify whether the MenuButton should be disabled, or not.
   */
  disabled?: boolean;

  /**
   * Specify the type of button to be used as the base for the trigger button.
   */
  kind?: 'primary' | 'tertiary' | 'ghost';

  /**
   * Provide the label to be rendered on the trigger button.
   */
  label: string;

  /**
   * Experimental property. Specify how the menu should align with the button element
   */
  menuAlignment:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end';

  /**
   * Specify the size of the button and menu.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Specify the tabIndex of the button.
   */
  tabIndex?: number;
}

const MenuButton = forwardRef<HTMLDivElement, MenuButtonProps>(
  function MenuButton(
    {
      children,
      className,
      disabled,
      kind = defaultButtonKind,
      label,
      size = 'lg',
      menuAlignment = 'bottom',
      tabIndex = 0,
      ...rest
    },
    forwardRef
  ) {
    const id = useId('MenuButton');
    const prefix = usePrefix();

    const triggerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);
    const ref = useMergedRefs([forwardRef, triggerRef]);
    const [width, setWidth] = useState(0);
    const {
      open,
      x,
      y,
      handleClick: hookOnClick,
      handleMousedown,
      handleClose,
    } = useAttachedMenu(triggerRef);

    function handleClick() {
      if (triggerRef.current) {
        const { width: w } = triggerRef.current.getBoundingClientRect();
        setWidth(w);
        hookOnClick();
      }
    }

    function handleOpen() {
      if (menuRef.current) {
        menuRef.current.style.inlineSize = `${width}px`;
        menuRef.current.style.minInlineSize = `${width}px`;
        if (menuAlignment !== 'bottom' && menuAlignment !== 'top') {
          menuRef.current.style.inlineSize = `fit-content`;
        }
      }
    }

    const containerClasses = classNames(
      `${prefix}--menu-button__container`,
      className
    );

    const triggerClasses = classNames(`${prefix}--menu-button__trigger`, {
      [`${prefix}--menu-button__trigger--open`]: open,
    });

    const menuClasses = classNames(`${prefix}--menu-button__${menuAlignment}`);

    return (
      <div
        {...rest}
        ref={ref}
        aria-owns={open ? id : undefined}
        className={containerClasses}>
        <Button
          className={triggerClasses}
          size={size}
          tabIndex={tabIndex}
          kind={kind}
          renderIcon={ChevronDown}
          disabled={disabled}
          aria-haspopup
          aria-expanded={open}
          onClick={handleClick}
          onMouseDown={handleMousedown}
          aria-controls={open ? id : undefined}>
          {label}
        </Button>
        <Menu
          containerRef={triggerRef}
          menuAlignment={menuAlignment}
          className={menuClasses}
          ref={menuRef}
          id={id}
          label={label}
          mode="basic"
          size={size}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          x={x}
          y={[y[0] - spacing, y[1] + spacing]}>
          {children}
        </Menu>
      </div>
    );
  }
);

MenuButton.propTypes = {
  /**
   * A collection of MenuItems to be rendered as actions for this MenuButton.
   */
  children: PropTypes.node.isRequired,

  /**
   * Additional CSS class names.
   */
  className: PropTypes.string,

  /**
   * Specify whether the MenuButton should be disabled, or not.
   */
  disabled: PropTypes.bool,

  /**
   * Specify the type of button to be used as the base for the trigger button.
   */
  // @ts-ignore-next-line -- avoid spurious (?) TS2322 error
  kind: PropTypes.oneOf(validButtonKinds),

  /**
   * Provide the label to be renderd on the trigger button.
   */
  label: PropTypes.string.isRequired,

  /**
   * Experimental property. Specify how the menu should align with the button element
   */
  // @ts-ignore-next-line -- avoid spurious (?) TS2322 error
  menuAlignment: PropTypes.oneOf([
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
  ]),

  /**
   * Specify the size of the button and menu.
   */
  // @ts-ignore-next-line -- avoid spurious (?) TS2322 error
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

  /**
   * Specify the tabIndex of the button.
   */
  // @ts-ignore-next-line -- avoid spurious (?) TS2322 error
  tabIndex: PropTypes.number,
};

export { MenuButton };
