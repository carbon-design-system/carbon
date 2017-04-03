import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const ModulesContainer = ({ children, className, ...other }) => {
  const wrapperClasses = classNames('bx--module', className);

  return (
    <section className={wrapperClasses} {...other}>
      {children}
    </section>
  );
};

ModulesContainer.propTypes = propTypes;

export default ModulesContainer;
