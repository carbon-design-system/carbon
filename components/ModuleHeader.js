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

const ModuleHeader = ({ children, className, ...other }) => {
  const wrapperClasses = classNames('bx--module__header', className);

  return (
    <h2 className={wrapperClasses} {...other}>
      {children}
    </h2>
  );
};

ModuleHeader.propTypes = propTypes;

export default ModuleHeader;
