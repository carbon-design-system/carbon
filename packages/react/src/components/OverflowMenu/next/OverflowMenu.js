/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import { OverflowMenuVertical16 } from '@carbon/icons-react';
import { useId } from '../../../internal/useId';
import Menu from '../../Menu';

const { prefix } = settings;

const defaultSize = 'md';

function OverflowMenu({
  children,
  renderIcon: IconElement = OverflowMenuVertical16,
  size = defaultSize,
  ...rest
}) {
  const id = useId('overflowmenu');
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState([
    [0, 0],
    [0, 0],
  ]);
  const triggerRef = useRef(null);

  function openMenu() {
    if (triggerRef.current) {
      const {
        left,
        top,
        right,
        bottom,
      } = triggerRef.current.getBoundingClientRect();
      setPosition([
        [left, right],
        [top, bottom],
      ]);
    }

    setOpen(true);
  }

  function closeMenu() {
    setOpen(false);
  }

  function handleClick() {
    if (open) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function handleMousedown(e) {
    // prevent default for mousedown on trigger element to avoid
    // the "blur" event from firing on the menu as this would close
    // it and immediately re-open since "click" event is fired after
    // "blur" event.
    e.preventDefault();
  }

  const containerClasses = classNames(`${prefix}--overflow-menu__container`);

  const triggerClasses = classNames(
    `${prefix}--overflow-menu`,
    {
      [`${prefix}--overflow-menu--open`]: open,
    },
    size !== defaultSize && `${prefix}--overflow-menu--${size}`
  );

  return (
    <div className={containerClasses} aria-owns={id}>
      <button
        {...rest}
        type="button"
        aria-haspopup
        aria-expanded={open}
        className={triggerClasses}
        onClick={handleClick}
        onMouseDown={handleMousedown}
        ref={triggerRef}>
        <IconElement />
      </button>
      <Menu
        id={id}
        size={size}
        open={open}
        onClose={closeMenu}
        x={position[0]}
        y={position[1]}>
        {children}
      </Menu>
    </div>
  );
}

OverflowMenu.propTypes = {
  /**
   * Specify the children of the OverflowMenu
   */
  children: PropTypes.node,

  /**
   * Function called to override icon rendering.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Specify the size of the menu, from a list of available sizes.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default OverflowMenu;
