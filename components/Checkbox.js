import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Icon from './Icon';

const propTypes = {
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  onChange: PropTypes.func,
};

const defaultProps = {
  onChange: () => { },
};

const Checkbox = ({ className, id, labelText, onChange, ...other }) => {
  let input;
  const wrapperClasses = classNames(
    'bx--checkbox-label',
    className
  );

  return (
    <div className="bx--form-item bx--checkbox-wrapper">
      <label htmlFor={id} className={wrapperClasses}>
        <input
          {...other}
          type="checkbox"
          onChange={evt => { onChange(input.checked, id, evt); }}
          className="bx--checkbox"
          id={id}
          ref={el => { input = el; }}
        />

        <span className="bx--checkbox-appearance">
          <Icon
            className="bx--checkbox-checkmark"
            description="checkmark"
            name="checkmark"
          />
        </span>
        <span className="bx--checkbox-label-text">{labelText}</span>
      </label>
    </div>
  );
};

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;
