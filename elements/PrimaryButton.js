import React from 'react';
import classNames from 'classnames';
import InternalButton from '../internal/InternalButton';
import '@console/bluemix-components/consumables/scss/base-elements/buttons/button--primary.scss';

const propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
};

const PrimaryButton = ({ className, ...other }) => {
  const buttonClasses = classNames({
    'bx--btn': true,
    [className]: className,
  });

  return (
    <InternalButton {...other} className={buttonClasses} />
  );
};

PrimaryButton.propTypes = propTypes;

export default PrimaryButton;
