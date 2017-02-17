import React, { PropTypes } from 'react';
import classNames from 'classnames';
// eslint-disable-next-line max-len, import/no-unresolved
import '../env-defined-then-loader?-EXCLUDE_SASS!@console/bluemix-components/consumables/scss/components/modules/modules.scss';

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
