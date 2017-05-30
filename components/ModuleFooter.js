import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
if (!process.env.EXCLUDE_SASS) {
  import('carbon-components/consumables/scss/components/modules/modules.scss');
}

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
