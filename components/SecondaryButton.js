import React from 'react';
import classNames from 'classnames';
import InternalButton from '../internal/InternalButton';
import '@console/bluemix-components/consumables/scss/base-elements/buttons/button--secondary.scss';

const propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  small: React.PropTypes.bool,
};

const defaultProps = {
  small: false,
};
const SecondaryButton = ({ className, small, ...other }) => {
  const buttonClasses = classNames({
    'bx--btn--secondary': true,
    [className]: className,
    'bx--btn--sm': small,
  });

  return (
    <InternalButton {...other} className={buttonClasses} />
  );
};

SecondaryButton.propTypes = propTypes;
SecondaryButton.defaultProps = defaultProps;
export default SecondaryButton;
