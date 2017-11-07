import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const Breadcrumb = ({ children, className, ...other }) => {
  const classNames = classnames('bx--breadcrumb', className);
  return (
    <div className={classNames} {...other}>
      {children}
    </div>
  );
};

Breadcrumb.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Breadcrumb;
