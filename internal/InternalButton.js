import React from 'react';
import classNames from 'classnames';


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

    const button = <button
                    className={this.props.className}
                    disabled={this.props.disabled || false}
                    tabIndex={this.props.tabIndex}
                    type={this.props.type || 'button'}>
                      {this.props.children}
                  </button>

    const link = <a
                  className={this.props.className}
                  href={this.props.href}
                  role={this.props.role || 'button'}
                  tabIndex={this.props.tabIndex}>
                    {this.props.children}
                </a>

    const HTML = (this.props.href) ? link : button;

    return HTML;
  }
}

export default InternalButton;
