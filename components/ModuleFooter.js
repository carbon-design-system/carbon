import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const ModuleFooter = ({ children, className, ...other }) => {
  const wrapperClasses = classNames('bx--module__footer', className);
  return (
    <div className={wrapperClasses} {...other}>
      {children}
    </div>
  );
};

ModuleFooter.propTypes = propTypes;

export default ModuleFooter;
