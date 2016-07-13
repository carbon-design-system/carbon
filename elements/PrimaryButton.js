import React from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/base-elements/buttons/button--primary.scss';


export default class PrimaryButton extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    href: React.PropTypes.string,
    tabIndex: React.PropTypes.number,
    type: React.PropTypes.string
  }

  static defaultProps = {
    className: 'bx--btn',
    tabIndex: 0
  }

  render() {

    const buttonClasses = classNames({
      'bx--btn': true,
      [this.props.className]: this.props.className
    });

    const button = <button
                    className={buttonClasses}
                    disabled={this.props.disabled || false}
                    tabIndex={this.props.tabIndex}
                    type={this.props.type || 'button'}>
                      {this.props.children}
                  </button>

    const link = <a
                  className={buttonClasses}
                  href={this.props.href}
                  role={this.props.role || 'button'}
                  tabIndex={this.props.tabIndex}>
                    {this.props.children}
                </a>

    const HTML = (this.props.href) ? link : button;

    return HTML;
  }
}
