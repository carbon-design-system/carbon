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
import { useAttachedMenu } from '../../internal/useAttachedMenu';

const spacing = 4; // top and bottom spacing between the button and the menu. in px

function ComboButton({
  children,
  className,
  disabled,
  label,
  onClick,
  size = 'md',
}) {
  const id = useId('combobutton');
  const prefix = usePrefix();

  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  const {
    open,
    x,
    y,
    handleClick: hookOnClick,
    handleMousedown: handleTriggerMousedown,
    handleClose,
  } = useAttachedMenu(containerRef);

  function handleTriggerClick() {
    if (containerRef.current) {
      const { width: w } = containerRef.current.getBoundingClientRect();
      setWidth(w);
      hookOnClick();
    }
  }

  function handlePrimaryActionClick(e) {
    if (onClick) {
      onClick(e);
    }
  }

  const containerClasses = classNames(
    `${prefix}--combo-button__container`,
    {
      [`${prefix}--combo-button__container--open`]: open,
    },
    className
  );

  const triggerClasses = classNames(`${prefix}--combo-button__trigger`);

  return (
    <div className={containerClasses} ref={containerRef}>
      <Button
        size={size}
        disabled={disabled}
        onClick={handlePrimaryActionClick}>
        {label}
      </Button>
      <IconButton
        className={triggerClasses}
        label="Additional actions"
        size={size}
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
        onClose={handleClose}
        x={x}
        y={[y[0] - spacing, y[1] + spacing]}>
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
   * Additional CSS class names.
   */
  className: PropTypes.string,

  /**
   * Specify whether the ComboButton should be disabled, or not.
   */
  disabled: PropTypes.bool,

  /**
   * Provide the label to be renderd on the primary action button.
   */
  label: PropTypes.string.isRequired,

  /**
   * Provide an optional function to be called when the primary action element is clicked.
   */
  onClick: PropTypes.func,

  /**
   * Specify the size of the buttons and menu.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export { ComboButton };
