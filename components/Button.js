import React, { PropTypes } from 'react';
import Icon from '../components/Icon';
import classNames from 'classnames';
// eslint-disable-next-line max-len, import/no-unresolved
import '../env-defined-then-loader?-EXCLUDE_SASS!@console/bluemix-components/consumables/scss/base-elements/buttons/button--secondary.scss';
// eslint-disable-next-line max-len, import/no-unresolved
import '../env-defined-then-loader?-EXCLUDE_SASS!@console/bluemix-components/consumables/scss/base-elements/buttons/button--danger.scss';
// eslint-disable-next-line max-len, import/no-unresolved
import '../env-defined-then-loader?-EXCLUDE_SASS!@console/bluemix-components/consumables/scss/base-elements/buttons/button--primary.scss';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  small: PropTypes.bool,
  kind: PropTypes.oneOf(['primary', 'secondary', 'danger']).isRequired,
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
};

const defaultProps = {
  tabIndex: 0,
  type: 'button',
  disabled: false,
  small: false,
  kind: 'primary',
};

const Button = ({ children, className, disabled, small, kind, href,
                  tabIndex, type, icon, iconDescription, ...other }) => {
  const buttonClasses = classNames(className, {
    'bx--btn--sm': small,
    'bx--btn': kind === 'primary',
    'bx--btn--danger': kind === 'danger',
    'bx--btn--secondary': kind === 'secondary',
  });

  const commonProps = {
    tabIndex,
    className: buttonClasses,
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
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
