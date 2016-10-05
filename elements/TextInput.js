import React, { Component } from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/base-elements/text/text.scss';

class TextInput extends Component {

  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    defaultValue: React.PropTypes.any,
    disabled: React.PropTypes.bool,
    id: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    type: React.PropTypes.string,
    value: React.PropTypes.any,
  }

  static defaultProps = {
    className: 'bx--text__input',
    disabled: false,
    placeholder: '',
    type: 'text',
  }

  constructor(props) {
    super(props);

    this.state = {
      disabled: this.props.disabled,
      focus: false,
      value: '',
    };
  }

  handleBlur = (evt) => {
    this.setState({
      focus: false,
    });
    this.props.onBlur(evt);
  }

  handleChange = (evt) => {
    if (!this.props.disabled) {
      this.setState({
        value: evt.target.value,
      });
      this.props.onChange(evt);
    }
  }

  handleClick = (evt) => {
    if (!this.props.disabled) {
      this.setState({
        focus: true,
      });
      this.props.onClick(evt);
    }
  }

  handleFocus = (evt) => {
    this.setState({
      focus: true,
    });
    this.props.onFocus(evt);
  }

  render() {
    const {
      children,
      className,
      defaultValue,
      disabled,
      id,
      placeholder,
      type,
      value,
      ...other,
    } = this.props;

    const textInputProps = {
      className,
      defaultValue,
      disabled,
      id,
      onBlur: this.handleBlur,
      onChange: this.handleChange,
      onFocus: this.handleFocus,
      onClick: this.handleClick,
      onKeyDown: this.handleKeyDown,
      placeholder,
      type,
      value,
    };

    const textInputClasses = classNames({
      'bx--text__input': true,
      [this.props.className]: this.props.className,
    });


    return (
      <div>
        <label htmlFor={id} className="bx--form__label">{children}</label>
        <input {...other} {...textInputProps} className={textInputClasses} />
      </div>
    );
  }
}

export default TextInput;
