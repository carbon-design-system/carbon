import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(['single', 'double']),
};

const moduleBodyPropTypes = {
  children: PropTypes.node,
  centered: PropTypes.bool,
  className: PropTypes.string,
};

const moduleHeaderPropTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const defaultProps = {
  size: 'double',
};

const moduleBodydefaultProps = {
  centered: false,
};

const Module = ({ children, className, size, ...other }) => {
  const wrapperClasses = classNames(
    `bx--module bx--module--${size}`,
    className
  );

  return (
    <div className={wrapperClasses} {...other}>
      <div className="bx--module__inner">{children}</div>
    </div>
  );
};

const ModuleBody = ({ children, className, centered, ...other }) => {
  const wrapperClasses = classNames('bx--module__content', className, {
    'bx--module__content--centered': centered,
  });

  return (
    <div className={wrapperClasses} {...other}>
      {children}
    </div>
  );
};

const ModuleHeader = ({ children, className, ...other }) => {
  const wrapperClasses = classNames('bx--module__header', className);

  return (
    <div className={wrapperClasses} {...other}>
      <h1 className="bx--module__title">{children}</h1>
    </div>
  );
};

Module.propTypes = propTypes;
ModuleBody.propTypes = moduleBodyPropTypes;
Module.defaultProps = defaultProps;
ModuleBody.defaultProps = moduleBodydefaultProps;
ModuleHeader.propTypes = moduleHeaderPropTypes;

export { Module, ModuleBody, ModuleHeader };
