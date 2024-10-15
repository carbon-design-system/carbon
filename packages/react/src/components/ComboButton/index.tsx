/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ChevronDown } from '@carbon/icons-react';
import { IconButton } from '../IconButton';
import Button from '../Button';
import { Menu } from '../Menu';
import { useAttachedMenu } from '../../internal/useAttachedMenu';
import { useId } from '../../internal/useId';
import { usePrefix } from '../../internal/usePrefix';
import {
  useFloating,
  flip,
  size as floatingSize,
  autoUpdate,
} from '@floating-ui/react';
import { hide } from '@floating-ui/dom';
import { useFeatureFlag } from '../FeatureFlags';
import mergeRefs from '../../tools/mergeRefs';
import { MenuAlignment } from '../MenuButton';
import { TranslateWithId } from '../../types/common';

const defaultTranslations = {
  'carbon.combo-button.additional-actions': 'Additional actions',
};

/**
 * Message ids that will be passed to translateWithId().
 */
type TranslationKey = keyof typeof defaultTranslations;

function defaultTranslateWithId(messageId: string) {
  return defaultTranslations[messageId];
}

interface ComboButtonProps extends TranslateWithId<TranslationKey> {
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
  menuAlignment?: MenuAlignment;

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
    // feature flag utilized to separate out only the dynamic styles from @floating-ui
    // flag is turned on when collision detection (ie. flip, hide) logic is not desired
    const enableOnlyFloatingStyles = useFeatureFlag(
      'enable-v12-dynamic-floating-styles'
    );

    const id = useId('combobutton');
    const prefix = usePrefix();
    const containerRef = useRef<HTMLDivElement>(null);
    let middlewares: any[] = [];

    if (!enableOnlyFloatingStyles) {
      middlewares = [flip({ crossAxis: false }), hide()];
    }

    if (menuAlignment === 'bottom' || menuAlignment === 'top') {
      middlewares.push(
        floatingSize({
          apply({ rects, elements }) {
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width}px`,
            });
          },
        })
      );
    }
    const { refs, floatingStyles, placement, middlewareData } = useFloating({
      placement: menuAlignment,

      // The floating element is positioned relative to its nearest
      // containing block (usually the viewport). It will in many cases also
      // “break” the floating element out of a clipping ancestor.
      // https://floating-ui.com/docs/misc#clipping
      strategy: 'fixed',

      // Middleware order matters, arrow should be last
      middleware: middlewares,
      whileElementsMounted: autoUpdate,
    });
    const ref = mergeRefs(forwardRef, containerRef, refs.setReference);
    const {
      open,
      handleClick: hookOnClick,
      handleMousedown: handleTriggerMousedown,
      handleClose,
    } = useAttachedMenu(containerRef);

    useLayoutEffect(() => {
      const updatedFloatingStyles = {
        ...floatingStyles,
        visibility: middlewareData.hide?.referenceHidden ? 'hidden' : 'visible',
      };
      Object.keys(updatedFloatingStyles).forEach((style) => {
        if (refs.floating.current) {
          refs.floating.current.style[style] = updatedFloatingStyles[style];
        }
      });
    }, [floatingStyles, refs.floating, middlewareData, placement, open]);
    function handleTriggerClick() {
      if (containerRef.current) {
        hookOnClick();
      }
    }

    function handlePrimaryActionClick(e: React.MouseEvent<HTMLButtonElement>) {
      if (onClick) {
        onClick(e);
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
          ref={refs.setReference}
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
          ref={refs.setFloating}
          id={id}
          label={t('carbon.combo-button.additional-actions')}
          mode="basic"
          size={size}
          open={open}
          onClose={handleClose}>
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
