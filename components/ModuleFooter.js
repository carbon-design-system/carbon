import React, { PropTypes } from 'react';
import classNames from 'classnames';
import '@console/bluemix-components/consumables/scss/components/modules/modules.scss';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const ModuleFooter = ({ children, className }) => {
  const wrapperClasses = classNames('bx--module__footer', className);
  return (
    <div className={wrapperClasses}>
      {children}
    </div>
  );
};

ModuleFooter.propTypes = propTypes;

export default ModuleFooter;
