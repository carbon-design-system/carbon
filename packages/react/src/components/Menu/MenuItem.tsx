/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  ChangeEventHandler,
  ComponentProps,
  FC,
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  LiHTMLAttributes,
  MouseEvent,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { CaretRight, CaretLeft, Checkmark } from '@carbon/icons-react';
import { keys, match } from '../../internal/keyboard';
import { useControllableState } from '../../internal/useControllableState';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { usePrefix } from '../../internal/usePrefix';
import { warning } from '../../internal/warning.js';

import { Menu } from './Menu';
import { MenuContext } from './MenuContext';
import { useLayoutDirection } from '../LayoutDirection';
import { Text } from '../Text';

export interface MenuItemProps extends LiHTMLAttributes<HTMLLIElement> {
  /**
   * Optionally provide another Menu to create a submenu. props.children can't be used to specify the content of the MenuItem itself. Use props.label instead.
   */
  children?: ReactNode;

  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * Specify whether the MenuItem is disabled or not.
   */
  disabled?: boolean;

  /**
   * Specify the kind of the MenuItem.
   */
  kind?: 'default' | 'danger';

  /**
   * A required label titling the MenuItem. Will be rendered as its text content.
   */
  label: string;

  /**
   * Provide an optional function to be called when the MenuItem is clicked.
   */
  onClick?: (
    event: KeyboardEvent<HTMLLIElement> | MouseEvent<HTMLLIElement>
  ) => void;

  /**
   * Only applicable if the parent menu is in `basic` mode. Sets the menu item's icon.
   */
  renderIcon?: FC;

  /**
   * Provide a shortcut for the action of this MenuItem. Note that the component will only render it as a hint but not actually register the shortcut.
   */
  shortcut?: string;
}

const hoverIntentDelay = 150; // in ms

