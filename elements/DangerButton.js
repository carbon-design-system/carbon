import React from 'react';
import classNames from 'classnames';
import InternalButton from '../internal/InternalButton';
import '@console/bluemix-components/consumables/scss/base-elements/buttons/button--danger.scss';

const propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
};

const DangerButton = ({ className, ...other }) => {
  const buttonClasses = classNames({
    'bx--btn--danger': true,
    [className]: className,
  });

  return (
    <InternalButton {...other} className={buttonClasses} />
  );
};

DangerButton.propTypes = propTypes;

export default DangerButton;
