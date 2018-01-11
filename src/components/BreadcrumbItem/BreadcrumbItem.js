import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import Link from '../Link';

const newChild = (children, href) => {
  if (typeof children === 'string' && !(href === undefined)) {
    return <Link href={href}>{children}</Link>;
  } else {
    return React.cloneElement(React.Children.only(children), {
      className: 'bx--link',
    });
  }
};

const BreadcrumbItem = ({ children, className, href, ...other }) => {
  const classNames = classnames('bx--breadcrumb-item', className);
  return (
    <div className={classNames} {...other}>
      {newChild(children, href)}
    </div>
  );
};

BreadcrumbItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string,
};

export default BreadcrumbItem;
