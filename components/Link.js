import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string,
};

const Link = ({ children, className, href, ...other }) => {
  const classNames = classnames('bx--link', className);
  return <a href={href} className={classNames} {...other}>{children}</a>;
};

Link.propTypes = propTypes;

export default Link;
