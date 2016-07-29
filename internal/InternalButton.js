import React from 'react';

class InternalButton extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    href: React.PropTypes.string,
    tabIndex: React.PropTypes.number,
    type: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onKeyUp: React.PropTypes.func,
    onKeyboardFocus: React.PropTypes.func,
    onMouseDown: React.PropTypes.func,
    onMouseEnter: React.PropTypes.func,
    onMouseLeave: React.PropTypes.func,
    onMouseUp: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func,
    onTouchStart: React.PropTypes.func,
    onTouchTap: React.PropTypes.func
  }

  static defaultProps = {
    tabIndex: 0,
    onBlur: () => {},
    onClick: () => {},
    onFocus: () => {},
    onKeyDown: () => {},
    onKeyUp: () => {},
    onKeyboardFocus: () => {},
    onMouseDown: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onMouseUp: () => {},
    onTouchEnd: () => {},
    onTouchStart: () => {},
    onTouchTap: () => {}
  }

  handleBlur = (evt) => {
    this.props.onBlur(evt);
  }

  handleClick = (evt) => {
    if (!this.props.disabled) {
      this.props.onClick(evt);
    }
  }

  handleFocus = (evt) => {
    this.props.onFocus(evt);
  }

  handleMouseEnter = (evt) => {
    this.props.onMouseEnter(evt);
  }

  handleMouseLeave = (evt) => {
    this.props.onMouseLeave(evt);
  }

  handleMouseDown = (evt) => {
    this.props.onMouseDown(evt);
  }

  handleMouseUp = (evt) => {
    this.props.onMouseUp(evt);
  }

  render() {

    const buttonProps = {
      className: this.props.className,
      disabled: this.props.disabled,
      tabIndex: this.props.tabIndex,
      type: this.props.type,
      href: this.props.href,
      role: this.props.role,
      onBlur: this.handleBlur,
      onClick: this.handleClick,
      onFocus: this.handleFocus,
      onKeyDown: this.handleKeyDown,
      onMouseEnter: this.handleMouseEnter,
      onMouseDown: this.handleMouseDown,
      onMouseLeave: this.handleMouseLeave,
      onMouseUp: this.handleMouseUp,
    }

    const HTML = (this.props.href)
      ? <a {...buttonProps}>{this.props.children}</a>
      : <button {...buttonProps}>{this.props.children}</button>;

    return HTML;
  }
}

export default InternalButton;
