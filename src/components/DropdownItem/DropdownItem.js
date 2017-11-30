import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const DropdownItem = ({
  className,
  value,
  itemText,
  onClick,
  onKeyPress,
  href,
  ...other
}) => {
  const dropdownItemClasses = classNames({
    'bx--dropdown-item': true,
    [className]: className,
  });

  const handleClick = () => {
    const info = {
      value,
      itemText,
    };
    onClick(info);
  };

  const handleKeypress = () => {
    const info = {
      value,
      itemText,
    };
    onKeyPress(info);
  };

  return (
    <li
      {...other}
      value={value}
      className={dropdownItemClasses}
      onClick={handleClick}
      onKeyPress={handleKeypress}
      tabIndex={-1}
      role="menuitem">
      <a
        href={href}
        onClick={/* istanbul ignore next */ evt => evt.preventDefault()}
        className="bx--dropdown-link">
        {itemText}
      </a>
    </li>
  );
};

DropdownItem.propTypes = {
  value: PropTypes.string.isRequired,
  itemText: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func,
  href: PropTypes.string,
};

DropdownItem.defaultProps = {
  onClick: /* istanbul ignore next */ () => {},
  onKeyPress: /* istanbul ignore next */ () => {},
  href: '',
};

export default DropdownItem;
