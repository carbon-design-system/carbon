/**
 * Copyright IBM Corp. 2020, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  useEffect,
  useRef,
  type ComponentProps,
  type ElementType,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { OverflowMenuVertical } from '@carbon/icons-react';
import { flip, autoUpdate, computePosition } from '@floating-ui/react';
import { useFeatureFlag } from '../../FeatureFlags';

import { IconButton } from '../../IconButton';
import { Menu } from '../../Menu';
import type { PopoverAlignment } from '../../Popover';

import { useId } from '../../../internal/useId';
import { usePrefix } from '../../../internal/usePrefix';
import { useAttachedMenu } from '../../../internal/useAttachedMenu';
import { deprecateValuesWithin } from '../../../prop-types/deprecateValuesWithin';
import { mapPopoverAlign } from '../../../tools/mapPopoverAlign';

const defaultSize = 'md';

export interface OverflowMenuProps extends ComponentProps<'div'> {
  /**
   * **Experimental**: Will attempt to automatically align the floating element
   * to avoid collisions with the viewport and being clipped by ancestor
   * elements. Requires React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign?: boolean;

  /**
   * A collection of MenuItems to be rendered within this OverflowMenu.
   */
  children?: React.ReactNode;

  /**
   * Additional CSS class names for the trigger button.
   */
  className?: string;

  /**
   * A label describing the options available. Is used in the trigger tooltip and as the menu's accessible label.
   */
  label?: string;

  /**
   * Experimental property. Specify how the menu should align with the button element
   */
  menuAlignment?: 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';

  /**
   * A component used to render an icon.
   */
  renderIcon?: ElementType;

  /**
   * Specify the size of the menu, from a list of available sizes.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';

  /**
   * Specify how the trigger tooltip should be aligned.
   */
  tooltipAlignment?: PopoverAlignment;

  /**
   * Specify a DOM node where the Menu should be rendered in. Defaults to document.body.
   */
  menuTarget?: Element;
}

const OverflowMenu = React.forwardRef<HTMLDivElement, OverflowMenuProps>(
  (
    {
      autoAlign = false,
      children,
      className,
      label = 'Options',
      renderIcon: IconElement = OverflowMenuVertical,
      size = defaultSize,
      menuAlignment = 'bottom-start',
      tooltipAlignment,
      menuTarget,
      ...rest
    },
    forwardRef
  ) => {
    const enableFloatingStyles =
      useFeatureFlag('enable-v12-dynamic-floating-styles') || autoAlign;

    const id = useId('overflowmenu');
    const prefix = usePrefix();

    const triggerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);

    const {
      open,
      x,
      y,
      handleClick: hookOnClick,
      handleMousedown,
      handleClose,
    } = useAttachedMenu(triggerRef);

    // Position imperatively via autoUpdate — scroll/resize never touch React state.
    useEffect(() => {
      if (!enableFloatingStyles || !open) return;
      const reference = triggerRef.current;
      const floating = menuRef.current;
      if (!reference || !floating) return;
      const middleware = autoAlign
        ? [
            flip({
              fallbackPlacements: menuAlignment.includes('bottom')
                ? ['bottom-start', 'bottom-end', 'top-start', 'top-end']
                : ['top-start', 'top-end', 'bottom-start', 'bottom-end'],
            }),
          ]
        : [];
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
    }, [enableFloatingStyles, open, menuAlignment, autoAlign]);

    function handleTriggerClick() {
      if (triggerRef.current) {
        hookOnClick();
      }
    }

    const containerClasses = classNames(
      className,
      `${prefix}--overflow-menu__container`,
      { [`${prefix}--autoalign`]: enableFloatingStyles }
    );

    const menuClasses = classNames(
      `${prefix}--overflow-menu__${menuAlignment}`
    );

    const triggerClasses = classNames(
      `${prefix}--overflow-menu`,
      {
        [`${prefix}--overflow-menu--open`]: open,
      },
      size !== defaultSize && `${prefix}--overflow-menu--${size}`, // TODO: V12 - Remove this class
      size !== defaultSize && `${prefix}--layout--size-${size}`
    );

    return (
      <div
        {...rest}
        className={containerClasses}
        aria-owns={open ? id : undefined}
        ref={forwardRef}>
        <IconButton
          aria-controls={open ? id : undefined}
          aria-haspopup
          aria-expanded={open}
          className={triggerClasses}
          onClick={handleTriggerClick}
          onMouseDown={handleMousedown}
          ref={triggerRef}
          label={label}
          align={tooltipAlignment}
          kind="ghost">
          <IconElement className={`${prefix}--overflow-menu__icon`} />
        </IconButton>
        <Menu
          containerRef={triggerRef}
          ref={enableFloatingStyles ? menuRef : undefined}
          menuAlignment={menuAlignment}
          className={menuClasses}
          id={id}
          size={size}
          legacyAutoalign={!enableFloatingStyles}
          open={open}
          onClose={handleClose}
          x={x}
          y={y}
          label={label}
          target={menuTarget}>
          {children}
        </Menu>
      </div>
    );
  }
);

OverflowMenu.displayName = 'OverflowMenu';

OverflowMenu.propTypes = {
  /**
   * **Experimental**: Will attempt to automatically align the floating element
   * to avoid collisions with the viewport and being clipped by ancestor
   * elements. Requires React v17+
   * @see https://github.com/carbon-design-system/carbon/issues/18714
   */
  autoAlign: PropTypes.bool,
  /**
   * A collection of MenuItems to be rendered within this OverflowMenu.
   */
  children: PropTypes.node,

  /**
   * Additional CSS class names for the trigger button.
   */
  className: PropTypes.string,

  /**
   * A label describing the options available. Is used in the trigger tooltip and as the menu's accessible label.
   */
  label: PropTypes.string,

  /**
   * Experimental property. Specify how the menu should align with the button element
   */
  menuAlignment: PropTypes.oneOf([
    'top-start',
    'top-end',
    'bottom-start',
    'bottom-end',
  ]),

  /**
   * A component used to render an icon.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Specify the size of the menu, from a list of available sizes.
   */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),

  /**
   * Specify how the trigger tooltip should be aligned.
   */
  tooltipAlignment: deprecateValuesWithin(
    PropTypes.oneOf([
      'top',
      'top-left', // deprecated use top-start instead
      'top-right', // deprecated use top-end instead

      'bottom',
      'bottom-left', // deprecated use bottom-start instead
      'bottom-right', // deprecated use bottom-end instead

      'left',
      'left-bottom', // deprecated use left-end instead
      'left-top', // deprecated use left-start instead

      'right',
      'right-bottom', // deprecated use right-end instead
      'right-top', // deprecated use right-start instead

      // new values to match floating-ui
      'top-start',
      'top-end',
      'bottom-start',
      'bottom-end',
      'left-end',
      'left-start',
      'right-end',
      'right-start',
    ]),
    [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
      'right',
      'right-start',
      'right-end',
    ],
    mapPopoverAlign
  ),

  /**
   * Specify a DOM node where the Menu should be rendered in. Defaults to document.body.
   */
  menuTarget: PropTypes.instanceOf(
    typeof Element !== 'undefined' ? Element : Object
  ) as PropTypes.Validator<Element | null | undefined>,
};

export { OverflowMenu };
