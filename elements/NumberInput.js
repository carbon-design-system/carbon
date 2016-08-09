import React, { Component } from 'react';
import Icon from './Icon';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/base-elements/number-input/number-input.scss';

class NumberInput extends Component {

  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onChange: React.PropTypes.func,
    step: React.PropTypes.number,
    type: React.PropTypes.string,
    value: React.PropTypes.number,
  }

  static defaultProps = {
    className: 'bx--number',
    disabled: false,
    onFocus: () => {},
    onBlur: () => {},
    onClick: () => {},
    onKeyDown: () => {},
    onChange: () => {},
    step: 1,
    type: 'number',
    value: 0,
  }

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      disabled: this.props.disabled,
      focus: false,
    };
  }

  handleFocus = (evt) => {
    if (!this.state.disabled) {
      this.setState({
        focus: true,
      });
      this.props.onFocus(evt);
    }
  }

  handleBlur = (evt) => {
    if (!this.state.disabled) {
      this.setState({
        focus: false,
      });
      this.props.onBlur(evt);
    }
  }

  handleKeyDown = (evt) => {
    let { value } = this.state;
    const key = evt.keyCode;

    if (!this.state.disabled) {
      if (key === 38) {
        value++;
      } else if (key === 40) {
        value--;
      }
      this.props.onKeyDown(evt);
    }
  }

  handleChange = (evt) => {
    if (!this.state.disabled) {
      this.setState({
        value: evt.target.value,
      });
    }
  }

  handleClick = (evt) => {
    let { value } = this.state;
    const arrow = evt.target.classList;

    if (!this.state.disabled) {
      if (arrow.contains('bx--number__arrow--icon-up')) {
        ++value;
        this.setState({
          value,
        });
      } else if (arrow.contains('bx--number__arrow--icon-down')) {
        if (value > 0) {
          --value;
          this.setState({
            value,
          });
        }
      }
    }

    this.props.onClick(evt);
  }

  render() {
    const numberInputClasses = classNames({
      'bx--number': true,
      [this.props.className]: this.props.className,
    });

    const props = {
      disabled: this.props.disabled,
      onClick: this.handleClick,
      onBlur: this.handleBlur,
      onFocus: this.handleFocus,
      onKeyDown: this.handleKeyDown,
      onChange: this.handleChange,
      value: this.state.value,
      type: this.props.type,
      step: this.props.step,
    };

    return (
      <div data-numberinput className={numberInputClasses}>
        <label htmlFor="numberinput-id" className="bx--form__label">{this.props.children}</label>
        <input
          id="numberinput-id"
          className="bx--number__input"
          pattern="[0-9]*"
          min="0"
          {...props}
        />
        <span
          className="bx--number__arrow--up bx--number__arrow--icon-up"
          onClick={props.onClick}
        >
          <Icon className="icon--up bx--number__arrow--icon-up" name="chevron-up" />
        </span>
        <span
          className="bx--number__arrow--down bx--number__arrow--icon-down"
          onClick={props.onClick}
        >
          <Icon className="icon--down bx--number__arrow--icon-down" name="chevron-down" />
        </span>
      </div>
    );
  }
}

export default NumberInput;
