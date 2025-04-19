/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react';
import { OverflowMenuVertical } from '@carbon/icons-react';
import classNames from 'classnames';
import invariant from 'invariant';
import PropTypes from 'prop-types';
import {
  DIRECTION_BOTTOM,
  DIRECTION_TOP,
  FloatingMenu,
  type MenuDirection,
  type MenuOffset,
} from '../../internal/FloatingMenu';
import { matches as keyCodeMatches, keys } from '../../internal/keyboard';
import { noopFn } from '../../internal/noopFn';
import { PrefixContext } from '../../internal/usePrefix';
import deprecate from '../../prop-types/deprecate';
import mergeRefs from '../../tools/mergeRefs';
import { setupGetInstanceId } from '../../tools/setupGetInstanceId';
import { IconButton } from '../IconButton';
import { OverflowMenuItemProps } from '../OverflowMenuItem/OverflowMenuItem';
import { useOutsideClick } from '../../internal/useOutsideClick';

const getInstanceId = setupGetInstanceId();

const on = (
  target: EventTarget,
  ...args: [
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ]
) => {
  target.addEventListener(...args);
  return {
    release() {
      target.removeEventListener(...args);
      return null;
    },
  };
};

/**
 * The CSS property names of the arrow keyed by the floating menu direction.
 */
const triggerButtonPositionProps = {
  [DIRECTION_TOP]: 'bottom',
  [DIRECTION_BOTTOM]: 'top',
};

/**
 * Determines how the position of the arrow should affect the floating menu
 * position.
 */
const triggerButtonPositionFactors = {
  [DIRECTION_TOP]: -2,
  [DIRECTION_BOTTOM]: -1,
};

/**
 * Calculates the offset for the floating menu.
 *
 * @param menuBody - The menu body with the menu arrow.
 * @param direction - The floating menu direction.
 * @returns The adjustment of the floating menu position, upon the position of
 *          the menu arrow.
 */
export const getMenuOffset: MenuOffset = (
  menuBody,
  direction,
  trigger,
  flip
) => {
  const triggerButtonPositionProp = triggerButtonPositionProps[direction];
  const triggerButtonPositionFactor = triggerButtonPositionFactors[direction];
  if (process.env.NODE_ENV !== 'production') {
    invariant(
      triggerButtonPositionProp && triggerButtonPositionFactor,
      '[OverflowMenu] wrong floating menu direction: `%s`',
      direction
    );
  }
  const { offsetWidth: menuWidth, offsetHeight: menuHeight } = menuBody;

  switch (triggerButtonPositionProp) {
    case 'top':
    case 'bottom': {
      // TODO: Ensure `trigger` is there for `<OverflowMenu open>`
      const triggerWidth = !trigger ? 0 : trigger.offsetWidth;
      return {
        left: (!flip ? 1 : -1) * (menuWidth / 2 - triggerWidth / 2),
        top: 0,
      };
    }
    default:
      return { left: 0, top: 0 };
  }
};

export interface OverflowMenuProps {
  /**
   * Specify a label to be read by screen readers on the container node
   */
  ['aria-label']?: string;

  /**
   * Specify a label to be read by screen readers on the container note.
   *
   * @deprecated - Use `aria-label` instead.
   */
  ariaLabel?: string;

  /**
   * The child nodes.
   */
  children: ReactNode;

  /**
   * The CSS class names.
   */
  className?: string;

  /**
   * The menu direction.
   */
  direction?: MenuDirection;

  /**
   * `true` if the menu alignment should be flipped.
   */
  flipped?: boolean;

  /**
   * Enable or disable focus trap behavior
   */
  focusTrap?: boolean;

  /**
   * The CSS class for the icon.
   */
  iconClass?: string;

  /**
   * The element ID.
   */
  id?: string;

  /**
   * The icon description.
   */
  iconDescription?: string;

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make OverflowMenu background color same as container background color.
   */
  light?: boolean;

  /**
   * The adjustment in position applied to the floating menu.
   */
  menuOffset?: MenuOffset;

  /**
   * The adjustment in position applied to the floating menu.
   */
  menuOffsetFlip?: MenuOffset;

  /**
   * The class to apply to the menu options
   */
  menuOptionsClass?: string;

  /**
   * The event handler for the `click` event.
   */
  onClick?: (evt?) => void;

  /**
   * Function called when menu is closed
   */
  onClose?: () => void;

  /**
   * Function called when menu is opened
   */
  onOpen?: () => void;

