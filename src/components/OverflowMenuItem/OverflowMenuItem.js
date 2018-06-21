import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const OverflowMenuItem = ({
  className,
  itemText,
  hasDivider,
  isDelete,
  disabled,
  closeMenu,
  onClick,
  primaryFocus,
  floatingMenu,
  wrapperClassName,
  ...other
}) => {
  const overflowMenuBtnClasses = classNames(
    'bx--overflow-menu-options__btn',
    className
  );

  const overflowMenuItemClasses = classNames(
    'bx--overflow-menu-options__option',
    {
      'bx--overflow-menu--divider': hasDivider,
      'bx--overflow-menu-options__option--danger': isDelete,
      'bx--overflow-menu-options__option--disabled': disabled,
    },
    wrapperClassName
  );

  const handleClick = evt => {
    onClick(evt);
    closeMenu();
  };

  const primaryFocusProp = (({ primaryFocus, floatingMenu }) => {
    if (!primaryFocus) {
      return {};
    }
    return floatingMenu
      ? { 'data-floating-menu-primary-focus': true }
      : { 'data-overflow-menu-primary-focus': true };
  })({ primaryFocus, floatingMenu });

  const item = (
    <li className={overflowMenuItemClasses} role="menuitem">
      <button
        {...other}
        {...primaryFocusProp}
        className={overflowMenuBtnClasses}
        disabled={disabled}
        onClick={handleClick}
        tabIndex={disabled ? -1 : 0}>
        {itemText}
      </button>
    </li>
  );

  return item;
};

OverflowMenuItem.propTypes = {
  /**
   * The CSS class name to be placed on the button element
   */
  className: PropTypes.string,

  /**
   * The CSS class name to be placed on the wrapper list item element
   */
  wrapperClassName: PropTypes.string,

  /**
   * The text in the menu item.
   */
  itemText: PropTypes.node.isRequired,

  /**
   * `true` to make this menu item a divider.
   */
  hasDivider: PropTypes.bool,

  /**
   * `true` to make this menu item a "danger button".
   */
  isDelete: PropTypes.bool,
  /**
   * `true` to make this menu item disabled.
   */
  disabled: PropTypes.bool,

  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseUp: PropTypes.func,

  /**
   * A callback to tell the parent menu component that the menu should be closed.
   */
  closeMenu: PropTypes.func,

  /**
   * `true` if this menu item should get focus when the menu gets open.
   */
  primaryFocus: PropTypes.bool,

  /**
   * `true` if this menu item belongs to a floating OverflowMenu
   */
  floatingMenu: PropTypes.bool,
};

OverflowMenuItem.defaultProps = {
  hasDivider: false,
  isDelete: false,
  disabled: false,
  itemText: 'Provide itemText',
  onClick: () => {},
};

export default OverflowMenuItem;
