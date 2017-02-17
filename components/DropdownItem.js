import React from 'react';
import classNames from 'classnames';
// eslint-disable-next-line max-len, import/no-unresolved
import '../env-defined-then-loader?-EXCLUDE_SASS!@console/bluemix-components/consumables/scss/components/dropdown/dropdown.scss';

const propTypes = {
  value: React.PropTypes.string.isRequired,
  itemText: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
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
