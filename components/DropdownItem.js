import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
if (!process.env.EXCLUDE_SASS) {
  import('@console/bluemix-components/consumables/scss/components/dropdown/dropdown.scss');
}

const propTypes = {
  value: PropTypes.string.isRequired,
  itemText: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

const defaultProps = {
  onClick: /* istanbul ignore next */() => {},
};

const DropdownItem = ({ className, value, itemText, onClick, ...other }) => {
  const dropdownItemClasses = classNames({
    'bx--dropdown__list-item': true,
    [className]: className,
  });

  const handleClick = () => {
    const info = {
      value,
      itemText,
    };
    onClick(info);
  };

  return (
    <li
      {...other}
      value={value}
      className={dropdownItemClasses}
      onClick={handleClick}
    >
      <a href="#" onClick={/* istanbul ignore next */(evt) => evt.preventDefault()} className="bx--dropdown__link">{itemText}</a>
    </li>
  );
};

DropdownItem.propTypes = propTypes;
DropdownItem.defaultProps = defaultProps;

export default DropdownItem;
