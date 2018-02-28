import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const Checkbox = ({
  className,
  id,
  labelText,
  onChange,
  indeterminate,
  hideLabel,
  ...other
}) => {
  let input;
  const wrapperClasses = classNames('bx--checkbox-label', className);
  const labelClasses = classNames({
    'bx--visually-hidden': hideLabel,
  });

  return (
    <div className="bx--form-item bx--checkbox-wrapper">
      <input
        {...other}
        type="checkbox"
        onChange={evt => {
          onChange(input.checked, id, evt);
        }}
        className="bx--checkbox"
        id={id}
        ref={el => {
          input = el;
          if (input) {
            input.indeterminate = indeterminate;
          }
        }}
      />
      <label htmlFor={id} className={wrapperClasses}>
        <span className={labelClasses}>{labelText}</span>
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  indeterminate: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  labelText: PropTypes.node.isRequired,
  hideLabel: PropTypes.bool,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  onChange: () => {},
  indeterminate: false,
};

export default Checkbox;
