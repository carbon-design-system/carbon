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
  wrapperClassName,
  ...other
}) => {
  let input;
  const labelClasses = classNames('bx--checkbox-label', className);
  const innerLabelClasses = classNames({
    'bx--visually-hidden': hideLabel,
  });
  const wrapperClasses = classNames(
    'bx--form-item',
    'bx--checkbox-wrapper',
    wrapperClassName
  );

  return (
    <div className={wrapperClasses}>
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
      <label htmlFor={id} className={labelClasses}>
        <span className={innerLabelClasses}>{labelText}</span>
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  indeterminate: PropTypes.bool,
  /**
   * The CSS class name to be placed on inner label element.
   */
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  labelText: PropTypes.node.isRequired,
  hideLabel: PropTypes.bool,
  onChange: PropTypes.func,
  /**
   * The CSS class name to be placed on the wrapping element
   */
  wrapperClassName: PropTypes.string,
};

Checkbox.defaultProps = {
  onChange: () => {},
  indeterminate: false,
};

export default Checkbox;
