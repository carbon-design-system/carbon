/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { keys, match } from '../../internal/keyboard';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { usePrefix } from '../../internal/usePrefix';
import { warning } from '../../internal/warning.js';

import { MenuContext, menuReducer } from './MenuContext';
import { useLayoutDirection } from '../LayoutDirection';

const spacing = 8; // distance to keep to window edges, in px

interface MenuProps extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * A collection of MenuItems to be rendered within this Menu.
   */
  children?: React.ReactNode;

  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * A label describing the Menu.
   */
  label?: string;

  /**
   * The mode of this menu. Defaults to full.
   * `full` supports nesting and selectable menu items, but no icons.
   * `basic` supports icons but no nesting or selectable menu items.
   *
   * **This prop is not intended for use and will be set by the respective implementation (like useContextMenu, MenuButton, and ComboButton).**
   */
  mode?: 'full' | 'basic';

  /**
   * Provide an optional function to be called when the Menu should be closed.
   */
  onClose?: () => void;

  /**
   * Provide an optional function to be called when the Menu is opened.
   */
  onOpen?: () => void;

  /**
   * Whether the Menu is open or not.
   */
  open?: boolean;

  /**
   * Specify the size of the Menu.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';

  /**
   * Specify a DOM node where the Menu should be rendered in. Defaults to document.body.
   */
  target?: any;

  /**
   * Specify the x position of the Menu. Either pass a single number or an array with two numbers describing your activator's boundaries ([x1, x2])
   */
  x?: number | (number | null | undefined)[];

  /**
   * Specify the y position of the Menu. Either pass a single number or an array with two numbers describing your activator's boundaries ([y1, y2])
   */
  y?: number | (number | null | undefined)[];
}

