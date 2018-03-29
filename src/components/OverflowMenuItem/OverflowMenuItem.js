import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const OverflowMenuItem = ({
  className,
  itemText,
  hasDivider,
  isDelete,
  closeMenu,
  onClick,
  primaryFocus,
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
    }
  );

  const handleClick = evt => {
    onClick(evt);
    closeMenu();
  };

  const primaryFocusProp = !primaryFocus
    ? {}
    : { 'data-floating-menu-primary-focus': true };
  const item = (
    <li className={overflowMenuItemClasses} role="menuitem">
      <button
        {...other}
        {...primaryFocusProp}
        className={overflowMenuBtnClasses}
        onClick={handleClick}>
        {itemText}
      </button>
    </li>
  );

  return item;
};

OverflowMenuItem.propTypes = {
  /**
   * The CSS class names.
   */
  className: PropTypes.string,

  /**
   * The text in the menu item.
   */
  itemText: PropTypes.string.isRequired,

  /**
   * `true` to make this menu item a divider.
   */
  hasDivider: PropTypes.bool,

  /**
   * `true` to make this menu item a "danger button".
   */
  isDelete: PropTypes.bool,

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
};

OverflowMenuItem.defaultProps = {
  hasDivider: false,
  isDelete: false,
  itemText: 'Provide itemText',
  onClick: () => {},
};

export default OverflowMenuItem;
