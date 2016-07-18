import React from 'react';


class InternalButton extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    href: React.PropTypes.string,
    tabIndex: React.PropTypes.number,
    type: React.PropTypes.string
  }

  render() {

    const buttonProps = {
      className: this.props.className,
      disabled: this.props.disabled,
      tabIndex: this.props.tabIndex,
      type: this.props.type,
      href: this.props.href,
      role: this.props.role
    }

    const HTML = (this.props.href)
      ? <a {...buttonProps}>{this.props.children}</a>
      : <button {...buttonProps}>{this.props.children}</button>;

    return HTML;
  }
}

export default InternalButton;
