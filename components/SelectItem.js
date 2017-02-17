import React from 'react';
import classNames from 'classnames';
// eslint-disable-next-line max-len, import/no-unresolved
import '../env-defined-then-loader?-EXCLUDE_SASS!@console/bluemix-components/consumables/scss/base-elements/select/select.scss';

const propTypes = {
  value: React.PropTypes.any.isRequired,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  hidden: React.PropTypes.bool,
  text: React.PropTypes.string.isRequired,
};

const defaultProps = {
  disabled: false,
  hidden: false,
  value: '',
  text: '',
};

const SelectItem = ({ className, value, disabled, hidden, text, ...other }) => {
  const selectItemClasses = classNames({
    'bx--select__option': true,
    [className]: className,
  });

  return (
    <option
      {...other}
      className={selectItemClasses}
      value={value}
      disabled={disabled}
      hidden={hidden}
    >{text}
    </option>
  );
};

SelectItem.propTypes = propTypes;
SelectItem.defaultProps = defaultProps;

export default SelectItem;
