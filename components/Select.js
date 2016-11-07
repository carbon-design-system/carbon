import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Icon from './Icon';
import '@console/bluemix-components/consumables/scss/base-elements/select/select.scss';
import '@console/bluemix-components/consumables/scss/base-elements/forms/forms.scss';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.any,
  iconDescription: PropTypes.string,
};

const defaultProps = {
  disabled: false,
  labelText: 'Select',
  iconDescription: 'open list of options',
};

const Select = ({ className, id, labelText, disabled, children, iconDescription, ...other }) => {
  const selectClasses = classNames({
    'bx--select': true,
    [className]: className,
  });

  return (
    <div className={selectClasses}>
      <label htmlFor={id} className="bx--form__label">{labelText}</label>
      <select
        {...other}
        id={id}
        className="bx--select__input"
        disabled={disabled}
      >
        {children}
      </select>
      <Icon name="down-arrow" className="bx--select__arrow" fill="#5aaafa" description={iconDescription} />
    </div>
  );
};

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
