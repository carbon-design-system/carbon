import React, { PropTypes } from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/components/modules/modules.scss';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const ModuleBody = ({ children, className }) => {
  const wrapperClasses = classNames('bx--module__body', className);

  return (
    <div className={wrapperClasses}>
      {children}
    </div>
  );
};

ModuleBody.propTypes = propTypes;

export default ModuleBody;
