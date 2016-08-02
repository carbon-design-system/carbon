import React, { Component } from 'react';
// import Icon from './icon';
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
        --value;
        this.setState({
          value,
        });
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
        <input id="numberinput-id" className="bx--number__input" pattern="[0-9]*" {...props} />
        <span className="bx--number__arrow--up bx--number__arrow--icon-up" onClick={props.onClick}>
          <svg className="icon--up bx--number__arrow--icon-up" viewBox="-606 394.7 10.5 5.3">
            <path className="icon--up bx--number__arrow--icon-up" d="M-595.5,400l-5.3-5.3l-5.3,5.3H-595.5z"/>
          </svg>
        </span>
        <span className="bx--number__arrow--down bx--number__arrow--icon-down" onClick={props.onClick}>
          <svg className="icon--down bx--number__arrow--icon-down" x="0px" y="0px" viewBox="-606 394.7 10.5 5.3">
            <path className="icon--down bx--number__arrow--icon-down" d="M-606,394.7l5.3,5.3l5.3-5.3H-606z"/>
          </svg>
        </span>
      </div>
    );
  }
}

export default NumberInput;
