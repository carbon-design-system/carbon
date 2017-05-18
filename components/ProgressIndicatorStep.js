import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from './Icon';

const propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  complete: PropTypes.bool,
};

const ProgressIndicatorStep = ({ active, children, className, complete, ...other }) => {
  const classNames = classnames(
    'bx--progress-indicator__step',
    className,
    {
      'bx--progress-indicator__step--complete': complete,
      'bx--progress-indicator__step--active': active,
    }
  );
  return (
    <li className={classNames} {...other}>
      <Icon className="bx--progress-indicator__icon" name="checkmark--outline" description="" />
      <p className="bx--progress-indicator__label">{children}</p>
    </li>
  );
};

ProgressIndicatorStep.propTypes = propTypes;

export default ProgressIndicatorStep;
