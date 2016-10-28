import React from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/components/overflow-menu/overflow-menu.scss';

const propTypes = {
  className: React.PropTypes.string,
  itemText: React.PropTypes.string.isRequired,
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
};

const OverflowMenuItem = ({ className, itemText, isDelete, isLastItem, ...other }) => {
  const overflowMenuItemClasses = classNames(
    [className]: className,
    'bx--overflow-menu__btn',
    { 'bx--overflow-menu__btn--delete': isDelete },
  );

  const item = (
    <li>
      <button
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
