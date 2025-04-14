/**
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef, type ElementType } from 'react';
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
import deprecateValuesWithin from '../../../prop-types/deprecateValuesWithin';

const defaultSize = 'md';

const propMappingFunction = (deprecatedValue) => {
  const mapping = {
    'top-left': 'top-start',
    'top-right': 'top-end',
    'bottom-left': 'bottom-start',
    'bottom-right': 'bottom-end',
    'left-bottom': 'left-end',
    'left-top': 'left-start',
    'right-bottom': 'right-end',
    'right-top': 'right-start',
  };
  return mapping[deprecatedValue];
};

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
   * A component used to render an icon.
   */
  renderIcon?: ElementType;

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

  /**
   * Specify a DOM node where the Menu should be rendered in. Defaults to document.body.
   */
  menuTarget?: Element;
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
      menuTarget,
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
          label={label}
          target={menuTarget}>
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
   * A component used to render an icon.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Specify the size of the menu, from a list of available sizes.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),

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
    //allowed prop values
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
    //optional mapper function
    propMappingFunction
  ),

  /**
   * Specify a DOM node where the Menu should be rendered in. Defaults to document.body.
   */
  menuTarget: PropTypes.instanceOf(
    typeof Element !== 'undefined' ? Element : Object
  ) as PropTypes.Validator<Element | null | undefined>,
};

export { OverflowMenu };
