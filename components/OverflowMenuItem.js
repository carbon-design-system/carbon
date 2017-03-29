import React from 'react';
import classNames from 'classnames';
if (!process.env.EXCLUDE_SASS) {
  import('@console/bluemix-components/consumables/scss/components/overflow-menu/overflow-menu.scss');
}

const propTypes = {
  className: React.PropTypes.string,
  itemText: React.PropTypes.string.isRequired,
  closeMenu: React.PropTypes.func,
  isDelete: React.PropTypes.bool,
  isLastItem: React.PropTypes.bool,
  onBlur: React.PropTypes.func,
  onClick: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onKeyDown: React.PropTypes.func,
  onKeyUp: React.PropTypes.func,
  onMouseDown: React.PropTypes.func,
  onMouseEnter: React.PropTypes.func,
  onMouseLeave: React.PropTypes.func,
  onMouseUp: React.PropTypes.func,
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
