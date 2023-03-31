/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ChevronDown } from '@carbon/icons-react';
import { Button } from '../Button';
import { Menu } from '../Menu';

import { useAttachedMenu } from '../../internal/useAttachedMenu';
import { useId } from '../../internal/useId';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { usePrefix } from '../../internal/usePrefix';

const spacing = 4; // top and bottom spacing between the button and the menu. in px
const validButtonKinds = ['primary', 'tertiary', 'ghost'];
const defaultButtonKind = 'primary';

const MenuButton = React.forwardRef(function MenuButton(
  {
    children,
    className,
    disabled,
    kind = defaultButtonKind,
    label,
    size = 'lg',
    ...rest
  },
  forwardRef
) {
  const id = useId('MenuButton');
  const prefix = usePrefix();

  const triggerRef = useRef(null);
  const menuRef = useRef(null);
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
    menuRef.current.style.width = `${width}px`;
  }

  const triggerClasses = classNames(
    `${prefix}--menu-button__trigger`,
    {
      [`${prefix}--menu-button__trigger--open`]: open,
    },
    className
  );

  const buttonKind = validButtonKinds.includes(kind) ? kind : defaultButtonKind;

  return (
    <>
      <Button
        {...rest}
        ref={ref}
        className={triggerClasses}
        size={size}
        kind={buttonKind}
        renderIcon={ChevronDown}
        disabled={disabled}
        aria-haspopup
        aria-expanded={open}
        onClick={handleClick}
        onMouseDown={handleMousedown}
        aria-owns={open ? id : null}>
        {label}
      </Button>
      <Menu
        ref={menuRef}
        id={id}
        label={label}
        size={size}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        x={x}
        y={[y[0] - spacing, y[1] + spacing]}>
        {children}
      </Menu>
    </>
  );
});

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
  kind: PropTypes.oneOf(validButtonKinds),

  /**
   * Provide the label to be renderd on the trigger button.
   */
  label: PropTypes.string.isRequired,

  /**
   * Specify the size of the button and menu.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export { MenuButton };
