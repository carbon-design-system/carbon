import React from 'react';
import classNames from 'classnames';
import InternalButton from '../internal/InternalButton';
import '@console/bluemix-components/consumables/scss/base-elements/buttons/button--primary.scss';

const propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  small: React.PropTypes.bool,
};

const defaultProps = {
  small: false,
};

const PrimaryButton = ({ className, small, ...other }) => {
  const buttonClasses = classNames({
    'bx--btn': true,
    [className]: className,
    'bx--btn--sm': small,
  });

  return (
    <InternalButton {...other} className={buttonClasses} />
  );
};

PrimaryButton.propTypes = propTypes;
PrimaryButton.defaultProps = defaultProps;
export default PrimaryButton;
