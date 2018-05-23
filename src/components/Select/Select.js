import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';

const Select = ({
  className,
  id,
  inline,
  labelText,
  disabled,
  children,
  iconDescription,
  hideLabel,
  light,
  ...other
}) => {
  const selectClasses = classNames({
    'bx--select': true,
    'bx--select--inline': inline,
    'bx--select--light': light,
    [className]: className,
  });
  const labelClasses = classNames('bx--label', {
    'bx--visually-hidden': hideLabel,
  });
  return (
    <div className="bx--form-item">
      <div className={selectClasses}>
        {inline ? (
          <label htmlFor={id} className={labelClasses}>
            {labelText}
          </label>
        ) : null}
        <select
          {...other}
          id={id}
          className="bx--select-input"
          disabled={disabled}>
          {children}
        </select>
        <Icon
          name="caret--down"
          className="bx--select__arrow"
          description={iconDescription}
        />
        {!inline ? (
          <label htmlFor={id} className={labelClasses}>
            {labelText}
          </label>
        ) : null}
      </div>
    </div>
  );
};

Select.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  labelText: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.any,
  iconDescription: PropTypes.string.isRequired,
  hideLabel: PropTypes.bool,
  light: PropTypes.bool,
};

Select.defaultProps = {
  disabled: false,
  labelText: 'Select',
  inline: false,
  iconDescription: 'open list of options',
  light: false,
};

export default Select;