export const MenuItem = forwardRef<HTMLLIElement, MenuItemProps>(
  function MenuItem(
    {
      children,
      className,
      disabled,
      kind = 'default',
      label,
      onClick,
      renderIcon: IconElement,
      shortcut,
      ...rest
    },
    forwardRef
  ) {
    const prefix = usePrefix();
    const context = useContext(MenuContext);

    const menuItem = useRef<HTMLLIElement>(null);
    const ref = useMergedRefs<HTMLLIElement>([forwardRef, menuItem]);
    const [boundaries, setBoundaries] = useState<{
      x: number | [number, number];
      y: number | [number, number];
    }>({ x: -1, y: -1 });
    const [rtl, setRtl] = useState(false);

    const hasChildren = Boolean(children);
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const hoverIntentTimeout = useRef<ReturnType<typeof setTimeout> | null>(
      null
    );

    const isDisabled = disabled && !hasChildren;
    const isDanger = kind === 'danger' && !hasChildren;

    function registerItem() {
      context.dispatch({
        type: 'registerItem',
        payload: {
          ref: menuItem,
          disabled: Boolean(disabled),
        },
      });
    }

    function openSubmenu() {
      if (!menuItem.current) {
        return;
      }

      const { x, y, width, height } = menuItem.current.getBoundingClientRect();
      if (rtl) {
        setBoundaries({
          x: [-x, x - width],
          y: [y, y + height],
        });
      } else {
        setBoundaries({
          x: [x, x + width],
          y: [y, y + height],
        });
      }

      setSubmenuOpen(true);
    }

    function closeSubmenu() {
      setSubmenuOpen(false);
      setBoundaries({ x: -1, y: -1 });
    }

    function handleClick(
      e: KeyboardEvent<HTMLLIElement> | MouseEvent<HTMLLIElement>
    ) {
      if (!isDisabled) {
        if (hasChildren) {
          openSubmenu();
        } else {
          context.state.requestCloseRoot(e);

          if (onClick) {
            onClick(e);
          }
        }
      }
    }

    function handleMouseEnter() {
      hoverIntentTimeout.current = setTimeout(() => {
        openSubmenu();
      }, hoverIntentDelay);
    }

    function handleMouseLeave() {
      if (hoverIntentTimeout.current) {
        clearTimeout(hoverIntentTimeout.current);
        closeSubmenu();
        menuItem.current?.focus();
      }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLLIElement>) {
      if (hasChildren && match(e, keys.ArrowRight)) {
        openSubmenu();
        e.stopPropagation();
      }

      if (match(e, keys.Enter) || match(e, keys.Space)) {
        handleClick(e);
      }

      if (rest.onKeyDown) {
        rest.onKeyDown(e);
      }
    }

    const classNames = cx(className, `${prefix}--menu-item`, {
      [`${prefix}--menu-item--disabled`]: isDisabled,
      [`${prefix}--menu-item--danger`]: isDanger,
    });

    // on first render, register this menuitem in the context's state
    // (used for keyboard navigation)
    useEffect(() => {
      registerItem();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Set RTL based on the document direction or `LayoutDirection`
    const { direction } = useLayoutDirection();
    useEffect(() => {
      if (document?.dir === 'rtl' || direction === 'rtl') {
        setRtl(true);
      } else {
        setRtl(false);
      }
    }, [direction]);

    const iconsAllowed =
      context.state.mode === 'basic' ||
      rest.role === 'menuitemcheckbox' ||
      rest.role === 'menuitemradio';

    useEffect(() => {
      if (iconsAllowed && IconElement && !context.state.hasIcons) {
        // @ts-ignore - TODO: Should we be passing payload?
        context.dispatch({ type: 'enableIcons' });
      }
    }, [iconsAllowed, IconElement, context.state.hasIcons, context]);

    return (
      <li
        role="menuitem"
        {...rest}
        ref={ref}
        className={classNames}
        tabIndex={-1}
        aria-disabled={isDisabled ?? undefined}
        aria-haspopup={hasChildren ?? undefined}
        aria-expanded={hasChildren ? submenuOpen : undefined}
        onClick={handleClick}
        onMouseEnter={hasChildren ? handleMouseEnter : undefined}
        onMouseLeave={hasChildren ? handleMouseLeave : undefined}
        onKeyDown={handleKeyDown}>
        <div className={`${prefix}--menu-item__icon`}>
          {iconsAllowed && IconElement && <IconElement />}
        </div>
        <Text as="div" className={`${prefix}--menu-item__label`} title={label}>
          {label}
        </Text>
        {shortcut && !hasChildren && (
          <div className={`${prefix}--menu-item__shortcut`}>{shortcut}</div>
        )}
        {hasChildren && (
          <>
            <div className={`${prefix}--menu-item__shortcut`}>
              {rtl ? <CaretLeft /> : <CaretRight />}
            </div>
            <Menu
              label={label}
              open={submenuOpen}
              onClose={() => {
                closeSubmenu();
                menuItem.current?.focus();
              }}
              x={boundaries.x}
              y={boundaries.y}>
              {children}
            </Menu>
          </>
        )}
      </li>
    );
  }
);

MenuItem.propTypes = {
  /**
   * Optionally provide another Menu to create a submenu. props.children can't be used to specify the content of the MenuItem itself. Use props.label instead.
   */
  children: PropTypes.node,

  /**
   * Additional CSS class names.
   */
  className: PropTypes.string,

  /**
   * Specify whether the MenuItem is disabled or not.
   */
  disabled: PropTypes.bool,

  /**
   * Specify the kind of the MenuItem.
   */
  kind: PropTypes.oneOf(['default', 'danger']),

  /**
   * A required label titling the MenuItem. Will be rendered as its text content.
   */
  label: PropTypes.string.isRequired,

  /**
   * Provide an optional function to be called when the MenuItem is clicked.
   */
  // @ts-ignore-next-line -- avoid spurious (?) TS2322 error
  onClick: PropTypes.func,

  /**
   * Only applicable if the parent menu is in `basic` mode. Sets the menu item's icon.
   */
  // @ts-ignore-next-line -- avoid spurious (?) TS2322 error
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Provide a shortcut for the action of this MenuItem. Note that the component will only render it as a hint but not actually register the shortcut.
   */
  // @ts-ignore-next-line -- avoid spurious (?) TS2322 error
  shortcut: PropTypes.string,
};

export interface MenuItemSelectableProps
  extends Omit<MenuItemProps, 'onChange'> {
  /**
   * Specify whether the option should be selected by default.
   */
  defaultSelected?: boolean;

  /**
   * Provide an optional function to be called when the selection state changes.
   */
  onChange?: ChangeEventHandler<HTMLLIElement>;

  /**
   * Controls the state of this option.
   */
  selected?: boolean;
}

export const MenuItemSelectable = forwardRef<
  HTMLLIElement,
  MenuItemSelectableProps
>(function MenuItemSelectable(
  { className, defaultSelected, label, onChange, selected, ...rest },
  forwardRef
) {
  const prefix = usePrefix();
  const context = useContext(MenuContext);

  if (context.state.mode === 'basic') {
    warning(
      false,
      'MenuItemSelectable is not supported when the menu is in "basic" mode.'
    );
  }

  const [checked, setChecked] = useControllableState({
    value: selected,
    onChange,
    defaultValue: defaultSelected ?? false,
  });

  function handleClick(e) {
    setChecked(!checked);

    if (onChange) {
      onChange(e);
    }
  }

  useEffect(() => {
    if (!context.state.hasIcons) {
      // @ts-ignore - TODO: Should we be passing payload?
      context.dispatch({ type: 'enableIcons' });
    }
  }, [context.state.hasIcons, context]);

  const classNames = cx(className, `${prefix}--menu-item-selectable--selected`);

  return (
    <MenuItem
      {...rest}
      ref={forwardRef}
      label={label}
      className={classNames}
      role="menuitemcheckbox"
      aria-checked={checked}
      renderIcon={checked ? Checkmark : undefined}
      onClick={handleClick}
    />
  );
});

MenuItemSelectable.propTypes = {
  /**
   * Additional CSS class names.
   */
  className: PropTypes.string,

  /**
   * Specify whether the option should be selected by default.
   */
  // @ts-ignore-next-line -- avoid spurious (?) TS2322 error
  defaultSelected: PropTypes.bool,

  /**
   * A required label titling this option.
   */
  label: PropTypes.string.isRequired,

  /**
   * Provide an optional function to be called when the selection state changes.
   */
  // @ts-ignore-next-line -- avoid spurious (?) TS2322 error
  onChange: PropTypes.func,

  /**
   * Pass a bool to props.selected to control the state of this option.
   */
  // @ts-ignore-next-line -- avoid spurious (?) TS2322 error
  selected: PropTypes.bool,
};

export interface MenuItemGroupProps extends ComponentProps<'ul'> {
  /**
   * A collection of MenuItems to be rendered within this group.
   */
  children?: ReactNode;

  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * A required label titling this group.
   */
  label: string;
}

export const MenuItemGroup = forwardRef<HTMLLIElement, MenuItemGroupProps>(
  function MenuItemGroup({ children, className, label, ...rest }, forwardRef) {
    const prefix = usePrefix();

    const classNames = cx(className, `${prefix}--menu-item-group`);

    return (
      <li className={classNames} role="none" ref={forwardRef}>
        <ul {...rest} role="group" aria-label={label}>
          {children}
        </ul>
      </li>
    );
  }
);

MenuItemGroup.propTypes = {
  /**
   * A collection of MenuItems to be rendered within this group.
   */
  children: PropTypes.node,

  /**
   * Additional CSS class names.
   */
  className: PropTypes.string,

  /**
   * A required label titling this group.
   */
  label: PropTypes.string.isRequired,
};

const defaultItemToString = (item) => item.toString();

export interface MenuItemRadioGroupProps<Item>
  extends Omit<ComponentProps<'ul'>, 'onChange'> {
  /**
   * Additional CSS class names.
   */
  className?: string;

  /**
   * Specify the default selected item. Must match the type of props.items.
   */
  defaultSelectedItem?: Item;

  /**
   * Provide a function to convert an item to the string that will be rendered. Defaults to item.toString().
   */
  itemToString?: (item: Item) => string;

  /**
   * Provide the options for this radio group. Can be of any type, as long as you provide an appropriate props.itemToString function.
   */
  items: Item[];

  /**
   * A required label titling this radio group.
   */
  label: string;

  /**
   * Provide an optional function to be called when the selection changes.
   */
  onChange?: ChangeEventHandler<HTMLLIElement>;

  /**
   * Provide props.selectedItem to control the state of this radio group. Must match the type of props.items.
   */
  selectedItem?: Item;
}

export const MenuItemRadioGroup = forwardRef(function MenuItemRadioGroup<Item>(
  {
    className,
    defaultSelectedItem,
    items,
    itemToString = defaultItemToString,
    label,
    onChange,
    selectedItem,
    ...rest
  }: MenuItemRadioGroupProps<Item>,
  forwardRef: ForwardedRef<HTMLLIElement>
) {
  const prefix = usePrefix();
  const context = useContext(MenuContext);

  if (context.state.mode === 'basic') {
    warning(
      false,
      'MenuItemRadioGroup is not supported when the menu is in "basic" mode.'
    );
  }

  const [selection, setSelection] = useControllableState({
    value: selectedItem,
    onChange,
    defaultValue: defaultSelectedItem,
  });

  function handleClick(item, e) {
    setSelection(item);

    if (onChange) {
      onChange(e);
    }
  }

  useEffect(() => {
    if (!context.state.hasIcons) {
      // @ts-ignore - TODO: Should we be passing payload?
      context.dispatch({ type: 'enableIcons' });
    }
  }, [context.state.hasIcons, context]);

  const classNames = cx(className, `${prefix}--menu-item-radio-group`);

  return (
    <li className={classNames} role="none" ref={forwardRef}>
      <ul {...rest} role="group" aria-label={label}>
        {items.map((item, i) => (
          <MenuItem
            key={i}
            label={itemToString(item)}
            role="menuitemradio"
            aria-checked={item === selection}
            renderIcon={item === selection ? Checkmark : undefined}
            onClick={(e) => {
              handleClick(item, e);
            }}
          />
        ))}
      </ul>
    </li>
  );
});

MenuItemRadioGroup.propTypes = {
  /**
   * Additional CSS class names.
   */
  className: PropTypes.string,

  /**
   * Specify the default selected item. Must match the type of props.items.
   */
  defaultSelectedItem: PropTypes.any,

  /**
   * Provide a function to convert an item to the string that will be rendered. Defaults to item.toString().
   */
  // @ts-ignore-next-line -- avoid spurious (?) TS2322 error
  itemToString: PropTypes.func,

  /**
   * Provide the options for this radio group. Can be of any type, as long as you provide an appropriate props.itemToString function.
   */
  // @ts-ignore-next-line -- avoid spurious (?) TS2322 error
  items: PropTypes.array,

  /**
   * A required label titling this radio group.
   */
  label: PropTypes.string.isRequired,

  /**
   * Provide an optional function to be called when the selection changes.
   */
  // @ts-ignore-next-line -- avoid spurious (?) TS2322 error
  onChange: PropTypes.func,

  /**
   * Provide props.selectedItem to control the state of this radio group. Must match the type of props.items.
   */
  selectedItem: PropTypes.any,
};

export interface MenuItemDividerProps extends ComponentProps<'li'> {
  /**
   * Additional CSS class names.
   */
  className?: string;
}

export const MenuItemDivider = forwardRef<HTMLLIElement, MenuItemDividerProps>(
  function MenuItemDivider({ className, ...rest }, forwardRef) {
    const prefix = usePrefix();

    const classNames = cx(className, `${prefix}--menu-item-divider`);

    return (
      <li {...rest} className={classNames} role="separator" ref={forwardRef} />
    );
  }
);

MenuItemDivider.propTypes = {
  /**
   * Additional CSS class names.
   */
  className: PropTypes.string,
};
