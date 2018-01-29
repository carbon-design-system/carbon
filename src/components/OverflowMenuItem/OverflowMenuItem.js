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

  const item = (
    <li className={overflowMenuItemClasses}>
      <button
        {...other}
        type="button"
        className={overflowMenuBtnClasses}
        onClick={handleClick}>
        {itemText}
      </button>
    </li>
  );

  return item;
};

OverflowMenuItem.propTypes = {
  className: PropTypes.string,
  itemText: PropTypes.string.isRequired,
  hasDivider: PropTypes.bool,
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
  closeMenu: PropTypes.func,
};

OverflowMenuItem.defaultProps = {
  hasDivider: false,
  isDelete: false,
  itemText: 'Provide itemText',
  onClick: () => {},
};

export default OverflowMenuItem;
