import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
if (!process.env.EXCLUDE_SASS) {
  import('@console/bluemix-components/consumables/scss/components/overflow-menu/overflow-menu.scss');
}

const propTypes = {
  className: PropTypes.string,
  itemText: PropTypes.string.isRequired,
  closeMenu: PropTypes.func,
  isDelete: PropTypes.bool,
  isLastItem: PropTypes.bool,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseUp: PropTypes.func,
};

const defaultProps = {
  isDelete: false,
  isLastItem: false,
  onClick: () => {},
};

const OverflowMenuItem = (
  props) => {
  const { className, itemText, isDelete, isLastItem, closeMenu, onClick, ...other } = props;

  const overflowMenuItemClasses = classNames(
    [className]: className,
    'bx--overflow-menu__btn',
    { 'bx--overflow-menu__btn--delete': isDelete },
  );

  const handleClick = (evt) => {
    onClick(evt);
    closeMenu();
  };

  const item = (
    <li>
      <button
        onClick={handleClick}
        {...other}
        type="button"
        className={overflowMenuItemClasses}
      >
        {itemText}
      </button>
    </li>
  );

  const overflowMenuItem = isLastItem ?
    <span>
      <hr />
      {item}
    </span> : item;

  return overflowMenuItem;
};

OverflowMenuItem.propTypes = propTypes;
OverflowMenuItem.defaultProps = defaultProps;

export default OverflowMenuItem;
