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
import { IconButton } from '../IconButton';
import Button from '../Button';
import { Menu } from '../Menu';

import { useAttachedMenu } from '../../internal/useAttachedMenu';
import { useId } from '../../internal/useId';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { usePrefix } from '../../internal/usePrefix';

const spacing = 0; // top and bottom spacing between the button and the menu. in px
const defaultTranslations = {
  'carbon.combo-button.additional-actions': 'Additional actions',
};

function defaultTranslateWithId(messageId: string) {
  return defaultTranslations[messageId];
}

interface ComboButtonProps {
  /**
   * A collection of `MenuItems` to be rendered as additional actions for this `ComboButton`.
   */
  children: React.ComponentProps<typeof Menu>['children'];

  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * Specify whether the `ComboButton` should be disabled, or not.
   */
  disabled?: boolean;

  /**
   * Provide the label to be rendered on the primary action button.
   */
  label: React.ComponentProps<typeof Button>['title'];

  /**
   * Experimental property. Specify how the menu should align with the button element
   */
  menuAlignment?: React.ComponentProps<typeof Menu>['menuAlignment'];

  /**
   * Provide an optional function to be called when the primary action element is clicked.
   */
  onClick?: React.ComponentProps<typeof Button>['onClick'];

  /**
   * Specify the size of the buttons and menu.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Specify how the trigger tooltip should be aligned.
   */
  tooltipAlignment?: React.ComponentProps<typeof IconButton>['align'];

  /**
   * Optional method that takes in a message `id` and returns an
   * internationalized string.
   */
  translateWithId?: (id: string) => string;
}

const ComboButton = React.forwardRef<HTMLDivElement, ComboButtonProps>(
  function ComboButton(
    {
      children,
      className,
      disabled,
      label,
      onClick,
      size = 'lg',
      menuAlignment = 'bottom',
      tooltipAlignment,
      translateWithId: t = defaultTranslateWithId,
      ...rest
    },
    forwardRef
  ) {
    const id = useId('combobutton');
    const prefix = usePrefix();
    const containerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<React.ComponentRef<typeof Menu>>(null);
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

    function handlePrimaryActionClick(e: React.MouseEvent<HTMLButtonElement>) {
      if (onClick) {
        onClick(e);
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
      `${prefix}--combo-button__container`,
      `${prefix}--combo-button__container--${size}`,
      {
        [`${prefix}--combo-button__container--open`]: open,
      },
      className
    );

    const menuClasses = classNames(`${prefix}--combo-button__${menuAlignment}`);

    const primaryActionClasses = classNames(
      `${prefix}--combo-button__primary-action`
    );
    const triggerClasses = classNames(`${prefix}--combo-button__trigger`);

    return (
      <div
        {...rest}
        className={containerClasses}
        ref={ref}
        aria-owns={open ? id : undefined}>
        <div className={primaryActionClasses}>
          <Button
            title={label}
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
          aria-controls={open ? id : undefined}>
          <ChevronDown />
        </IconButton>
        <Menu
          containerRef={containerRef}
          menuAlignment={menuAlignment}
          className={menuClasses}
          ref={menuRef}
          id={id}
          label={t('carbon.combo-button.additional-actions')}
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
   * Provide the label to be rendered on the primary action button.
   */
  label: PropTypes.string.isRequired,

  /**
   * Experimental property. Specify how the menu should align with the button element
   */
  menuAlignment: PropTypes.oneOf([
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
  ]),

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
    'top-start',
    'top-right',
    'top-end',
    'bottom',
    'bottom-left',
    'bottom-start',
    'bottom-right',
    'bottom-end',
    'left',
    'right',
  ]),

  /**
   * Optional method that takes in a message id and returns an
   * internationalized string.
   */
  translateWithId: PropTypes.func,
};

export { ComboButton, type ComboButtonProps };
