import React, { PropTypes } from 'react';
import classNames from 'classnames';
// eslint-disable-next-line max-len, import/no-unresolved
import '../env-defined-then-loader?-EXCLUDE_SASS!@console/bluemix-components/consumables/scss/components/modules/modules.scss';

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
