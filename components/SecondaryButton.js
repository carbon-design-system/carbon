import React from 'react';
import classNames from 'classnames';
import InternalButton from '../internal/InternalButton';
import '@console/bluemix-components/consumables/scss/base-elements/buttons/button--secondary.scss';

const propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
};

const SecondaryButton = ({ className, ...other }) => {
  const buttonClasses = classNames({
    'bx--btn--secondary': true,
    [className]: className,
  });

  return (
    <InternalButton {...other} className={buttonClasses} />
  );
};

SecondaryButton.propTypes = propTypes;

export default SecondaryButton;
