import React, { PropTypes } from 'react';
import classNames from 'classnames';
// eslint-disable-next-line max-len, import/no-unresolved
import '../env-defined-then-loader?-EXCLUDE_SASS!@console/bluemix-components/consumables/scss/components/modules/modules.scss';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  width: PropTypes.oneOf(['full', 'half', 'one-third', 'two-third']),
};

const defaultProps = {
  width: 'full',
};

const Module = ({ children, className, width, ...other }) => {
  const wrapperClasses = classNames(`bx--module--${width}`, className);

  return (
    <div className={wrapperClasses} {...other}>
      {children}
    </div>
  );
};

Module.propTypes = propTypes;
Module.defaultProps = defaultProps;

export default Module;
