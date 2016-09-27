import React, { PropTypes } from 'react';

class InternalButton extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    href: PropTypes.string,
    tabIndex: PropTypes.number,
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
    role: PropTypes.string,
  }

  static defaultProps = {
    tabIndex: 0,
    type: 'button',
    disabled: false,
  }

  render() {
    const {
      children,
      className,
      disabled,
      href,
      tabIndex,
      type,
      ...other,
    } = this.props;

    const commonProps = {
      className,
      tabIndex,
    };

    const button = (
      <button
        {...other}
        {...commonProps}
        disabled={disabled}
        type={type}
      >
        {children}
      </button>
    );

    const anchor = (
      <a
        {...other}
        {...commonProps}
        href={href}
        role="button"
      >
        {children}
      </a>
    );

    return (href) ? anchor : button;
  }
}

export default InternalButton;
