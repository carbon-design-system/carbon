import React, { PropTypes } from 'react';
import Icon from '../components/Icon';

class InternalButton extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    href: PropTypes.string,
    tabIndex: PropTypes.number,
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
    role: PropTypes.string,
    icon: PropTypes.string,
    iconDescription: (props) => {
      if (props.icon && !props.iconDescription) {
        return new Error('\'icon\' property specified without also providing an \'iconDescription\'.');
      }
      return undefined;
    },
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
      icon,
      iconDescription,
      ...other,
    } = this.props;

    const commonProps = {
      className,
      tabIndex,
    };

    const buttonImage = icon ? <Icon
      name={icon}
      description={iconDescription}
      className="bx--btn--right-icon__icon bx--btn--right-icon__use"
    /> : null;

    const button = (
      <button
        {...other}
        {...commonProps}
        disabled={disabled}
        type={type}
      >
        {children}
        {buttonImage}
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
        {buttonImage}
      </a>
    );

    return (href) ? anchor : button;
  }
}

export default InternalButton;
