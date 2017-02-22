import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Icon from './Icon';
if (!process.env.EXCLUDE_SASS) {
  import('@console/bluemix-components/consumables/scss/base-elements/checkbox/checkbox.scss');
}

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
    'bx--checkbox__label',
    [className]: className,
  );

  return (
    <label htmlFor={id} className={wrapperClasses}>
      <input
        {...other}
        type="checkbox"
        onChange={evt => { onChange(input.checked, id, evt); }}
        className="bx--checkbox bx--checkbox--svg"
        id={id}
        ref={el => { input = el; }}
      />

      <span className="bx--checkbox__appearance">
        <Icon
          className="bx--checkbox__checkmark"
          description="checkmark"
          name="checkmark"
        />
      </span>
      <span className="bx--checkbox__label-text">{labelText}</span>
    </label>
  );
};

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default Checkbox;
