import React, { PropTypes } from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/components/modules/modules.scss';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const ModulesContainer = ({ children, className }) => {
  const wrapperClasses = classNames('bx--module', className);

  return (
    <section className={wrapperClasses} role="region">
      {children}
    </section>
  );
};

ModulesContainer.propTypes = propTypes;

export default ModulesContainer;
