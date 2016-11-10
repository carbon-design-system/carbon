import React, { PropTypes } from 'react';
import classnames from 'classnames';
import '@console/bluemix-components/consumables/scss/base-elements/links/links.scss';

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