  /**
   * `true` if the menu should be open.
   */
  open?: boolean;

  /**
   * A component used to render an icon.
   */
  renderIcon?: ElementType;

  /**
   * Specify a CSS selector that matches the DOM element that should
   * be focused when the OverflowMenu opens
   */
  selectorPrimaryFocus?: string;

  /**
   * Specify the size of the OverflowMenu. Currently supports either `sm`, 'md' (default) or 'lg` as an option.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * The ref to the overflow menu's trigger button element.
   * @deprecated Use the standard React `ref` prop instead.
   */
  innerRef?: Ref<any>;
}

export const OverflowMenu = forwardRef<HTMLButtonElement, OverflowMenuProps>(
  (
    {
      ['aria-label']: ariaLabel = null,
      ariaLabel: deprecatedAriaLabel,
      children,
      className,
      direction = DIRECTION_BOTTOM,
      flipped = false,
      focusTrap = true,
      iconClass,
      iconDescription = 'Options',
      id,
      light,
      menuOffset = getMenuOffset,
      menuOffsetFlip = getMenuOffset,
      menuOptionsClass,
      onClick = noopFn,
      onClose = noopFn,
      onOpen = noopFn,
      open: openProp,
      renderIcon: IconElement = OverflowMenuVertical,
      selectorPrimaryFocus = '[data-floating-menu-primary-focus]',
      size = 'md',
      innerRef,
      ...other
    },
    ref
  ) => {
    const prefix = useContext(PrefixContext);
    const [open, setOpen] = useState(openProp ?? false);
    const [click, setClick] = useState(false);
    const [hasMountedTrigger, setHasMountedTrigger] = useState(false);
    /**  The handle of `onfocusin` or `focus` event handler. */
    const hFocusIn = useRef<{ release: () => null } | null>(null);
    const instanceId = useRef(getInstanceId());
    const menuBodyRef = useRef<HTMLElement | null>(null);
    const menuItemRefs = useRef<Record<number, HTMLElement | null>>({});
    const prevOpenProp = useRef(openProp);
    const prevOpenState = useRef(open);
    /** The element ref of the tooltip's trigger button. */
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const wrapperRef = useRef<HTMLSpanElement | null>(null);

    // Sync open prop changes.
    useEffect(() => {
      if (prevOpenProp.current !== openProp) {
        setOpen(!!openProp);
        prevOpenProp.current = openProp;
      }
    }, [openProp]);

    // Mark trigger as mounted.
    useEffect(() => {
      if (triggerRef.current) {
        setHasMountedTrigger(true);
      }
    }, []);

    // Call `onClose` when menu closes.
    useEffect(() => {
      if (!open && prevOpenState.current) {
        onClose();
      }
      prevOpenState.current = open;
    }, [open, onClose]);

    useOutsideClick(wrapperRef, ({ target }) => {
      if (
        open &&
        (!menuBodyRef.current ||
          (target instanceof Node && !menuBodyRef.current.contains(target)))
      ) {
        closeMenu();
      }
    });

    const focusMenuEl = useCallback(() => {
      if (triggerRef.current) {
        triggerRef.current.focus();
      }
    }, []);

    const closeMenu = useCallback(
      (onCloseMenu?: () => void) => {
        setOpen(false);
        // Optional callback to be executed after the state as been set to close
        if (onCloseMenu) {
          onCloseMenu();
        }
        onClose();
      },
      [onClose]
    );

    const closeMenuAndFocus = useCallback(() => {
      const wasClicked = click;
      const wasOpen = open;
      closeMenu(() => {
        if (wasOpen && !wasClicked) {
          focusMenuEl();
        }
      });
    }, [click, open, closeMenu, focusMenuEl]);

    const closeMenuOnEscape = useCallback(() => {
      const wasOpen = open;
      closeMenu(() => {
        if (wasOpen) {
          focusMenuEl();
        }
      });
    }, [open, closeMenu, focusMenuEl]);

    const handleClick = (evt: MouseEvent<HTMLButtonElement>) => {
      setClick(true);
      if (
        !menuBodyRef.current ||
        !menuBodyRef.current.contains(evt.target as Node)
      ) {
        setOpen((prev) => !prev);
        onClick(evt);
      }
    };

    const handleKeyPress = (evt: KeyboardEvent<HTMLUListElement>) => {
      if (
        open &&
        keyCodeMatches(evt, [
          keys.ArrowUp,
          keys.ArrowRight,
          keys.ArrowDown,
          keys.ArrowLeft,
        ])
      ) {
        evt.preventDefault();
      }

      // Close the overflow menu on escape
      if (keyCodeMatches(evt, [keys.Escape])) {
        closeMenuOnEscape();

        // Stop the esc keypress from bubbling out and closing something it shouldn't
        evt.stopPropagation();
      }
    };

    /**
     * Focuses the next enabled overflow menu item given the currently focused
     * item index and direction to move.
     */
    const handleOverflowMenuItemFocus = ({
      currentIndex = 0,
      direction,
    }: {
      /**
       * The index of the currently focused overflow menu item in the list of
       * overflow menu items
       */
      currentIndex?: number;
      /**
       * Number denoting the direction to move focus (1 for forwards, -1 for
       * backwards).
       */
      direction: number;
    }) => {
      const enabledIndices = Children.toArray(children).reduce<number[]>(
        (acc, curr, i) => {
          if (
            React.isValidElement<OverflowMenuItemProps>(curr) &&
            !curr.props.disabled
          ) {
            acc.push(i);
          }
          return acc;
        },
        []
      );
      const nextValidIndex = (() => {
        const nextIndex = enabledIndices.indexOf(currentIndex) + direction;
        switch (nextIndex) {
          case -1:
            return enabledIndices.length - 1;
          case enabledIndices.length:
            return 0;
          default:
            return nextIndex;
        }
      })();
      const overflowMenuItem =
        menuItemRefs.current[enabledIndices[nextValidIndex]];
      overflowMenuItem?.focus();
    };

    const bindMenuBody = (menuBody: HTMLElement | null) => {
      if (!menuBody) {
        menuBodyRef.current = menuBody;
      }
      if (!menuBody && hFocusIn.current) {
        hFocusIn.current = hFocusIn.current.release();
      }
    };

    const handlePlace = (menuBody: HTMLElement) => {
      if (!menuBody) return;

      menuBodyRef.current = menuBody;
      const hasFocusin = 'onfocusin' in window;
      const focusinEventName = hasFocusin ? 'focusin' : 'focus';
      hFocusIn.current = on(
        menuBody.ownerDocument,
        focusinEventName,
        (event: Event) => {
          const target = event.target as HTMLElement;
          const triggerEl = triggerRef.current;
          if (typeof target.matches === 'function') {
            if (
              !menuBody.contains(target) &&
              triggerEl &&
              !target.matches(
                `.${prefix}--overflow-menu:first-child, .${prefix}--overflow-menu-options:first-child`
              )
            ) {
              closeMenuAndFocus();
            }
          }
        },
        !hasFocusin
      );
      onOpen();
    };

    const getTarget = () => {
      const triggerEl = triggerRef.current;
      if (triggerEl instanceof Element) {
        return (
          triggerEl.closest('[data-floating-menu-container]') || document.body
        );
      }
      return document.body;
    };

    const menuBodyId = `overflow-menu-${instanceId.current}__menu-body`;

    const overflowMenuClasses = classNames(
      className,
      `${prefix}--overflow-menu`,
      {
        [`${prefix}--overflow-menu--open`]: open,
        [`${prefix}--overflow-menu--light`]: light,
        [`${prefix}--overflow-menu--${size}`]: size,
      }
    );

    const overflowMenuOptionsClasses = classNames(
      menuOptionsClass,
      `${prefix}--overflow-menu-options`,
      {
        [`${prefix}--overflow-menu--flip`]: flipped,
        [`${prefix}--overflow-menu-options--open`]: open,
        [`${prefix}--overflow-menu-options--light`]: light,
        [`${prefix}--overflow-menu-options--${size}`]: size,
      }
    );

    const overflowMenuIconClasses = classNames(
      `${prefix}--overflow-menu__icon`,
      iconClass
    );

    const childrenWithProps = Children.toArray(children).map((child, index) => {
      if (isValidElement(child)) {
        const childElement = child as ReactElement<OverflowMenuItemProps>;
        return cloneElement(childElement, {
          closeMenu: childElement.props.closeMenu || closeMenuAndFocus,
          handleOverflowMenuItemFocus,
          ref: (el: HTMLElement) => {
            menuItemRefs.current[index] = el;
          },
          index,
        });
      }
      return null;
    });

    const menuBody = (
      <ul
        className={overflowMenuOptionsClasses}
        tabIndex={-1}
        role="menu"
        aria-label={ariaLabel || deprecatedAriaLabel}
        onKeyDown={handleKeyPress}
        id={menuBodyId}>
        {childrenWithProps}
      </ul>
    );

    const wrappedMenuBody = (
      <FloatingMenu
        focusTrap={focusTrap}
        triggerRef={triggerRef as RefObject<HTMLElement>}
        menuDirection={direction}
        menuOffset={flipped ? menuOffsetFlip : menuOffset}
        menuRef={bindMenuBody}
        flipped={flipped}
        target={getTarget}
        onPlace={handlePlace}
        selectorPrimaryFocus={selectorPrimaryFocus}>
        {cloneElement(menuBody, {
          'data-floating-menu-direction': direction,
        })}
      </FloatingMenu>
    );
    const combinedRef = innerRef
      ? mergeRefs(triggerRef, innerRef, ref)
      : mergeRefs(triggerRef, ref);

    return (
      <>
        <span
          className={`${prefix}--overflow-menu__wrapper`}
          aria-owns={open ? menuBodyId : undefined}
          ref={wrapperRef}>
          <IconButton
            {...other}
            type="button"
            aria-haspopup
            aria-expanded={open}
            aria-controls={open ? menuBodyId : undefined}
            className={overflowMenuClasses}
            onClick={handleClick}
            id={id}
            ref={combinedRef}
            size={size}
            label={iconDescription}
            kind="ghost">
            <IconElement
              className={overflowMenuIconClasses}
              aria-label={iconDescription}
            />
          </IconButton>
          {open && hasMountedTrigger && wrappedMenuBody}
        </span>
      </>
    );
  }
);

