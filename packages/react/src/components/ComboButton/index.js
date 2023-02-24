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
import { IconButton } from '../IconButton';
import { Menu } from '../Menu';

import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';

const spacing = 4; // top and bottom spacing between the button and the menu. in px

function ComboButton({
  children,
  disabled,
  kind = 'primary',
  label,
  onClick,
  size = 'md',
}) {
  const id = useId('combobutton');
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState([
    [0, 0],
    [0, 0],
  ]);
  const [width, setWidth] = useState(0);
  const containerRef = useRef(null);
  const prefix = usePrefix();

  function openMenu() {
    if (containerRef.current) {
      const {
        left,
        top,
        right,
        bottom,
        width: w,
      } = containerRef.current.getBoundingClientRect();
      setPosition([
        [left, right],
        [top - spacing, bottom + spacing],
      ]);
      setWidth(Math.floor(w));
    }

    setOpen(true);
  }

  function closeMenu() {
    setOpen(false);
  }

  function handleTriggerClick() {
    if (open) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function handleTriggerMousedown(e) {
    // prevent default for mousedown on trigger element to avoid
    // the "blur" event from firing on the menu as this would close
    // it and immediately re-open since "click" event is fired after
    // "blur" event.
    e.preventDefault();
  }

  function handlePrimaryActionClick(e) {
    if (onClick) {
      onClick(e);
    }
  }

  const containerClasses = classNames(`${prefix}--combo-button__container`, {
    [`${prefix}--combo-button__container--open`]: open,
  });

  const triggerClasses = classNames(`${prefix}--combo-button__trigger`);

  return (
    <div className={containerClasses} ref={containerRef}>
      <Button
        size={size}
        kind={kind}
        disabled={disabled}
        onClick={handlePrimaryActionClick}>
        {label}
      </Button>
      <IconButton
        className={triggerClasses}
        label="Additional actions"
        size={size}
        kind={kind}
        disabled={disabled}
        aria-haspopup
        aria-expanded={open}
        onClick={handleTriggerClick}
        onMouseDown={handleTriggerMousedown}
        aria-owns={id}>
        <ChevronDown />
      </IconButton>
      <Menu
        id={id}
        // eslint-disable-next-line react/forbid-component-props
        style={{
          width: `${width}px`,
        }}
        label="Additional actions"
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

ComboButton.propTypes = {
  /**
   * A collection of MenuItems to be rendered as additional actions for this ComboButton.
   */
  children: PropTypes.node.isRequired,

  /**
   * Specify whether the combo button should be disabled, or not.
   */
  disabled: PropTypes.bool,

  /**
   * Specify the type of button to be used as the base for the primary action and the trigger button.
   */
  kind: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'tertiary']),

  /**
   * Provide the label to be renderd on the primary action button.
   */
  label: PropTypes.string.isRequired,

  /**
   * Provide an optional function to be called when the primary action element is clicked.
   */
  onClick: PropTypes.func,

  /**
   * Specify the size of the Menu.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export { ComboButton };
