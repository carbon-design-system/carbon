import React from 'react';
import classNames from 'classnames';

const propTypes = {
  className: React.PropTypes.string,
  itemText: React.PropTypes.string.isRequired,
  isLastItem: React.PropTypes.bool,
  hasDivider: React.PropTypes.bool,
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
  isLastItem: false,
  hasDivider: false
};

const OverflowMenuItem = ({ className, itemText, hasDivider, ...other }) => {
  const overflowMenuBtnClasses = classNames(
    [className]: className,
    'bx--overflow-menu-options__btn',
  );

  const overflowMenuItemClasses = classNames(
    'bx--overflow-menu-options__option': true,
    { 'bx--overflow-menu--divider': hasDivider }
  );

  const item = (
    <li className={overflowMenuItemClasses}>
      <button
        {...other}
        type="button"
        className={overflowMenuBtnClasses}
      >
        {itemText}
      </button>
    </li>
  );

  return item;
};

OverflowMenuItem.propTypes = propTypes;
OverflowMenuItem.defaultProps = defaultProps;

export default OverflowMenuItem;
