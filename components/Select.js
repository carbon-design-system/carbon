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
  hideLabel: PropTypes.bool,
};

const defaultProps = {
  disabled: false,
  labelText: 'Select',
  iconDescription: 'open list of options',
};

const Select = ({ className, id, labelText, disabled, children, iconDescription, hideLabel, ...other }) => {
  const selectClasses = classNames({
    'bx--select': true,
    [className]: className,
  });
  const labelClasses = classNames('bx--form__label', { 'bx--visually-hidden': hideLabel });
  return (
    <div className={selectClasses}>
      <label htmlFor={id} className={labelClasses}>{labelText}</label>
      <select
        {...other}
        id={id}
        className="bx--select__input"
        disabled={disabled}
      >
        {children}
      </select>
      <Icon name="caret--down" className="bx--select__arrow" fill="#5aaafa" description={iconDescription} />
    </div>
  );
};

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