const Menu = React.forwardRef<HTMLUListElement, MenuProps>(function Menu(
  {
    children,
    className,
    label,
    mode = 'full',
    onClose,
    onOpen,
    open,
    size = 'sm',
    target = document.body,
    x = 0,
    y = 0,
    ...rest
  },
  forwardRef
) {
  const prefix = usePrefix();

  const focusReturn = useRef<HTMLElement | null>(null);

  const context = useContext(MenuContext);

  const isRoot = context.state.isRoot;

  if (context.state.mode === 'basic' && !isRoot) {
    warning(
      false,
      'Nested menus are not supported when the menu is in "basic" mode.'
    );
  }

  const menuSize = isRoot ? size : context.state.size;

  const [childState, childDispatch] = useReducer(menuReducer, {
    ...context.state,
    isRoot: false,
    mode,
    size,
    requestCloseRoot: isRoot ? handleClose : context.state.requestCloseRoot,
  });
  const childContext = useMemo(() => {
    return {
      state: childState,
      dispatch: childDispatch,
    };
  }, [childState, childDispatch]);

  const menu = useRef<HTMLUListElement>(null);
  const ref = useMergedRefs([forwardRef, menu]);

  const [position, setPosition] = useState([-1, -1]);
  const focusableItems = childContext.state.items.filter(
    (item) => !item.disabled && item.ref.current
  );

  // Set RTL based on document direction or `LayoutDirection`
  const { direction } = useLayoutDirection();

  function returnFocus() {
    if (focusReturn.current) {
      focusReturn.current.focus();
    }
  }

  function handleOpen() {
    if (menu.current) {
      focusReturn.current = document.activeElement as HTMLElement;

      const pos = calculatePosition();
      if (
        (document?.dir === 'rtl' || direction === 'rtl') &&
        !rest?.id?.includes('MenuButton')
      ) {
        menu.current.style.insetInlineStart = `initial`;
        menu.current.style.insetInlineEnd = `${pos[0]}px`;
      } else {
        menu.current.style.insetInlineStart = `${pos[0]}px`;
        menu.current.style.insetInlineEnd = `initial`;
      }

      menu.current.style.insetBlockStart = `${pos[1]}px`;
      setPosition(pos);

      menu.current.focus();

      if (onOpen) {
        onOpen();
      }
    }
  }

  function handleClose(e: Pick<React.KeyboardEvent<HTMLUListElement>, 'type'>) {
    if (/^key/.test(e.type)) {
      window.addEventListener('keyup', returnFocus, { once: true });
    } else if (e.type === 'click' && menu.current) {
      menu.current.addEventListener('focusout', returnFocus, { once: true });
    } else {
      returnFocus();
    }

    if (onClose) {
      onClose();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLUListElement>) {
    e.stopPropagation();

    // if the user presses escape or this is a submenu
    // and the user presses ArrowLeft, close it
    if (
      (match(e, keys.Escape) || (!isRoot && match(e, keys.ArrowLeft))) &&
      onClose
    ) {
      handleClose(e);
    } else {
      focusItem(e);
    }
  }

  function focusItem(e?: React.KeyboardEvent<HTMLUListElement>) {
    const currentItem = focusableItems.findIndex((item) =>
      item.ref.current.contains(document.activeElement)
    );
    let indexToFocus = currentItem;

    // if currentItem is -1, no menu item is focused yet.
    // in this case, the first item should receive focus.
    if (currentItem === -1) {
      indexToFocus = 0;
    } else if (e) {
      if (match(e, keys.ArrowUp)) {
        indexToFocus = indexToFocus - 1;
      }
      if (match(e, keys.ArrowDown)) {
        indexToFocus = indexToFocus + 1;
      }
    }

    if (indexToFocus < 0) {
      indexToFocus = focusableItems.length - 1;
    }
    if (indexToFocus >= focusableItems.length) {
      indexToFocus = 0;
    }

    if (indexToFocus !== currentItem) {
      const nodeToFocus = focusableItems[indexToFocus];
      nodeToFocus.ref.current.focus();
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLUListElement>) {
    if (open && onClose && isRoot && !menu.current?.contains(e.relatedTarget)) {
      handleClose(e);
    }
  }

  function fitValue(range: number[], axis: 'x' | 'y') {
    if (!menu.current) {
      return;
    }

    const { width, height } = menu.current.getBoundingClientRect();
    const alignment = isRoot ? 'vertical' : 'horizontal';

    const axes = {
      x: {
        max: window.innerWidth,
        size: width,
        anchor: alignment === 'horizontal' ? range[1] : range[0],
        reversedAnchor: alignment === 'horizontal' ? range[0] : range[1],
        offset: 0,
      },
      y: {
        max: window.innerHeight,
        size: height,
        anchor: alignment === 'horizontal' ? range[0] : range[1],
        reversedAnchor: alignment === 'horizontal' ? range[1] : range[0],
        offset: isRoot ? 0 : 4, // top padding in menu, used to align the menu items
      },
    };

    const { max, size, anchor, reversedAnchor, offset } = axes[axis];

    // get values for different scenarios, set to false if they don't work
    const options = [
      // towards max (preferred)
      max - spacing - size - anchor >= 0 ? anchor - offset : false,

      // towards min / reversed (first fallback)
      reversedAnchor - size >= 0 ? reversedAnchor - size + offset : false,

      // align at max (second fallback)
      max - spacing - size,
    ];

    // Previous array `options`, has at least one item that is a number (the last one - second fallback).
    // That guarantees that the return of `find()` will always be a number
    // and we can safely add the numeric casting `as number`.
    const bestOption = options.find((option) => option !== false) as number;

    return bestOption >= spacing ? bestOption : spacing;
  }

  function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
  }

  function getPosition(x: number | (number | null | undefined)[]) {
    if (Array.isArray(x)) {
      // has to be of length 2
      const filtered = x.filter(notEmpty);
      if (filtered.length === 2) {
        return filtered;
      } else {
        return;
      }
    } else {
      return [x, x];
    }
  }

  function calculatePosition() {
    const ranges = {
      x: getPosition(x),
      y: getPosition(y),
    };

    if (!ranges.x || !ranges.y) {
      return [-1, -1];
    }

    return [fitValue(ranges.x, 'x') ?? -1, fitValue(ranges.y, 'y') ?? -1];
  }

  useEffect(() => {
    if (open && focusableItems.length > 0) {
      focusItem();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, focusableItems]);

  useEffect(() => {
    if (open) {
      handleOpen();
    } else {
      // reset position when menu is closed in order for the --shown
      // modifier to be applied correctly
      setPosition([-1, -1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const classNames = cx(
    className,
    `${prefix}--menu`,
    `${prefix}--menu--${menuSize}`,
    {
      // --open sets visibility and --shown sets opacity.
      // visibility is needed for focusing elements.
      // opacity is only set once the position has been set correctly
      // to avoid a flicker effect when opening.
      [`${prefix}--menu--open`]: open,
      [`${prefix}--menu--shown`]: position[0] >= 0 && position[1] >= 0,
      [`${prefix}--menu--with-icons`]: childContext.state.hasIcons,
    }
  );

  const rendered = (
    <MenuContext.Provider value={childContext}>
      <ul
        {...rest}
        className={classNames}
        role="menu"
        ref={ref}
        aria-label={label}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}>
        {children}
      </ul>
    </MenuContext.Provider>
  );

  return isRoot ? (open && createPortal(rendered, target)) || null : rendered;
});

Menu.propTypes = {
  /**
   * A collection of MenuItems to be rendered within this Menu.
   */
  children: PropTypes.node,

  /**
   * Additional CSS class names.
   */
  className: PropTypes.string,

  /**
   * A label describing the Menu.
   */
  label: PropTypes.string,

  /**
   * The mode of this menu. Defaults to full.
   * `full` supports nesting and selectable menu items, but no icons.
   * `basic` supports icons but no nesting or selectable menu items.
   *
   * **This prop is not intended for use and will be set by the respective implementation (like useContextMenu, MenuButton, and ComboButton).**
   */
  mode: PropTypes.oneOf(['full', 'basic']),

  /**
   * Provide an optional function to be called when the Menu should be closed.
   */
  onClose: PropTypes.func,

  /**
   * Provide an optional function to be called when the Menu is opened.
   */
  onOpen: PropTypes.func,

  /**
   * Whether the Menu is open or not.
   */
  open: PropTypes.bool,

  /**
   * Specify the size of the Menu.
   */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),

  /**
   * Specify a DOM node where the Menu should be rendered in. Defaults to document.body.
   */
  target: PropTypes.object,

  /**
   * Specify the x position of the Menu. Either pass a single number or an array with two numbers describing your activator's boundaries ([x1, x2])
   */
  x: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),

  /**
   * Specify the y position of the Menu. Either pass a single number or an array with two numbers describing your activator's boundaries ([y1, y2])
   */
  y: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),
};

export { Menu };
