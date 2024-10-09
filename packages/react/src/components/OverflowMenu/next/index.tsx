/**
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  type ComponentType,
  type FunctionComponent,
  useRef,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { OverflowMenuVertical } from '@carbon/icons-react';
import { useFloating, flip, autoUpdate } from '@floating-ui/react';
import { useFeatureFlag } from '../../FeatureFlags';

import { IconButton } from '../../IconButton';
import { Menu } from '../../Menu';
import mergeRefs from '../../../tools/mergeRefs';

import { useId } from '../../../internal/useId';
import { usePrefix } from '../../../internal/usePrefix';
import { useAttachedMenu } from '../../../internal/useAttachedMenu';

const defaultSize = 'md';

interface OverflowMenuProps {
  /**
   * **Experimental**: Will attempt to automatically align the floating element to avoid collisions with the viewport and being clipped by ancestor elements.
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
   * Optionally provide a custom icon to be rendered on the trigger button.
   */
  renderIcon?: ComponentType | FunctionComponent;

  /**
   * Specify the size of the menu, from a list of available sizes.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Specify how the trigger tooltip should be aligned.
   */
  tooltipAlignment?:
    | 'top'
    | 'top-left'
    | 'top-right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right'
    | 'left'
    | 'right';
}

const OverflowMenu = React.forwardRef<HTMLDivElement, OverflowMenuProps>(
  function OverflowMenu(
    {
      autoAlign = false,
      children,
      className,
      label = 'Options',
      renderIcon: IconElement = OverflowMenuVertical,
      size = defaultSize,
      menuAlignment = 'bottom-start',
      tooltipAlignment,
      ...rest
    },
    forwardRef
  ) {
    const enableFloatingStyles =
      useFeatureFlag('enable-v12-dynamic-floating-styles') || autoAlign;

    const { refs, floatingStyles, placement, middlewareData } = useFloating(
      enableFloatingStyles
        ? {
            // Computing the position starts with initial positioning
            // via `placement`.
            placement: menuAlignment,

            // The floating element is positioned relative to its nearest
            // containing block (usually the viewport). It will in many cases
            // also “break” the floating element out of a clipping ancestor.
            // https://floating-ui.com/docs/misc#clipping
            strategy: 'fixed',

            // Middleware are executed as an in-between “middle” step of the
            // initial `placement` computation and eventual return of data for
            // rendering. Each middleware is executed in order.
            middleware: [
              autoAlign &&
                flip({
                  // An explicit array of placements to try if the initial
                  // `placement` doesn’t fit on the axes in which overflow
                  // is checked.
                  fallbackPlacements: menuAlignment.includes('bottom')
                    ? ['bottom-start', 'bottom-end', 'top-start', 'top-end']
                    : ['top-start', 'top-end', 'bottom-start', 'bottom-end'],
                }),
            ],
            whileElementsMounted: autoUpdate,
          }
        : {}
      // When autoAlign is turned off & the `enable-v12-dynamic-floating-styles` feature flag is not
      // enabled, floating-ui will not be used
    );

    const id = useId('overflowmenu');
    const prefix = usePrefix();

    const triggerRef = useRef<HTMLDivElement>(null);

    const {
      open,
      x,
      y,
      handleClick: hookOnClick,
      handleMousedown,
      handleClose,
    } = useAttachedMenu(triggerRef);
    useEffect(() => {
      if (enableFloatingStyles) {
        Object.keys(floatingStyles).forEach((style) => {
          if (refs.floating.current) {
            refs.floating.current.style[style] = floatingStyles[style];
          }
        });
      }
    }, [
      floatingStyles,
      enableFloatingStyles,
      refs.floating,
      open,
      placement,
      middlewareData,
    ]);

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
      size !== defaultSize && `${prefix}--overflow-menu--${size}`
    );

    const floatingRef = mergeRefs(triggerRef, refs.setReference);

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
          ref={floatingRef}
          label={label}
          align={tooltipAlignment}
          kind="ghost">
          <IconElement className={`${prefix}--overflow-menu__icon`} />
        </IconButton>
        <Menu
          containerRef={triggerRef}
          ref={refs.setFloating}
          menuAlignment={menuAlignment}
          className={menuClasses}
          id={id}
          size={size}
          legacyAutoalign={!enableFloatingStyles}
          open={open}
          onClose={handleClose}
          x={x}
          y={y}
          label={label}>
          {children}
        </Menu>
      </div>
    );
  }
);
OverflowMenu.propTypes = {
  /**
   * **Experimental**: Will attempt to automatically align the floating element to avoid collisions with the viewport and being clipped by ancestor elements.
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
   * Optionally provide a custom icon to be rendered on the trigger button.
   */
  // @ts-expect-error: PropTypes are not expressive enough to cover this case
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Specify the size of the menu, from a list of available sizes.
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
};

export { OverflowMenu };
