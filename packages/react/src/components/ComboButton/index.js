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

import { useAttachedMenu } from '../../internal/useAttachedMenu';
import { useId } from '../../internal/useId';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { usePrefix } from '../../internal/usePrefix';

const spacing = 4; // top and bottom spacing between the button and the menu. in px
const defaultTranslations = {
  'carbon.combo-button.additional-actions': 'Additional actions',
};

function defaultTranslateWithId(messageId) {
  return defaultTranslations[messageId];
}

const ComboButton = React.forwardRef(function ComboButton(
  {
    children,
    className,
    disabled,
    label,
    onClick,
    size = 'lg',
    tooltipAlignment,
    translateWithId: t = defaultTranslateWithId,
    ...rest
  },
  forwardRef
) {
  const id = useId('combobutton');
  const prefix = usePrefix();

  const containerRef = useRef(null);
  const menuRef = useRef(null);
  const ref = useMergedRefs([forwardRef, containerRef]);
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

  function handleOpen() {
    menuRef.current.style.width = `${width}px`;
  }

  const containerClasses = classNames(
    `${prefix}--combo-button__container`,
    `${prefix}--combo-button__container--${size}`,
    {
      [`${prefix}--combo-button__container--open`]: open,
    },
    className
  );

  const primaryActionClasses = classNames(
    `${prefix}--combo-button__primary-action`
  );
  const triggerClasses = classNames(`${prefix}--combo-button__trigger`);

  return (
    <div
      {...rest}
      className={containerClasses}
      ref={ref}
      aria-owns={open ? id : null}>
      <div className={primaryActionClasses}>
        <Button
          size={size}
          disabled={disabled}
          onClick={handlePrimaryActionClick}>
          {label}
        </Button>
      </div>
      <IconButton
        className={triggerClasses}
        label={t('carbon.combo-button.additional-actions')}
        size={size}
        disabled={disabled}
        align={tooltipAlignment}
        aria-haspopup
        aria-expanded={open}
        onClick={handleTriggerClick}
        onMouseDown={handleTriggerMousedown}
        aria-controls={open ? id : null}>
        <ChevronDown />
      </IconButton>
      <Menu
        ref={menuRef}
        id={id}
        label={t('carbon.combo-button.additional-actions')}
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
});

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

  /**
   * Optional method that takes in a message id and returns an
   * internationalized string.
   */
  translateWithId: PropTypes.func,
};

export { ComboButton };
