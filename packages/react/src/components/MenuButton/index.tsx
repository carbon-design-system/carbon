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
  useLayoutEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ChevronDown } from '@carbon/icons-react';
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
import { useFeatureFlag } from '../FeatureFlags';
import mergeRefs from '../../tools/mergeRefs';

const validButtonKinds = ['primary', 'tertiary', 'ghost'];
const defaultButtonKind = 'primary';

export type MenuAlignment =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end';
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
  menuAlignment: MenuAlignment;

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
    // feature flag utilized to separate out only the dynamic styles from @floating-ui
    // flag is turned on when collision detection (ie. flip, hide) logic is not desired
    const enableOnlyFloatingStyles = useFeatureFlag(
      'enable-v12-dynamic-floating-styles'
    );

    const id = useId('MenuButton');
    const prefix = usePrefix();
    const triggerRef = useRef<HTMLDivElement>(null);
    let middlewares: any[] = [];

    if (!enableOnlyFloatingStyles) {
      middlewares = [flip({ crossAxis: false })];
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
    const ref = mergeRefs(forwardRef, triggerRef);
    const {
      open,
      handleClick: hookOnClick,
      handleMousedown,
      handleClose,
    } = useAttachedMenu(triggerRef);

    useLayoutEffect(() => {
      Object.keys(floatingStyles).forEach((style) => {
        if (refs.floating.current) {
          refs.floating.current.style[style] = floatingStyles[style];
        }
      });
    }, [floatingStyles, refs.floating, middlewareData, placement, open]);

    function handleClick() {
      if (triggerRef.current) {
        hookOnClick();
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
          ref={refs.setReference}
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
          ref={refs.setFloating}
          id={id}
          legacyAutoalign={false}
          label={label}
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
