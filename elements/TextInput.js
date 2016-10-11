import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/base-elements/text/text.scss';

class TextInput extends Component {

  static propTypes = {
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
  }

  static defaultProps = {
    className: 'bx--text__input',
    disabled: false,
    label: ' ',
    placeholder: '',
    type: 'text',
    onChange: () => {},
    onClick: () => {},
  }

  handleChange = (evt) => {
    if (!this.props.disabled) {
      this.props.onChange(evt);
    }
  }

  handleClick = (evt) => {
    if (!this.props.disabled) {
      this.props.onClick(evt);
    }
  }

  render() {
    const {
      label,
      className,
      id,
      placeholder,
      type,
      ...other,
    } = this.props;

    const textInputProps = {
      id,
      onChange: this.handleChange,
      onClick: this.handleClick,
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
  }
}

export default TextInput;
