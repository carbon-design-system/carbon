import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Link from '../Link';

const BreadcrumbItem = ({ children, className, href, ...other }) => {
  const classNames = classnames('bx--breadcrumb-item', className);
  return (
    <div className={classNames} {...other}>
      <Link href={href}>{children}</Link>
    </div>
  );
};

BreadcrumbItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string,
};

export default BreadcrumbItem;
