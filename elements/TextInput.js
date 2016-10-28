import React, { PropTypes } from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/base-elements/text/text.scss';

const propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

const defaultProps = {
  className: 'bx--text__input',
  disabled: false,
  label: ' ',
  placeholder: '',
  type: 'text',
  onChange: () => {},
  onClick: () => {},
};

const TextInput = ({ label, className, id, placeholder, type, onChange, onClick, ...other }) => {
  const textInputProps = {
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
    placeholder,
    type,
  };

  const textInputClasses = classNames(
    'bx--text__input',
    className,
  );

  return (
    <div>
      <label htmlFor={id} className="bx--form__label">{label}</label>
      <input {...other} {...textInputProps} className={textInputClasses} />
    </div>
  );
};

TextInput.propTypes = propTypes;
TextInput.defaultProps = defaultProps;

export default TextInput;
