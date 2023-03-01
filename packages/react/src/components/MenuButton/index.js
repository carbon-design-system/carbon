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

import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import { useAttachedMenu } from '../../internal/useAttachedMenu';

const spacing = 4; // top and bottom spacing between the button and the menu. in px
const validButtonKinds = ['primary', 'tertiary', 'ghost'];
const defaultButtonKind = 'primary';

function MenuButton({
  children,
  className,
  disabled,
  kind = defaultButtonKind,
  label,
  size = 'md',
}) {
  const id = useId('MenuButton');
  const prefix = usePrefix();

  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  const {
    open,
    x,
    y,
    handleClick: hookOnClick,
    handleMousedown,
    handleClose,
  } = useAttachedMenu(containerRef);

  function handleClick() {
    if (containerRef.current) {
      const { width: w } = containerRef.current.getBoundingClientRect();
      setWidth(w);
      hookOnClick();
    }
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
        ref={containerRef}
        className={triggerClasses}
        size={size}
        kind={buttonKind}
        renderIcon={ChevronDown}
        disabled={disabled}
        aria-haspopup
        aria-expanded={open}
        onClick={handleClick}
        onMouseDown={handleMousedown}
        aria-owns={id}>
        {label}
      </Button>
      <Menu
        id={id}
        // eslint-disable-next-line react/forbid-component-props
        style={{
          width: `${width}px`,
        }}
        label={label}
        size={size}
        open={open}
        onClose={handleClose}
        x={x}
        y={[y[0] - spacing, y[1] + spacing]}>
        {children}
      </Menu>
    </>
  );
}

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