OverflowMenu.propTypes = {
  /**
   * Specify a label to be read by screen readers on the container node
   */
  ['aria-label']: PropTypes.string,

  /**
   * Deprecated, please use `aria-label` instead.
   * Specify a label to be read by screen readers on the container note.
   */
  ariaLabel: deprecate(
    PropTypes.string,
    'This prop syntax has been deprecated. Please use the new `aria-label`.'
  ),

  /**
   * The child nodes.
   */
  children: PropTypes.node,

  /**
   * The CSS class names.
   */
  className: PropTypes.string,

  /**
   * The menu direction.
   */
  direction: PropTypes.oneOf([DIRECTION_TOP, DIRECTION_BOTTOM]),

  /**
   * `true` if the menu alignment should be flipped.
   */
  flipped: PropTypes.bool,

  /**
   * Enable or disable focus trap behavior
   */
  focusTrap: PropTypes.bool,

  /**
   * The CSS class for the icon.
   */
  iconClass: PropTypes.string,

  /**
   * The icon description.
   */
  iconDescription: PropTypes.string,

  /**
   * The element ID.
   */
  id: PropTypes.string,

  /**
   * `true` to use the light version. For use on $ui-01 backgrounds only.
   * Don't use this to make OverflowMenu background color same as container background color.
   */
  light: deprecate(
    PropTypes.bool,
    'The `light` prop for `OverflowMenu` is no longer needed and has been deprecated. It will be removed in the next major release. Use the Layer component instead.'
  ),

  /**
   * The adjustment in position applied to the floating menu.
   */
  menuOffset: PropTypes.oneOfType([
    PropTypes.shape({
      top: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
    }),
    PropTypes.func,
  ]),

  /**
   * The adjustment in position applied to the floating menu.
   */
  menuOffsetFlip: PropTypes.oneOfType([
    PropTypes.shape({
      top: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
    }),
    PropTypes.func,
  ]),

  /**
   * The class to apply to the menu options
   */
  menuOptionsClass: PropTypes.string,

  /**
   * The event handler for the `click` event.
   */
  onClick: PropTypes.func,

  /**
   * Function called when menu is closed
   */
  onClose: PropTypes.func,

  /**
   * The event handler for the `focus` event.
   */
  onFocus: PropTypes.func,

  /**
   * The event handler for the `keydown` event.
   */
  onKeyDown: PropTypes.func,

  /**
   * Function called when menu is opened
   */
  onOpen: PropTypes.func,

  /**
   * `true` if the menu should be open.
   */
  open: PropTypes.bool,

  /**
   * A component used to render an icon.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Specify a CSS selector that matches the DOM element that should
   * be focused when the OverflowMenu opens
   */
  selectorPrimaryFocus: PropTypes.string,

  /**
   * Specify the size of the OverflowMenu. Currently supports either `sm`, 'md' (default) or 'lg` as an option.
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default OverflowMenu;
