/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef, useState } from 'react';

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

const hoverIntentDelay = 150; // in ms

const MenuItem = React.forwardRef(function MenuItem(
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

  const menuItem = useRef();
  const ref = useMergedRefs([forwardRef, menuItem]);
  const [boundaries, setBoundaries] = useState({ x: -1, y: -1 });
  const [isRtl, setRtl] = useState(false);

  const hasChildren = Boolean(children);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const hoverIntentTimeout = useRef(null);

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
    const { x, y, width, height } = menuItem.current.getBoundingClientRect();
    if (isRtl) {
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

  function handleClick(e) {
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
    clearTimeout(hoverIntentTimeout.current);
    closeSubmenu();
    menuItem.current.focus();
  }

  function handleKeyDown(e) {
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

  // Set RTL based on document direction or `LayoutDirection`
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
      context.dispatch({ type: 'enableIcons' });
    }
  }, [iconsAllowed, IconElement, context.state.hasIcons, context]);

  return (
    <li
      role="menuitem"
      {...rest}
      ref={ref}
      className={classNames}
      tabIndex="-1"
      aria-disabled={isDisabled || null}
      aria-haspopup={hasChildren || null}
      aria-expanded={hasChildren ? submenuOpen : null}
      onClick={handleClick}
      onMouseEnter={hasChildren ? handleMouseEnter : null}
      onMouseLeave={hasChildren ? handleMouseLeave : null}
      onKeyDown={handleKeyDown}>
      <div className={`${prefix}--menu-item__icon`}>
        {iconsAllowed && IconElement && <IconElement />}
      </div>
      <Text as="div" className={`${prefix}--menu-item__label`}>
        {label}
      </Text>
      {shortcut && !hasChildren && (
        <div className={`${prefix}--menu-item__shortcut`}>{shortcut}</div>
      )}
      {hasChildren && (
        <>
          <div className={`${prefix}--menu-item__shortcut`}>
            {isRtl ? <CaretLeft /> : <CaretRight />}
          </div>
          <Menu
            label={label}
            open={submenuOpen}
            onClose={() => {
              closeSubmenu();
              menuItem.current.focus();
            }}
            x={boundaries.x}
            y={boundaries.y}>
            {children}
          </Menu>
        </>
      )}
    </li>
  );
});

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
  onClick: PropTypes.func,

  /**
   * Only applicable if the parent menu is in `basic` mode. Sets the menu item's icon.
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Provide a shortcut for the action of this MenuItem. Note that the component will only render it as a hint but not actually register the shortcut.
   */
  shortcut: PropTypes.string,
};

const MenuItemSelectable = React.forwardRef(function MenuItemSelectable(
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
  defaultSelected: PropTypes.bool,

  /**
   * A required label titling this option.
   */
  label: PropTypes.string.isRequired,

  /**
   * Provide an optional function to be called when the selection state changes.
   */
  onChange: PropTypes.func,

  /**
   * Pass a bool to props.selected to control the state of this option.
   */
  selected: PropTypes.bool,
};

const MenuItemGroup = React.forwardRef(function MenuItemGroup(
  { children, className, label, ...rest },
  forwardRef
) {
  const prefix = usePrefix();

  const classNames = cx(className, `${prefix}--menu-item-group`);

  return (
    <li className={classNames} role="none" ref={forwardRef}>
      <ul {...rest} role="group" aria-label={label}>
        {children}
      </ul>
    </li>
  );
});

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

const MenuItemRadioGroup = React.forwardRef(function MenuItemRadioGroup(
  {
    className,
    defaultSelectedItem,
    items,
    itemToString = defaultItemToString,
    label,
    onChange,
    selectedItem,
    ...rest
  },
  forwardRef
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
  itemToString: PropTypes.func,

  /**
   * Provide the options for this radio group. Can be of any type, as long as you provide an appropriate props.itemToString function.
   */
  items: PropTypes.array,

  /**
   * A required label titling this radio group.
   */
  label: PropTypes.string.isRequired,

  /**
   * Provide an optional function to be called when the selection changes.
   */
  onChange: PropTypes.func,

  /**
   * Provide props.selectedItem to control the state of this radio group. Must match the type of props.items.
   */
  selectedItem: PropTypes.any,
};

const MenuItemDivider = React.forwardRef(function MenuItemDivider(
  { className, ...rest },
  forwardRef
) {
  const prefix = usePrefix();

  const classNames = cx(className, `${prefix}--menu-item-divider`);

  return (
    <li {...rest} className={classNames} role="separator" ref={forwardRef} />
  );
});

MenuItemDivider.propTypes = {
  /**
   * Additional CSS class names.
   */
  className: PropTypes.string,
};

export {
  MenuItem,
  MenuItemSelectable,
  MenuItemGroup,
  MenuItemRadioGroup,
  MenuItemDivider,
};
