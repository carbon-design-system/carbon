import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
if (!process.env.EXCLUDE_SASS) {
  import('@console/bluemix-components/consumables/scss/components/modules/modules.scss');
}

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
