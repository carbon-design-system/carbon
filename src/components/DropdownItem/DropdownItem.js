import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import warning from 'warning';

let didWarnAboutDeprecation = false;

const DropdownItem = ({
  className,
  value,
  isDropdownOpen,
  itemText,
  onClick,
  onKeyPress,
  href,
  selected,
  ...other
}) => {
  if (__DEV__) {
    warning(
      didWarnAboutDeprecation,
      'The `DropdownItem` component has been deprecated and will be ' +
        'removed in the next major release of `carbon-components-react`. ' +
        'Please use `DropdownV2` instead.'
    );
    didWarnAboutDeprecation = true;
  }

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
      aria-selected={selected}
      role="option">
      <a
        tabIndex={isDropdownOpen ? 0 : -1}
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
  selected: PropTypes.bool,
};

DropdownItem.defaultProps = {
  onClick: /* istanbul ignore next */ () => {},
  onKeyPress: /* istanbul ignore next */ () => {},
  href: '',
  selected: false,
};

export default DropdownItem;
