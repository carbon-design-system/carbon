/**
 * Copyright IBM Corp. 2023, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  ComponentProps,
  forwardRef,
  ReactNode,
  useEffect,
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
  flip,
  size as floatingSize,
  autoUpdate,
  computePosition,
} from '@floating-ui/react';
import { useFeatureFlag } from '../FeatureFlags';
import { mergeRefs } from '../../tools/mergeRefs';

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
  menuAlignment?: MenuAlignment;

  /**
   * Specify the size of the button and menu.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';

  /**
   * Specify the tabIndex of the button.
   */
  tabIndex?: number;

  /**
   * Specify the background token to use for the menu. Default is 'layer'.
   */
  menuBackgroundToken?: 'layer' | 'background';

  /**
   * Specify whether a border should be rendered on the menu
   */
  menuBorder?: boolean;

  /**
   * Specify a DOM node where the Menu should be rendered in. Defaults to document.body.
   */
  menuTarget?: Element;
}

const MenuButton = forwardRef<HTMLDivElement, MenuButtonProps>(
  (
    {
      children,
      className,
      disabled,
      kind = defaultButtonKind,
      label,
      menuBackgroundToken = 'layer',
      menuBorder = false,
      size = 'lg',
      menuAlignment = 'bottom',
      tabIndex = 0,
      menuTarget,
      ...rest
    },
    forwardRef
  ) => {
    // feature flag utilized to separate out only the dynamic styles from @floating-ui
    // flag is turned on when collision detection (ie. flip, hide) logic is not desired
    const enableOnlyFloatingStyles = useFeatureFlag(
      'enable-v12-dynamic-floating-styles'
    );

    const id = useId('MenuButton');
    const prefix = usePrefix();
    const triggerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);

    const ref = mergeRefs(forwardRef, triggerRef);
    const {
      open,
      handleClick: hookOnClick,
      handleMousedown,
      handleClose,
    } = useAttachedMenu(triggerRef);

    // Position imperatively via autoUpdate — scroll/resize never touch React state.
    useEffect(() => {
      if (!open) return;
      const reference = buttonRef.current;
      const floating = menuRef.current;
      if (!reference || !floating) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
      const middleware: any[] = [];
      if (!enableOnlyFloatingStyles)
        middleware.push(flip({ crossAxis: false }));
      if (menuAlignment === 'bottom' || menuAlignment === 'top') {
        middleware.push(
          floatingSize({
            apply({ rects, elements }) {
              Object.assign(elements.floating.style, {
                width: `${rects.reference.width}px`,
              });
            },
          })
        );
      }
      const applyPosition = () =>
        computePosition(reference, floating, {
          placement: menuAlignment,
          strategy: 'fixed',
          middleware,
        }).then(({ x, y }) => {
          Object.assign(floating.style, {
            position: 'fixed',
            left: `${x}px`,
            top: `${y}px`,
          });
        });
      return autoUpdate(reference, floating, applyPosition);
    }, [open, menuAlignment, enableOnlyFloatingStyles]);

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
          ref={buttonRef}
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
          legacyAutoalign={false}
          label={label}
          size={size}
          open={open}
          onClose={handleClose}
          target={menuTarget}
          backgroundToken={menuBackgroundToken}
          border={menuBorder}>
          {children}
        </Menu>
      </div>
    );
  }
);

MenuButton.displayName = 'MenuButton';

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
   * Provide the label to be rendered on the trigger button.
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
   * Specify the size of the button and menu.
   */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),

  /**
   * Specify the tabIndex of the button.
   */
  tabIndex: PropTypes.number,

  /**
   * Specify the background token to use for the menu. Default is 'layer'.
   */
  menuBackgroundToken: PropTypes.oneOf(['layer', 'background']),

  /**
   * Specify whether a border should be rendered on the menu
   */
  menuBorder: PropTypes.bool,

  /**
   * Specify a DOM node where the Menu should be rendered in. Defaults to document.body.
   */
  menuTarget: PropTypes.instanceOf(
    typeof Element !== 'undefined' ? Element : Object
  ) as PropTypes.Validator<Element | null | undefined>,
};

export { MenuButton };
