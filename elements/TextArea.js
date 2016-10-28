import React, { PropTypes } from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/base-elements/textarea/textarea.scss';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  cols: PropTypes.number,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  disabled: PropTypes.bool,
  id: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

const defaultProps = {
  disabled: false,
  onChange: () => {},
  onClick: () => {},
  placeholder: 'Hint text here',
  rows: 4,
  cols: 50,
};

const Textarea = ({ children, className, id, onChange, onClick, ...other }) => {
  const textareaProps = {
    id,
    onChange: evt => {
      if (!other.disabled) {
        onChange(evt);
      }
    },
    onClick: evt => {
      if (!other.disabled) {
        onClick(evt);
      }
    },
  };

  const textareaClasses = classNames(
    'bx--textarea__input',
    [className]: className,
  );

  return (
    <div>
      <label
        htmlFor={id}
        className="bx--form__label"
      >
        {children}
      </label>

      <textarea
        {...other}
        {...textareaProps}
        className={textareaClasses}
      />
    </div>
  );
};

Textarea.propTypes = propTypes;
Textarea.defaultProps = defaultProps;

export default Textarea;
