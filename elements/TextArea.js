import React, { Component } from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/base-elements/textarea/textarea.scss';

class Textarea extends Component {

  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    cols: React.PropTypes.number,
    defaultValue: React.PropTypes.any,
    disabled: React.PropTypes.bool,
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    rows: React.PropTypes.number,
    value: React.PropTypes.any,
  }

  static defaultProps = {
    disabled: false,
    name: 'textarea',
    onBlur: () => {},
    onChange: () => {},
    onClick: () => {},
    onFocus: () => {},
    placeholder: 'Hint text here',
    rows: 4,
    cols: 50,
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
    const textareaProps = {
      cols: this.props.cols,
      defaultValue: this.props.defaultValue,
      disabled: this.props.disabled,
      id: this.props.id,
      name: this.props.name,
      onBlur: this.handleBlur,
      onChange: this.handleChange,
      onClick: this.handleClick,
      onFocus: this.handleFocus,
      placeholder: this.props.placeholder,
      rows: this.props.rows,
      value: this.props.value,
    };

    const textareaClasses = classNames({
      'bx--textarea__input': true,
      [this.props.className]: this.props.className,
    });

    return (
      <div>
        <label htmlFor={this.props.id} className="bx--form__label">{this.props.children}</label>
        <textarea className={textareaClasses} {...textareaProps}></textarea>
      </div>
    );
  }
}

export default Textarea;
