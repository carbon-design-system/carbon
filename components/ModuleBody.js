import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const ModuleBody = ({ children, className, ...other }) => {
  const wrapperClasses = classNames('bx--module__body', className);

  return (
    <div className={wrapperClasses} {...other}>
      {children}
    </div>
  );
};

ModuleBody.propTypes = propTypes;

export default ModuleBody;
