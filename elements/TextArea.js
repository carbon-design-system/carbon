import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/base-elements/textarea/textarea.scss';

class Textarea extends Component {

  static propTypes = {
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
  }

  static defaultProps = {
    disabled: false,
    onChange: () => {},
    onClick: () => {},
    placeholder: 'Hint text here',
    rows: 4,
    cols: 50,
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
      children,
      className,
      id,
      ...other,
    } = this.props;

    const textareaProps = {
      id,
      onChange: this.handleChange,
      onClick: this.handleClick,
    };

    const textareaClasses = classNames(
      'bx--textarea__input',
      className,
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
  }
}

export default Textarea;
