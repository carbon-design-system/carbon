import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from './Icon';
if (!process.env.EXCLUDE_SASS) {
  import('@console/bluemix-components/consumables/scss/base-elements/select/select.scss');
  import('@console/bluemix-components/consumables/scss/base-elements/forms/forms.scss');
}

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
  const iconClasses = classNames('bx--select__arrow', { 'bx--select__arrow--no-label': hideLabel });
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
      <Icon name="caret--down" className={iconClasses} fill="#5aaafa" description={iconDescription} />
    </div>
  );
};

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
